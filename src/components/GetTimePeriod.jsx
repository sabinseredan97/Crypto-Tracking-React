import React from 'react';
import timePeriods from './periods/timePeriods';
import Input from './Input';
import './getTimePeriod.css';

export default function GetTimePeriod(props) {
  const periods = timePeriods;

  function timePeriod(choosenPeriod) {
    periods.map((period) => {
      if (period.name === choosenPeriod) {
        return props.timePeriod(period.period);
      }
    });
  }

  return (
    <>
      <div className="timePeriod">
        <Input
          items={periods}
          list="timePeriods"
          type="text"
          className="period"
          placeHolder="Choose a time period"
          setOption={timePeriod}
          btnClass="periodBtn"
        />
      </div>
    </>
  );
}