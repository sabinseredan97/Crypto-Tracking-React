import React, { useState, useEffect } from 'react';
import cryptoCurrencies from './currencies/cryptoCurrencies';
import fiatCurrencies from './currencies/fiatCurrencies';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 
export default function CryptoChart(props) {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [cryptoId, setCryptoId] = useState("");
  const [exchRate, setExchRate] = useState("");
  const [fiatCoinUnit, setFiatCoinUnit] = useState("");
  const cryptoCoins = cryptoCurrencies;
  const fiatCoins = fiatCurrencies;

  function getCryptoCurrencyId() {
    cryptoCoins.map((coin) => {
      if (props.cryptoCurrency.toLowerCase() === coin.name.toLowerCase() && cryptoId !== coin.id) {
        setCryptoId(coin.id);
      }
    });
  }

  function getExchangeRate() {
    fiatCoins.map((currency) => {
      if (props.fiatCurrency.toLowerCase() === currency.name.toLowerCase() && exchRate !== currency.id) {
        setExchRate(currency.id);
        setFiatCoinUnit(currency.unit);
      }
    });
  }

  getCryptoCurrencyId();
  getExchangeRate();

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${exchRate}&days=${props.timePeriod}&interval=daily`)
      .then(async (res) => {
        await setCryptoPrices(res.data.prices);
      })
    .catch(err => console.log(err))
  }, [cryptoId, exchRate, props.timePeriod]);

  const options = {
    responsive: true,
    scales: {
        y: {
            grace: "75%",
        },
    },
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: `${props.cryptoCurrency}'s evolution in the past ${props.timePeriod} days`,
        },
    },
};
  
const dateFormat = { year: "numeric", month: "short", day: "numeric" }
    const labels = cryptoPrices.map((date, index) => new Intl.DateTimeFormat("en-GB", dateFormat).format(cryptoPrices[index][0]));
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: `${props.fiatCurrency + " " + fiatCoinUnit}`,
                data: cryptoPrices.map((value) => value[1].toFixed(2)),
                borderColor: "rgb(0,255,0)",
                borderWidth: .5,
                backgroundColor: "rgba(0, 255, 0, 0.7)",
            },
        ],
    };

  return (
    <Line options={options} data={data} />
  );
}