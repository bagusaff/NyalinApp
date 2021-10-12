import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import {deleteNotes, updateNotes} from '../state';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const EditNote = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const {isConnected} = useSelector(state => state.connection);

  const {id, title, tags, note} = route.params.item;
  const [inputTitle, setInputTitle] = useState('');
  const [inputTags, setInputTags] = useState('');
  const [inputNote, setInputNote] = useState('');

  useEffect(() => {
    setInputTitle(title);
    setInputNote(note);
    setInputTags(tags.join(', '));
  }, []);

  const showConfirmDialog = () => {
    return Alert.alert(
      'Apakah kamu yakin?',
      'Apakah kamu yakin untuk menghapus catatan ini ?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            dispatch(deleteNotes({id, token}));
            navigation.popToTop();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const onSubmit = () => {
    if (inputTitle === '') {
      Toast.show({
        type: 'info',
        text1: 'Judul belum diisi.',
      });
    } else if (inputTags === '') {
      Toast.show({
        type: 'info',
        text1: 'Tags belum diisi.',
      });
    } else if (inputNote === '') {
      Toast.show({
        type: 'info',
        text1: 'Catatan belum diisi.',
      });
    } else {
      try {
        const newData = {
          note_id: id,
          note: inputNote,
          token: token,
          title: inputTitle,
          tags: inputTags.split(','),
        };
        if (isConnected) {
          dispatch(updateNotes(newData));
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
            <Icon
              name="trash-outline"
              size={hp('3%')}
              onPress={() => showConfirmDialog()}
            />
          </HeaderWrapper>

          <Title
            placeholder="Tambah Judul"
            value={inputTitle}
            onChangeText={setInputTitle}
          />
          <Tag
            placeholder="Tambah Tag"
            value={inputTags}
            onChangeText={setInputTags}
          />
          <Body
            multiline={true}
            numberOfLines={30}
            textAlignVertical="top"
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

export default EditNote;

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
  color: #a5a5a5;
  margin-left: ${wp('1%')}px;
`;

const Body = styled.TextInput`
  margin-left: ${wp('1%')}px;
  padding-top: ${hp('1.5%')}px;
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
