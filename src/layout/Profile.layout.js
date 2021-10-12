import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {logoutHandle, updateProfileHandle, updatePassword} from '../state';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Profile = () => {
  const {token, userData, loading} = useSelector(state => state.user);
  const userDataFullName = userData.name;
  const userId = userData.id;
  const dispatch = useDispatch();

  const [userFullName, setUserFullName] = useState(
    userDataFullName ? userDataFullName : '',
  );

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onLogoutButtonPressed = () => {
    dispatch(logoutHandle());
  };

  const onUpdateProfileButtonPressed = () => {
    if (userFullName === '') {
      Toast.show({
        type: 'info',
        text1: 'Form nama tidak boleh kosong.',
      });
    } else {
      dispatch(updateProfileHandle(userId, userFullName, token));
    }
  };

  const onChangePasswordButtonPressed = () => {
    if (oldPassword === '') {
      Toast.show({
        type: 'info',
        text1: 'Password lama tidak boleh kosong.',
      });
    } else if (newPassword === '') {
      Toast.show({
        type: 'info',
        text1: 'Password baru tidak boleh kosong.',
      });
    } else {
      dispatch(updatePassword(userId, oldPassword, newPassword, token));
      setOldPassword('');
      setNewPassword('');
    }
  };
  useEffect(() => {
    if (userDataFullName) {
      setUserFullName(userDataFullName);
    }
  }, [userDataFullName]);

  return (
    <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Wrapper>
            <TitleWrapper>
              <Title>Halaman Profil</Title>
              <Icon.Button
                name="log-out-outline"
                backgroundColor="#2e3a59"
                color="#fff"
                style={{
                  paddingHorizontal: wp('3%'),
                  paddingVertical: hp('0.5%'),
                }}
                onPress={onLogoutButtonPressed}>
                Logout
              </Icon.Button>
            </TitleWrapper>
            <HeaderWrapper>
              <ProfileImage source={require('../assets/avatar.jpg')} />
              <UserInfoWrapper>
                <HeaderLabel>{userData.name}</HeaderLabel>
                <EmailLabel>{userData.email}</EmailLabel>
              </UserInfoWrapper>
            </HeaderWrapper>
            <EditProfileWrapper>
              <HeaderLabel>Edit Profil</HeaderLabel>
              <FormLabel>Nama</FormLabel>
              <StyledInput
                value={userFullName}
                onChangeText={setUserFullName}
                placeholder="Nama"
                placeholderTextColor="#C4C4C4"
                style={{
                  borderWidth: 1,
                  padding: hp('1%'),
                  paddingHorizontal: wp('3%'),
                  borderRadius: 5,
                  borderColor: '#E0E0E0',
                  color: '#000',
                }}
              />
              <FormLabel>Username</FormLabel>
              <StyledInput
                value={userData.username}
                placeholder="Username"
                placeholderTextColor="#C4C4C4"
                selectTextOnFocus={false}
                editable={false}
                style={{
                  borderWidth: 1,
                  padding: hp('1%'),
                  paddingHorizontal: wp('3%'),
                  borderRadius: 5,
                  borderColor: '#E0E0E0',
                  color: '#b6b6b6',
                }}
              />
              <FormLabel>Email</FormLabel>
              <StyledInput
                value={userData.email}
                placeholder="Email"
                placeholderTextColor="#C4C4C4"
                selectTextOnFocus={false}
                editable={false}
                style={{
                  borderWidth: 1,
                  padding: hp('1%'),
                  paddingHorizontal: wp('3%'),
                  borderRadius: 5,
                  borderColor: '#E0E0E0',
                  color: '#b6b6b6',
                }}
              />
              <StyledButton
                activeOpacity={0.9}
                onPress={onUpdateProfileButtonPressed}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fafafa" />
                ) : (
                  <TextButton>Update Profil</TextButton>
                )}
              </StyledButton>
            </EditProfileWrapper>
            <EditProfileWrapper>
              <HeaderLabel>Ganti Password</HeaderLabel>
              <PasswordFormWrapper>
                <InnerFormWrapper>
                  <FormLabel>Password Lama</FormLabel>
                  <StyledInput
                    secureTextEntry={true}
                    placeholder="Password Lama"
                    placeholderTextColor="#C4C4C4"
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    style={{
                      borderWidth: 1,
                      padding: hp('1%'),
                      paddingHorizontal: wp('3%'),
                      borderRadius: 5,
                      borderColor: '#E0E0E0',
                      color: '#000',
                    }}
                  />
                </InnerFormWrapper>
                <InnerFormWrapper>
                  <FormLabel>Password Baru</FormLabel>
                  <StyledInput
                    secureTextEntry={true}
                    placeholder="Password Baru"
                    placeholderTextColor="#C4C4C4"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={{
                      borderWidth: 1,
                      padding: hp('1%'),
                      paddingHorizontal: wp('3%'),
                      borderRadius: 5,
                      borderColor: '#E0E0E0',
                      color: '#000',
                    }}
                  />
                </InnerFormWrapper>
              </PasswordFormWrapper>
              <StyledButton
                activeOpacity={0.9}
                onPress={onChangePasswordButtonPressed}>
                <TextButton>Update Password</TextButton>
              </StyledButton>
            </EditProfileWrapper>
          </Wrapper>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
  padding: ${hp('2%')}px ${wp('3%')}px ${hp('2%')}px ${wp('3%')}px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${hp('2.25%')}px 0px;
`;

const Title = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2.25%')}px;
  color: #000000;
`;

const HeaderWrapper = styled.View`
  border: 2px solid #f6f6f6;
  background: #ffffff;
  border-radius: 5px;
  padding: ${hp('1.125%')}px;
  flex-direction: row;
  align-items: flex-start;
`;

const ProfileImage = styled.Image`
  width: ${hp('6%')}px;
  height: ${hp('6%')}px;
  border-radius: ${hp('3%')}px;
`;

const UserInfoWrapper = styled.View`
  flex-direction: column;
  padding: 0px ${wp('3%')}px;
`;

const HeaderLabel = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('2.25%')}px;
  color: #000000;
`;

const EmailLabel = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('1.75%')}px;
  color: #5b5b5b;
`;

const EditProfileWrapper = styled.View`
  border: 2px solid #f6f6f6;

  background: #ffffff;
  border-radius: 5px;
  margin-top: ${hp('2.125%')}px;
  padding: ${hp('2%')}px ${wp('3%')}px;
`;

const FormLabel = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('1.875%')}px;
  color: #000000;
  margin-top: ${hp('1.5%')}px;
  margin-bottom: ${hp('0.75%')}px;
`;

const StyledInput = styled.TextInput`
  font-family: DMSans-Regular;
`;

const StyledButton = styled.TouchableOpacity`
  background: #2e3a59;
  border-radius: 4px;
  margin-top: ${hp('2.125%')}px;
  padding: ${hp('1%')}px 0px;
  width: 100%;
  align-items: center;
`;

const TextButton = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('1.875%')}px;
  color: #ffffff;
`;

const PasswordFormWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const InnerFormWrapper = styled.View`
  flex-direction: column;
  flex: 1;
  padding-right: ${wp('2%')}px;
`;
