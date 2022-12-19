import React from 'react';
import Input from './Input';
import cryptoCurrencies from './currencies/cryptoCurrencies';
import fiatCurrencies from './currencies/fiatCurrencies';
import './setCurrencies.css';

export default function TestSetCurrencies(props) {
  const cryptoCoins = cryptoCurrencies;
  const fiatCoins = fiatCurrencies;

  function setCryptoCurrency(userCrypto) {
    return props.getCryptoCurrency(userCrypto);
  }

  function setFiatCurrency(userFiat) {
    return props.getFiatCurrency(userFiat);
  }

  return (
    <>
      <div className="fiat">
        <Input
          items={fiatCoins}
          list="fiatData"
          className="fiatCurrency"
          placeHolder="Fiat Currency"
          setOption={setFiatCurrency}
          type="text"
          btnClass="fiatSubmit" />
      </div>
      <div className="crypto">
        <Input
          items={cryptoCoins}
          list="cryptoData"
          className="cryptoCurrency"
          placeHolder="Crypto Currency"
          setOption={setCryptoCurrency}
          type="text"
          btnClass="cryptoSubmit" />
      </div>
    </>
  );
}