import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';

import Toast from 'react-native-toast-message';

import {useDispatch, useSelector} from 'react-redux';

import NyatetLogo from '../assets/svg/NyatetLogo';
import {setForm, loginHandle} from '../state';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const {LoginUsername, LoginPassword} = useSelector(state => state.login);
  const {loading} = useSelector(state => state.user);
  const onInputChanges = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };

  const sendForm = () => {
    if (LoginUsername === '') {
      Toast.show({
        type: 'error',
        text1: 'Username tidak boleh kosong!',
      });
    } else if (LoginPassword === '') {
      Toast.show({
        type: 'error',
        text1: 'Password tidak boleh kosong!',
      });
    } else {
      dispatch(loginHandle(LoginUsername, LoginPassword));
    }
  };
  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      style={{width: wp('100%'), height: hp('100%')}}>
      <Wrapper>
        <LogoWrapper>
          <NyatetLogo />
        </LogoWrapper>
        <FormWrapper>
          <Title>Login</Title>
          <InputWrapper>
            <InputTitle>Username</InputTitle>
            <StyledInput
              placeholder="Username"
              placeholderTextColor="#C4C4C4"
              value={LoginUsername}
              onChangeText={value => onInputChanges(value, 'LoginUsername')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Password</InputTitle>
            <StyledInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#C4C4C4"
              value={LoginPassword}
              onChangeText={value => onInputChanges(value, 'LoginPassword')}
            />
          </InputWrapper>

          <LoginButton
            activeOpacity={0.8}
            onPress={sendForm}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fafafa" />
            ) : (
              <LoginText>Login</LoginText>
            )}
          </LoginButton>
          <LabelText>Belum Punya Akun ?</LabelText>
          <RegisterButton
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Register')}>
            <RegisterText>Register</RegisterText>
          </RegisterButton>
        </FormWrapper>
      </Wrapper>
    </KeyboardAwareScrollView>
  );
};

export default Auth;

const Wrapper = styled.View`
  flex: 1;
  height: ${hp('100%')}px;
  width: ${wp('100%')}px;
  background-color: #eaeaea;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.View`
  background-color: #fafafa;
  padding-left: ${wp('5%')}px;
  padding-right: ${wp('5%')}px;
  border-top-left-radius: 50px;
  flex: 5;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

const InputWrapper = styled.View`
  background: #ffffff;
  margin-top: ${hp('1%')}px;
  margin-bottom: ${hp('1%')}px;
  border-radius: 5px;
  border-width: 2px;
  border-color: #f6f6f6;
  padding: ${hp('1.5%')}px ${wp('3%')}px;
  width: 100%;
`;

const StyledInput = styled.TextInput`
  font-family: DMSans-Regular;
  height: ${hp('6.5%')}px;
  color: rgba(0, 0, 0, 1);
`;

const InputTitle = styled.Text`
  font-family: 'DMSans-Medium';
  font-size: ${hp('2%')}px;
  margin-bottom: ${hp('1%')}px;
`;

const Title = styled.Text`
  font-family: 'DMSans-Medium';
  color: #000000;
  font-size: ${hp('3.5%')}px;
  margin-top: ${hp('2%')}px;
  margin-bottom: ${hp('1%')}px;
`;

const LoginText = styled.Text`
  font-family: 'DMSans-Medium';
  font-size: ${hp('2%')}px;
  color: #ffffff;
`;

const RegisterText = styled.Text`
  font-family: 'DMSans-Medium';
  font-size: ${hp('2%')}px;
  color: #000000;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #2e3a59;
  margin: ${hp('1.5%')}px;
  padding: ${hp('1.5%')}px ${wp('2%')}px;
  border-radius: 10px;
  border-top-right-radius: 0px;
  width: 100%;
  align-items: center;
`;

const LabelText = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('1.5%')}px;
  text-align: center;
  color: #c4c4c4;
  font-style: italic;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: #eaeaea;
  margin: ${hp('1.5%')}px;
  padding: ${hp('1.5%')}px ${wp('2%')}px;
  border-radius: 10px;
  border-top-right-radius: 0px;
  width: 100%;
  align-items: center;
`;
