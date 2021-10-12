import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import CurrencyFormat from './CurrencyFormat';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CategoryTransactionCard = ({data, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Wrapper>
        <Image
          source={{uri: data?.icon}}
          style={{width: wp('5%'), height: wp('5%'), marginRight: wp('2%')}}
        />
        <DescriptionWrapper>
          <DescriptionTitle>{data?.key}</DescriptionTitle>
          <DescriptionAmount>
            <CurrencyFormat value={data ? data?.amount : 0} />
          </DescriptionAmount>
        </DescriptionWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default CategoryTransactionCard;

const Wrapper = styled.View`
  margin-right: ${wp('2%')}px;
  margin-top: ${wp('2%')}px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: ${wp('2%')}px;
  height: ${hp('6%')}px;
  flex-direction: row;
  align-items: center;
`;

const DescriptionWrapper = styled.View`
  flex-direction: column;
`;

const DescriptionTitle = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('1.5%')}px;
  color: #495959;
`;

const DescriptionAmount = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('1.75%')}px;
  color: #000000;
`;
