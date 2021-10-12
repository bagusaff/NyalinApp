import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import CurrencyFormat from './CurrencyFormat';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TransactionCard = (
  {category, title, note, amount, date, onPress},
  key,
) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Wrapper>
        <TextWrapper>
          <LeftWrapper>
            <Title numberOfLines={1}>{note}</Title>
            <Date>{date}</Date>
          </LeftWrapper>
          <RightWrapper>
            <Amount category={category}>
              {category === 1 ? '+ ' : '- '}
              <CurrencyFormat value={amount ? amount : 0} />
            </Amount>
            <Category>{category === 1 ? 'Pemasukan' : 'Pengeluaran'}</Category>
          </RightWrapper>
        </TextWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default TransactionCard;

const Wrapper = styled.View`
  width: 100%;
  padding: ${hp('1%')}px ${wp('2%')}px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  background-color: white;
  margin: ${hp('0.75%')}px 0px;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LeftWrapper = styled.View``;

const RightWrapper = styled.View``;

const Title = styled.Text`
  font-size: ${hp('1.85%')}px;
  font-family: 'DMSans-Regular';
  color: #000000;
  max-width: ${wp('50%')}px;
`;

const Date = styled.Text`
  font-size: 14px;
  color: #7c7c7c;
  font-family: 'DMSans-Regular';
`;

const Amount = styled.Text`
  font-family: 'DMSans-Regular';
  font-size: 18px;
  color: ${({category}) => (category === 1 ? '#5EAC24' : ' #ea2f2f')};
`;

const Category = styled.Text`
  font-family: DMSans-Regular;
  font-size: 14px;
  text-align: right;
  color: #7c7c7c;
`;
