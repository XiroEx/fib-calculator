import logo from './logo.svg';
import './App.css';

//! I'm looking for this page to simply take this list of assets and request their fib data, 
//! then display them as clickable accordian style elements or an interactive table/grid.
//! Simple useEffect to get the data, or maybe calculate in cloud daily and use firebase.
const tickers = [
  'C',
  'MSFT',
  'AAPL',
  'GOOGL',
  'QCOM',
  'NVDA',
  'MDB',
  'META',
  'LYFT',
  'UBER',
  'COIN',
  'SQ',
  'AMD',
  'SHOP',
  'VZ',
  'T',
  'O',
  'IIPR',
  'NRG',
  'UNH',
  'CVS',
  'PEP',
  'WBA',
  'NKE',
  'V',
  'LOW',
  'DIS',
  'TGT',
  'IBUY',
  'PYPL',
  'DKNG',
  'TSLA',
  'NFLX',
  'BABA',
  'UPS',
  'LIT',
  'SOL/USD',
  'ETH/USD',
  'MATIC/USD',
  'ATOM/USD',
  'LINK/USD',
  'BTC/USD'
]


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form action="/" method="get">
          <label htmlFor="header-search">
              <span className="visually-hidden">Enter a symbol</span>
          </label>
          <input
              type="text"
              id="header-search"
              placeholder="Stock ticker or crypto pair"
              name="s"
          />
          <button type="submit">Search</button>
          {/* DATA HERE */}
        </form>
      </header>
    </div>
  );
}

export default App;
