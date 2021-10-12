import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import {setForm, registerHandle} from '../state';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const {fullName, email, username, password, confirmPassword} = useSelector(
    state => state.register,
  );
  const onInputChanges = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };

  const sendForm = () => {
    if (fullName && email && username && password && confirmPassword === '') {
      Toast.show({
        type: 'error',
        text1: 'Semua form tidak boleh kosong!',
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password tidak cocok',
      });
    } else {
      dispatch(registerHandle(username, password, fullName, email));
    }
  };
  return (
    <KeyboardAwareScrollView>
      <Wrapper>
        <HeaderWrapper>
          <Icon
            name="arrow-back-outline"
            size={hp('3.5%')}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <HeaderText>Register</HeaderText>
          {/* life hacks LOL! */}
          <Icon name="arrow-back-outline" size={30} color="transparent" />
        </HeaderWrapper>
        <FormWrapper>
          <InputWrapper>
            <InputTitle>Full Name</InputTitle>
            <StyledInput
              placeholder="Full Name"
              placeholderTextColor="#C4C4C4"
              value={fullName}
              onChangeText={value => onInputChanges(value, 'fullName')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Email</InputTitle>
            <StyledInput
              placeholder="Email"
              autoCompleteType="email"
              placeholderTextColor="#C4C4C4"
              value={email}
              onChangeText={value => onInputChanges(value, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Username</InputTitle>
            <StyledInput
              placeholder="Username"
              placeholderTextColor="#C4C4C4"
              value={username}
              onChangeText={value => onInputChanges(value, 'username')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Password</InputTitle>
            <StyledInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#C4C4C4"
              value={password}
              onChangeText={value => onInputChanges(value, 'password')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Confirm Password</InputTitle>
            <StyledInput
              secureTextEntry={true}
              placeholder="Re-enter Password"
              placeholderTextColor="#C4C4C4"
              value={confirmPassword}
              onChangeText={value => onInputChanges(value, 'confirmPassword')}
            />
          </InputWrapper>

          <RegisterButton activeOpacity={0.7} onPress={sendForm}>
            <RegisterText>Register</RegisterText>
          </RegisterButton>
        </FormWrapper>
      </Wrapper>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #eaeaea;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderWrapper = styled.View`
  padding: ${hp('3%')}px ${wp('5%')}px;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FormWrapper = styled.View`
  background-color: #fafafa;
  padding: ${hp('3%')}px ${wp('5%')}px;
  border-top-left-radius: 50px;
  width: 100%;
  height: 100%;
  flex: 6;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderText = styled.Text`
  font-family: DMSans-Medium;
  font-size: ${hp('3%')}px;
`;

const InputWrapper = styled.View`
  background: #ffffff;
  margin: ${hp('0.75%')}px ${wp('5%')}px;
  border-radius: 5px;
  border-width: 2px;
  border-color: #f6f6f6;
  padding: ${hp('1%')}px ${wp('3%')}px;
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
  margin-bottom: ${hp('1.5%')}px;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: #2e3a59;
  margin: ${hp('2%')}px;
  padding: ${hp('1.5%')}px;
  border-radius: 10px;
  border-top-right-radius: 0px;
  width: 100%;
  align-items: center;
`;

const RegisterText = styled.Text`
  font-family: 'DMSans-Medium';
  font-size: ${hp('2%')}px;
  color: #ffffff;
`;
