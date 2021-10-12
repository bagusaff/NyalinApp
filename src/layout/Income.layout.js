import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import ModalDropdown from 'react-native-modal-dropdown';

import CategoryTransactionCard from '../components/CategoryTransactionCard';
import DetailSpentCard from '../components/DetailSpentCard';
import TransactionCard from '../components/TransactionCard';

import {useDispatch, useSelector} from 'react-redux';

import {fetchTransactionsPerCategory} from '../state';
import TransactionSkeleton from '../components/TransactionSkeleton';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {Modalize} from 'react-native-modalize';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EmptyBanner from '../components/EmptyBanner';

const Income = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [incomeSelected, setIncomeSelected] = useState(true);
  const [selected, setSelected] = useState('daily');

  const {token} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {
    transactions,
    dailyTransactions,
    monthlyTransactions,
    yearlyTransactions,
  } = useSelector(state => state.transaction);

  const CARD_HEIGHT = 60;

  const getItemLayout = (data, index) => {
    const length = CARD_HEIGHT || 0; // <----- if undefined return 0
    const offset = CARD_HEIGHT * index;
    return {length, offset, index};
  };

  const filters = [
    {key: 'daily', value: 'Hari Ini'},
    {key: 'monthly', value: 'Bulan Ini'},
    {key: 'yearly', value: 'Tahun Ini'},
  ];

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
  const onSwipeUp = () => {
    modalizeRef.current?.open();
  };

  const handleOutcomeButton = () => {
    setIncomeSelected(false);
    setData(
      transactions
        .filter(obj => obj.type_id === 2)
        .sort((a, b) => (a.id < b.id ? 1 : -1)),
    );
    dispatch(fetchTransactionsPerCategory(2, token));
  };

  const handleIncomeButton = () => {
    setIncomeSelected(true);
    setData(
      transactions
        .filter(obj => obj.type_id === 1)
        .sort((a, b) => (a.id < b.id ? 1 : -1)),
    );
    dispatch(fetchTransactionsPerCategory(1, token));
  };

  const handleFilterButton = key => {
    setSelected(key);
    switch (key) {
      case 'daily':
        setChartData(dailyTransactions);
        break;
      case 'monthly':
        setChartData(monthlyTransactions);
        break;
      case 'yearly':
        setChartData(yearlyTransactions);
        break;
      default:
        return;
    }
  };

  const modalizeRef = useRef(null);
  useEffect(() => {
    setData(
      transactions
        .filter(obj => obj.type_id === 1)
        .sort((a, b) => (a.id < b.id ? 1 : -1)),
    );
    dispatch(fetchTransactionsPerCategory(1, token));
  }, [transactions]);

  useEffect(() => {
    setChartData(dailyTransactions);
  }, [transactions, dailyTransactions]);

  const windowWidth = Dimensions.get('window').width;
  return (
    <Wrapper>
      <TransactionSkeleton>
        <HeaderWrapper>
          <ModalDropdown
            dropdownStyle={{
              width: windowWidth / 2,
              height: hp('10%'),
              marginTop: -20,
            }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            dropdownTextStyle={{
              fontFamily: 'DMSans-Medium',
              fontSize: hp('2%'),
              color: '#000',
            }}
            defaultValue={'Hallo'}
            dropdownTextHighlightStyle={{color: '#000'}}
            isFullWidth={true}
            options={['Pemasukan', 'Pengeluaran']}
            onSelect={(index, option) => {
              if (option === 'Pemasukan') {
                handleIncomeButton();
              } else if (option === 'Pengeluaran') {
                handleOutcomeButton();
              }
            }}>
            <HeaderTitleWrapper>
              <HeaderTitle>
                {incomeSelected ? 'Pemasukan' : 'Pengeluaran'}
              </HeaderTitle>
              <Icon
                name="caret-down-outline"
                size={hp('2.5%')}
                color="#000000"
              />
            </HeaderTitleWrapper>
          </ModalDropdown>
          <View style={{flexDirection: 'row'}}>
            <AddIcon
              onPress={() => navigation.navigate('SearchTransaction')}
              activeOpacity={0.8}
              style={{
                width: wp('50%'),
                marginRight: wp('2%'),
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#bababa'}}>Temukan transaksi</Text>
              <Icon name="search-outline" size={hp('2.5%')} color="#000000" />
            </AddIcon>
            <AddIcon
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SelectCategory')}>
              <Icon name="add-outline" size={hp('2.5%')} />
            </AddIcon>
          </View>
        </HeaderWrapper>
        <FilterWrapper>
          {filters.map(item => (
            <FilterButton
              activeOpacity={0.9}
              key={item.key}
              style={{
                backgroundColor: item.key === selected ? '#2e3a59' : 'white',
                borderWidth: item.key === selected ? 0 : 1,
                borderColor: item.key === selected ? 'transparent' : '#E0E0E0',
              }}
              onPress={() => handleFilterButton(item.key)}>
              <FilterText
                style={{color: item.key === selected ? '#fff' : '#000'}}>
                {item.value}
              </FilterText>
            </FilterButton>
          ))}
        </FilterWrapper>
        <ContentWrapper>
          <DetailSpentCardWrapper>
            {chartData.length !== 0 ? (
              <DetailSpentCard type="Pemasukan" chartData={chartData} />
            ) : (
              <DetailSpentCard type="Pemasukan" chartData={undefined} />
            )}
          </DetailSpentCardWrapper>
          <ScrollWrapper>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {chartData !== undefined
                ? chartData
                    ?.sort((a, b) => (a.amount < b.amount ? 1 : -1))
                    .map((entry, index) => {
                      return (
                        <CategoryTransactionCard
                          key={index}
                          data={entry}
                          onPress={() =>
                            navigation.push('TransactionListCategory', {
                              entry,
                            })
                          }
                        />
                      );
                    })
                : null}
            </ScrollView>
          </ScrollWrapper>
          <TransactionWrapper>
            {data?.length == 0 ? (
              <EmptyBanner title="Transaksi" />
            ) : (
              <GestureRecognizer
                onSwipeUp={() => onSwipeUp()}
                config={{
                  velocityThreshold: 0.1,
                  directionalOffsetThreshold: 100,
                  gestureIsClickThreshold: 1,
                }}>
                <FlatList
                  data={data.slice(0, 5)}
                  keyExtractor={item => item.id.toString()}
                  ListHeaderComponent={() => {
                    return (
                      <TransactionTitle>
                        Semua Transaksi{' '}
                        {incomeSelected ? 'Pemasukan' : 'Pengeluaran'}
                      </TransactionTitle>
                    );
                  }}
                  renderItem={renderItem}
                  getItemLayout={getItemLayout}
                />
              </GestureRecognizer>
            )}
          </TransactionWrapper>
        </ContentWrapper>
      </TransactionSkeleton>
      <Modalize
        ref={modalizeRef}
        flatListProps={{
          data: data,
          renderItem: renderItem,
          keyExtractor: item => item.id.toString(),
          contentContainerStyle: {
            paddingHorizontal: wp('2.5%'),
            paddingTop: hp('1%'),
          },
          showsVerticalScrollIndicator: false,
          removeClippedSubviews: true,
          initialNumToRender: 10,
          maxToRenderPerBatch: 2,
          updateCellsBatchingPeriod: 100,
          windowSize: 7,
        }}
        modalHeight={hp('85%')}
      />
    </Wrapper>
  );
};

export default Income;

const Wrapper = styled.View`
  width: 100%;
  background-color: #ffffff;
  flex: 1;
`;

const HeaderWrapper = styled.View`
  justify-content: space-between;
  padding: ${hp('3%')}px ${wp('3%')}px;
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;
  text-align: center;
  color: #000000;
  padding-right: ${wp('1%')}px;
`;

const AddIcon = styled.TouchableOpacity`
  background: #eaeaea;
  padding: ${hp('1.25%')}px;
  border-radius: ${hp('50%')}px;
`;

const HeaderTitleWrapper = styled.View`
  flex-direction: row;
`;

const FilterWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${hp('1%')}px;
  padding-right: ${wp('3%')}px;
  padding-left: ${wp('3%')}px;
`;

const FilterButton = styled.TouchableOpacity`
  width: ${wp('29%')}px;
  padding: ${wp('1%')}px 0px;
  background: #2e3a59;
  border-radius: 3px;
`;

const FilterText = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('1.5%')}px;
  color: #ffffff;
  text-align: center;
`;

const ScrollWrapper = styled.View`
  flex-direction: row;
  padding: 0px ${wp('3%')}px;
`;

const ContentWrapper = styled.View`
  flex: 1;
`;

const DetailSpentCardWrapper = styled.View`
  padding-right: ${hp('3.5%')}px;
  height: ${hp('25%')}px;
`;

const TransactionWrapper = styled.View`
  padding-top: ${hp('1.5%')}px;
  padding-right: ${wp('3%')}px;
  padding-left: ${wp('3%')}px;
  flex: 1;
`;

const TransactionTitle = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('2%')}px;
  color: #000000;
  padding-bottom: ${hp('1%')}px;
`;
