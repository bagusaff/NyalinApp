import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import WelcomeIcon from '../assets/svg/WelcomeIcon';

const Welcome = ({navigation}) => {
  return (
    <Wrapper>
      <WelcomeWrapper>
        <WelcomeIcon />
        <WelcomeText>
          Manusia memiliki batas akan ingatannya masing-masing. Bersama Nyatet,
          kamu bisa melampaui batas!
        </WelcomeText>
      </WelcomeWrapper>
      <NextButton
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Auth')}>
        <NextText>MULAI SEKARANG</NextText>
      </NextButton>
    </Wrapper>
  );
};

export default Welcome;

const Wrapper = styled.View`
  background-color: #eaeaea;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding-right: 50px;
  padding-left: 50px;
`;

const WelcomeWrapper = styled.View`
  align-items: center;
`;

const WelcomeText = styled.Text`
  font-family: 'DMSans-Regular';
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  margin-top: 20px;
`;

const NextButton = styled.TouchableOpacity`
  background: #ffffff;
  border-radius: 5px;
  width: 100%;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const NextText = styled.Text`
  font-family: 'DMSans-Regular';
  letter-spacing: 1px;
`;
