
import * as Fib from 'fib-retracement'
import redis from 'redis'

async function fibs() {
    const Publisher = redis.createClient({url:'redis://:jaD4z4Yz2INBVIDsWXr5TZolIQpQAhEI@redis-16236.c238.us-central1-2.gce.cloud.redislabs.com:16236'})
    await Publisher.connect()
    const candles = (await Publisher.zRange('SOL-PERP-5mftx', 0, -1)).map(c=>(JSON.parse(c)))
    const high = candles.reduce((a,o) => (a ? Math.max(a.value,o[2]) == a.value ? a : {value: o[2], time: o[0]} : {value: o[2], time: o[0]}), 0)
    const low = candles.reduce((a,o) => (a ? Math.min(a.value,o[3]) == a.value ? a : {value: o[3], time: o[0]} : {value: o[3], time: o[0]}), 0)
    console.log(high.time > low.time ? 'Retracement (Uptrend, Buy Targets)' : 'Extension (Downtrend, Sell Targets)')
    const levels = { 0: low.value, 1: high.value}
    if (levels[0]) {
        const fib = Fib.getFibRetracement({ levels })
        console.log(fib)
    } else {
        console.log('Data Error')
    }
    console.log(await Publisher.get('SOL-PERP-ftx'))
}
fibs()

