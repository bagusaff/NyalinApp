import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const EmptyBanner = ({title}) => {
  return (
    <Wrapper>
      <Image
        source={require('../assets/empty_icon.png')}
        style={{width: wp('50%'), height: hp('25%'), resizeMode: 'contain'}}
      />
      <LabelText>{title} Kosong</LabelText>
    </Wrapper>
  );
};

export default EmptyBanner;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.Text`
  font-family: DMSans-Bold;
  font-style: normal;
  font-size: ${hp('2%')}px;
  color: #7c7c7c;
`;
