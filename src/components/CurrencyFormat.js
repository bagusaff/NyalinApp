import React from 'react';
import {Text} from 'react-native';
import NumberFormat from 'react-number-format';

const CurrencyFormat = ({value}) => {
  return (
    <NumberFormat
      value={value}
      prefix={'IDR '}
      thousandSeparator={true}
      displayType={'text'}
      renderText={formattedValue => <Text>{formattedValue}</Text>}
    />
  );
};

export default CurrencyFormat;
