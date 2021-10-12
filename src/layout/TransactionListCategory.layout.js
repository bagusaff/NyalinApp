import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import TransactionCard from '../components/TransactionCard';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//redux
import {useSelector} from 'react-redux';

const TransactionListCategory = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const {id, key} = route.params.entry;
  const [data, setData] = useState([]);
  const {transactions} = useSelector(state => state.transaction);

  const CARD_HEIGHT = 50;

  const getItemLayout = (data, index) => {
    const length = CARD_HEIGHT || 0; // <----- if undefined return 0
    const offset = CARD_HEIGHT * index;
    return {length, offset, index};
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

  useEffect(() => {
    setData(transactions.filter(obj => obj.category_id === id));
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Icon
          name="arrow-back-outline"
          size={hp('3%')}
          color="#000000"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Transaksi : {key}</HeaderTitle>
        <Icon name="arrow-back-outline" size={hp('3%')} color="#eaeaea" />
      </HeaderWrapper>
      <ContentWrapper>
        <TransactionsWrapper>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            style={{width: width, paddingHorizontal: hp('1.5%')}}
          />
        </TransactionsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default TransactionListCategory;

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderWrapper = styled.View`
  background-color: #eaeaea;
  width: 100%;
  padding-right: ${wp('3%')}px;
  padding-left: ${wp('3%')}px;
  padding-top: ${hp('3.5%')}px;
  padding-bottom: ${hp('3%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;
  color: #000000;
`;

const ContentWrapper = styled.View`
  padding-left: ${wp('3%')}px;
  flex: 1;
  padding-right: ${wp('3%')}px;
`;

const TransactionsWrapper = styled.View`
  padding-top: ${hp('1.5%')}px;
  flex: 1;
`;
