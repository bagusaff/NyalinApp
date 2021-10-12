import React, {useState, useRef} from 'react';
import styled from 'styled-components/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TransactionCard from '../components/TransactionCard';

import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useSelector, useDispatch} from 'react-redux';

import {searchTransaction, clearSearchResult} from '../state';

const SearchTransaction = ({navigation}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');

  const {searchResults, isFetching} = useSelector(state => state.transaction);
  const {token} = useSelector(state => state.user);
  const CARD_HEIGHT = 60;

  const PAUSE = 1000;
  const timer = useRef(null);

  const getItemLayout = (data, index) => {
    const length = CARD_HEIGHT || 0;
    const offset = CARD_HEIGHT * index;
    return {length, offset, index};
  };

  const onChange = newVal => {
    setFilter(newVal);
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => changeSearchString(newVal), PAUSE);
  };

  const changeSearchString = newString => {
    dispatch(searchTransaction(newString, token));
  };

  const renderItem = ({item}) => (
    <TransactionCard
      title={item.title}
      amount={item.amount}
      category={item.type_id}
      date={item.date}
      note={item.note}
      onPress={() => navigation.push('Edit', {item})}
    />
  );

  const handleGetBack = () => {
    dispatch(clearSearchResult());
    navigation.goBack();
  };
  return (
    // <KeyboardAwareScrollView>
    <Wrapper>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Icon
          name="arrow-back-outline"
          size={hp('3%')}
          color="#000000"
          onPress={() => handleGetBack()}
        />
        <HeaderTitle style={{marginLeft: wp('3%'), marginTop: wp('1%')}}>
          Cari Transaksi
        </HeaderTitle>
      </View>
      <SearchBar
        placeholder="Search"
        value={filter}
        onChangeText={onChange}></SearchBar>
      <ContentWrapper>
        {isFetching ? (
          <ActivityIndicator
            color="#2E3A59"
            size="large"
            style={{paddingVertical: hp('1%')}}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResults}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
          />
        )}
      </ContentWrapper>
    </Wrapper>
    // </KeyboardAwareScrollView>
  );
};

export default SearchTransaction;

const Wrapper = styled.View`
  padding-left: ${wp('3%')}px;
  padding-right: ${wp('3%')}px;
  padding-top: ${hp('5%')}px;
  flex: 1;
  background-color: #fff;
`;

const HeaderTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;
  color: #000000;
  padding-bottom: ${hp('1.25%')}px;
`;

const SearchBar = styled.TextInput`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: 100%;
  padding-left: ${wp('3%')}px;
  padding-bottom: ${hp('1.25%')}px;
  padding-top: ${hp('1.25%')}px;
  color: #000;
`;

const ContentWrapper = styled.View`
  /* padding-left: ${wp('3%')}px; */
  flex: 1;
  /* padding-right: ${wp('3%')}px; */
`;
