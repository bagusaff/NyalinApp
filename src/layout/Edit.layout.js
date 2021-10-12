import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';

import {
  updateTransactions,
  deleteTransactions,
  deleteTransactionsLocal,
} from '../state';
import Toast from 'react-native-toast-message';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CurrencyInput from 'react-native-currency-input';

const Edit = ({navigation, route}) => {
  const {amount, category, date, id, note} = route.params.item;

  const dispatch = useDispatch();
  const {userData, token} = useSelector(state => state.user);
  const {isConnected} = useSelector(state => state.connection);
  const user_id = userData.id;
  const [dateEdit, setDateEdit] = useState(new Date());
  const [when, setWhen] = useState();
  const [noteEdit, setNoteEdit] = useState('');
  const [amountEdit, setAmountEdit] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setNoteEdit(note);
    setAmountEdit(amount);
    setWhen(date);
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const simplyfiedDate = selectedDate.toISOString().slice(0, 10);
    setShow(Platform.OS === 'ios');
    setDateEdit(currentDate);
    setWhen(simplyfiedDate);
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Apakah kamu yakin?',
      'Apakah kamu yakin untuk menghapus transaksi ini ?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            dispatch(deleteTransactions({id, token}));
            dispatch(deleteTransactionsLocal({id}));
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
    if (when === undefined) {
      Toast.show({
        type: 'error',
        text1: 'Tanggal belum diisi.',
      });
    } else if (noteEdit === '') {
      Toast.show({
        type: 'error',
        text1: 'Catatan belum diisi.',
      });
    } else if (amountEdit === 0) {
      Toast.show({
        type: 'error',
        text1: 'Nominal tidak boleh 0.',
      });
    } else {
      try {
        const newData = {
          user_id: user_id,
          post_id: id,
          note: noteEdit,
          amount: amountEdit,
          date: when,
          token: token,
        };
        if (isConnected) {
          dispatch(updateTransactions(newData));
        }
        navigation.popToTop();
        navigation.navigate('Income');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Wrapper>
      <HeaderWrapper>
        <Icon
          name="arrow-back-outline"
          size={hp('3%')}
          color="#000000"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Edit Transaksi</HeaderTitle>
        <Icon
          name="trash-outline"
          size={hp('3%')}
          color="#000000"
          onPress={() => showConfirmDialog()}
        />
      </HeaderWrapper>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <ContentWrapper>
            <TitleWrapper>
              <Title>{category}</Title>
            </TitleWrapper>
            <FormLabel>Catatan</FormLabel>
            <StyledInput
              placeholder="Catatan"
              placeholderTextColor="#C4C4C4"
              style={{
                borderWidth: 1,
                padding: hp('1%'),
                paddingHorizontal: wp('3%'),
                borderRadius: 5,
                borderColor: '#E0E0E0',
                color: '#000',
              }}
              value={noteEdit}
              onChangeText={setNoteEdit}
            />
            <FormLabel>Nominal</FormLabel>
            <CurrencyInput
              placeholder="0"
              placeholderTextColor="#C4C4C4"
              keyboardType="numeric"
              prefix="IDR "
              delimiter=","
              separator="."
              style={{
                borderWidth: 1,
                padding: hp('1%'),
                paddingHorizontal: wp('3%'),
                borderRadius: 5,
                borderColor: '#E0E0E0',
                color: '#000',
              }}
              value={amountEdit ? amountEdit.toString() : ''}
              onChangeValue={setAmountEdit}
            />
            <FormLabel>Tanggal Transaksi</FormLabel>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: hp('1%'),
                borderColor: '#E0E0E0',
                color: '#000',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 7,
                  paddingHorizontal: wp('2%'),
                }}>
                {when == null ? 'Tanggal Belum Dipilih' : when}
              </Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateEdit}
                onChange={onChangeDate}
                mode="date"
              />
            )}
            <StyledButton activeOpacity={0.9} onPress={onSubmit}>
              <TextButton> Update Transaksi </TextButton>
            </StyledButton>
          </ContentWrapper>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export default Edit;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const HeaderWrapper = styled.View`
  padding: ${hp('3%')}px ${wp('5%')}px ${hp('2%')}px ${wp('5%')}px;

  background-color: #eaeaea;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;

  color: #000000;
`;

const ContentWrapper = styled.View`
  align-self: center;
  justify-content: center;
  padding: ${hp('7%')}px ${wp('15%')}px;

  width: 100%;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('3%')}px;

  color: #000000;
`;

const FormLabel = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('1.75%')}px;
  color: #000000;
  margin-top: ${hp('2%')}px;
  margin-bottom: ${hp('1%')}px;
`;

const StyledInput = styled.TextInput`
  font-family: DMSans-Regular;
`;

const StyledButton = styled.TouchableOpacity`
  background: #2e3a59;
  border-radius: 4px;
  margin-top: ${hp('3%')}px;
  padding: ${hp('1.25%')}px 0px;
  width: 100%;
  align-items: center;
`;

const TextButton = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;

  color: #ffffff;
`;
