import React, { useState } from 'react';
import CryptoChart from './components/CryptoChart';
import SetCurrencies from './components/SetCurrencies';
import GetTimePeriod from './components/GetTimePeriod';
import './app.css';

function App() {
  const [timePeriod,  setTimePeriod] = useState(7);
  const [fiatCurrency, setFiatCurrency] = useState("Euro");
  const [cryptoCurrency, setCryptoCurrency] = useState("Bitcoin");
  
  function showGraph() {
    let graph = document.getElementById("statsGraph");
    graph.classList.add("show");
  }

  function hideGraph() {
    let graph = document.getElementById("statsGraph");
    graph.classList.remove("show");
  }

  function getTimePeriod(period) {
    setTimePeriod(period);
  }

  function getCryptoCurrency(cryptoCoin) {
    setCryptoCurrency(cryptoCoin);
  }

  function getFiatCurrency(fiatCurrency) {
    setFiatCurrency(fiatCurrency);
  }

  return (
    <>
      <navigator className="siteTitle">Crypto Tracking</navigator>
      <SetCurrencies getCryptoCurrency={getCryptoCurrency} getFiatCurrency={getFiatCurrency} />
      <GetTimePeriod timePeriod={getTimePeriod} />
      <div>
        <button className="showBtn" onClick={showGraph}>Expand graph</button>
      </div>
      <div id="statsGraph" className="graph">
        <CryptoChart cryptoCurrency={cryptoCurrency} fiatCurrency={fiatCurrency} timePeriod={timePeriod} />
        <button className="hideBtn" onClick={hideGraph}>Minimise graph</button>
      </div>
      <div className="mini-graph">
        <CryptoChart cryptoCurrency={cryptoCurrency} fiatCurrency={fiatCurrency} timePeriod={timePeriod} />
      </div>
    </>
  );
}

export default App;
