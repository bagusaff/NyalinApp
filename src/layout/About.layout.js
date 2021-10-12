import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import WelcomeIcon from '../assets/svg/WelcomeIcon';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const About = () => {
  return (
    <Wrapper>
      <View style={{alignItems: 'center'}}>
        <View style={{paddingTop: hp('3%')}}>
          <WelcomeIcon />
        </View>
        <Body>
          <HeaderText>Tentang Kami</HeaderText>
          <BodyText>
            Nyalin adalah aplikasi yang dikembangkan oleh Tim Rembux Developer.
            Semua unsur yang terdapat di dalam aplikasi ini merupakan aset yang
            legal dilindungi hak cipta.
          </BodyText>
          <CreditHeader>Design By</CreditHeader>
          <CreditText>Ardhian Yuliandra Hanum</CreditText>
          <CreditHeader>Developed By</CreditHeader>
          <CreditText>Ardhian Yuliandra Hanum</CreditText>
          <CreditText>&</CreditText>
          <CreditText>Bagus Amrullah Fikri Fajri</CreditText>
        </Body>
      </View>
      <CreditFooter>© Copyright Rembux 2021</CreditFooter>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.SafeAreaView`
  align-items: center;
  justify-content: space-between;
  flex: 1;
  background-color: white;
`;

const Body = styled.View`
  padding: 0px ${wp('3%')}px;
  width: ${wp('90%')}px;
  align-items: center;
`;
const HeaderText = styled.Text`
  font-size: ${hp('2%')}px;
  font-family: DMSans-Medium;
  padding-bottom: ${hp('1.25%')}px;
`;
const CreditHeader = styled.Text`
  font-size: ${hp('2%')}px;
  font-family: DMSans-Medium;
  padding-bottom: ${hp('0.75%')}px;
`;

const BodyText = styled.Text`
  font-size: ${hp('1.5%')}px;
  font-family: DMSans-Regular;
  text-align: center;
  padding-bottom: ${hp('1%')}px;
`;

const CreditText = styled.Text`
  font-size: ${hp('1.675%')}px;
  font-family: DMSans-Regular;
  text-align: justify;
`;
const CreditFooter = styled.Text`
  padding-bottom: ${hp('1%')}px;
  font-size: ${hp('1.5%')}px;
  font-family: DMSans-Bold;
  text-align: justify;
  font-style: italic;
  color: #bababa;
`;
