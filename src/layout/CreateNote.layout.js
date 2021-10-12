import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {uploadNotes} from '../state';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CreateNote = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData, token} = useSelector(state => state.user);
  const {isConnected} = useSelector(state => state.connection);

  const user_id = userData.id;

  const [inputTitle, setInputTitle] = useState('');
  const [inputTags, setInputTags] = useState('');
  const [inputNote, setInputNote] = useState('');

  const onSubmit = () => {
    if (inputTitle === '') {
      Toast.show({
        type: 'error',
        text1: 'Judul belum diisi.',
      });
    } else if (inputTags === '') {
      Toast.show({
        type: 'error',
        text1: 'Tags belum diisi.',
      });
    } else if (inputNote === '') {
      Toast.show({
        type: 'error',
        text1: 'Catatan belum diisi.',
      });
    } else {
      try {
        const newData = {
          user_id: user_id,
          note: inputNote,
          token: token,
          title: inputTitle,
          tags: inputTags.split(','),
        };
        if (isConnected) {
          dispatch(uploadNotes(newData));
        } else {
          Toast.show({
            type: 'error',
            text1: 'Terjadi kesalahan, Cek koneksi anda! 😞',
          });
        }
        navigation.popToTop();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Wrapper>
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        contentContainerStyle={{flex: 1}}>
        <View>
          <HeaderWrapper>
            <Icon
              name="arrow-back-outline"
              size={hp('3%')}
              onPress={() => navigation.goBack()}
            />
          </HeaderWrapper>

          <Title
            placeholder="Tambah Judul"
            value={inputTitle}
            onChangeText={setInputTitle}
            placeholderTextColor="rgba(0,0,0,0.6)"
          />
          <Tag
            placeholder="Tambah Tag"
            value={inputTags}
            onChangeText={setInputTags}
            placeholderTextColor="rgba(0,0,0,0.6)"
          />
          <Body
            multiline={true}
            numberOfLines={30}
            textAlignVertical="top"
            placeholderTextColor="rgba(0,0,0,0.6)"
            placeholder="Tambah Isi Catatan"
            lineHeight={hp('3%')}
            value={inputNote}
            onChangeText={setInputNote}
          />
        </View>
      </KeyboardAwareScrollView>
      <SubmitButton activeOpacity={0.8} onPress={onSubmit}>
        <SubmitText>Simpan Catatan</SubmitText>
      </SubmitButton>
    </Wrapper>
  );
};

export default CreateNote;

const Wrapper = styled.View`
  padding: ${hp('7.5%')}px ${wp('3%')}px ${hp('2%')}px ${wp('3%')}px;
  flex: 1;
  background-color: #fff;
  justify-content: space-between;
`;

const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${wp('3%')}px;
`;

const Title = styled.TextInput`
  font-family: DMSans-Medium;
  font-size: ${hp('3.75%')}px;
  color: #000000;
  margin-left: ${wp('1%')}px;
`;

const Tag = styled.TextInput`
  font-family: DMSans-Regular;
  font-style: italic;
  padding-top: ${hp('0.75%')}px;
  font-size: ${hp('2.25%')}px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: ${wp('1%')}px;
`;

const Body = styled.TextInput`
  margin-left: ${wp('1%')}px;
  padding-top: ${hp('1%')}px;
  font-family: DMSans-Regular;
  font-size: ${hp('2.5%')}px;
  color: #000000;
  align-items: stretch;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  background: #2e3a59;
  border-radius: 5px;
  padding: ${wp('2%')}px 0px;
`;

const SubmitText = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;
  text-align: center;
  color: #ffffff;
`;
