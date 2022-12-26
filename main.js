
import * as Fib from 'fib-retracement'
import redis from 'redis'
async function fibs(asset, time) {
    const Publisher = redis.createClient({url:'redis://:jaD4z4Yz2INBVIDsWXr5TZolIQpQAhEI@redis-16236.c238.us-central1-2.gce.cloud.redislabs.com:16236'})
    await Publisher.connect()
    const exchange = asset.includes('/') || asset.includes('-') ? 'bitfinex':'alpaca'
    const candles = (await Publisher.zRange(`candles:${exchange}:${asset.replace('/',':')}:${time}`, 0, -1)).map(c=>(JSON.parse(c)))
    if (candles.length > 0) {
        const high = candles.reduce((a,o) => (a ? Math.max(a.value,o[2]) == a.value ? a : {value: o[2], time: o[0]} : {value: o[2], time: o[0]}), 0)
        const low = candles.reduce((a,o) => (a ? Math.min(a.value,o[3]) == a.value ? a : {value: o[3], time: o[0]} : {value: o[3], time: o[0]}), 0)
        let message = {m:`${high.time > low.time ? 'Retracement (Uptrend, Buy Targets)' : 'Extension (Downtrend, Sell Targets)'}`}
        const levels = { 0: low.value, 1: high.value}
        if (levels[0]) {
            const fib = Fib.getFibRetracement({ levels })
            message.f= fib
        } else {
            message.f = 'Data Error'
        }
        message.p = await Publisher.get(`price:${exchange}:${asset.replace('/',':')}`)
        Publisher.disconnect()
        return (message)
    } else {
        Publisher.publish('Price Server', JSON.stringify(['ST', exchange, asset]))
        Publisher.publish('Price Server', JSON.stringify(['SC', exchange, asset, time]))
        function result() {
            return new Promise((resolve, reject) => {
                setTimeout(async ()=> resolve(await fibs(asset, time)), 5000)
            })
        }
        return await result()
    }
}
//console.log(await fibs('AAPL', '15m')) //!TEMP

export default fibs
