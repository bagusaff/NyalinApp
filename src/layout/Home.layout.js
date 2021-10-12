import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DetailSpentCard from '../components/DetailSpentCard';
import Paginator from '../components/Paginator';
import TransactionCard from '../components/TransactionCard';

import {fetchHomePageTransactions} from '../state';

//skeleton
import HomeSkeleton from '../components/HomeSkeleton';
import CurrencyFormat from '../components/CurrencyFormat';
import EmptyBanner from '../components/EmptyBanner';

const Home = ({navigation}) => {
  //Animations hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navHooks = useNavigation();
  const viewableCardChanged = useRef(({viewableCard}) => {
    setCurrentIndex(viewableCard[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  //Redux Store
  const dispatch = useDispatch();
  const {transactions, homePageTransactions, isFetching} = useSelector(
    state => state.transaction,
  );
  const {token, userData} = useSelector(state => state.user);

  //local variables
  const {total, chart, last_transaction} = homePageTransactions;
  useEffect(() => {
    dispatch(fetchHomePageTransactions(token));
  }, [JSON.stringify(transactions)]);

  const CARD_HEIGHT = 60;

  const getItemLayout = (data, index) => {
    const length = CARD_HEIGHT || 0; // <----- if undefined return 0
    const offset = CARD_HEIGHT * index;
    return {length, offset, index};
  };

  const renderItem = ({item}) => (
    <TransactionCard
      note={item.note}
      amount={item.amount}
      category={item.type}
      date={item.created_at}
    />
  );
  return (
    <Wrapper>
      <HomeSkeleton>
        <HeaderWrapper>
          <Icon
            name="reorder-three"
            color="#000"
            size={hp('4%')}
            style={{marginRight: wp('3%')}}
            onPress={() => navHooks.openDrawer()}
          />
          <UserWrapper>
            <UserName>{userData.name}</UserName>
            <UserEmail>{userData.email}</UserEmail>
          </UserWrapper>
        </HeaderWrapper>
        <ContentWrapper>
          <LabelInfoWrapper>
            <LabelInfo>
              <LabelTitleWrapper>
                <LabelTitle>Total Pemasukan</LabelTitle>
                <Image
                  source={require('../assets/income.png')}
                  style={{width: 15, height: 15}}
                />
              </LabelTitleWrapper>
              <TotalAmount>
                {total ? <CurrencyFormat value={total.income} /> : null}
              </TotalAmount>
            </LabelInfo>
            <LabelInfo>
              <LabelTitleWrapper>
                <LabelTitle>Total Pengeluaran</LabelTitle>
                <Image
                  source={require('../assets/outcome.png')}
                  style={{width: 15, height: 15}}
                />
              </LabelTitleWrapper>
              <TotalAmount>
                {total ? <CurrencyFormat value={total.outcome} /> : null}
              </TotalAmount>
            </LabelInfo>
          </LabelInfoWrapper>
          <ScrollView
            style={{flex: 1, paddingBottom: hp('1%')}}
            horizontal={true}
            contentContainerStyle={{width: '200%'}}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={100}
            decelerationRate="fast"
            pagingEnabled
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={24}
            onViewableItemsChanged={viewableCardChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}>
            {[
              chart !== undefined ? (
                <DetailSpentCard
                  key={1}
                  type="Pemasukan"
                  chartData={chart.income}
                />
              ) : null,
              chart !== undefined ? (
                <DetailSpentCard
                  key={2}
                  type="Pengeluaran"
                  chartData={chart.outcome}
                />
              ) : null,
            ]}
          </ScrollView>
          <DetailCardWrapper>
            <SeeMoreText onPress={() => navigation.navigate('Transaction')}>
              Lihat Selengkapnya
            </SeeMoreText>
            <Paginator scrollX={scrollX} />
          </DetailCardWrapper>

          <TransactionWrapper>
            <TransactionTitleWrapper>
              <TransactionTitle>Transaksi Terakhir</TransactionTitle>
              <SeeMoreText onPress={() => navigation.navigate('Transaction')}>
                Lihat Semua
              </SeeMoreText>
            </TransactionTitleWrapper>
            {last_transaction?.length == 0 ? (
              <EmptyBanner title="Catatan" />
            ) : (
              <FlatList
                data={last_transaction}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
              />
            )}
          </TransactionWrapper>
        </ContentWrapper>
      </HomeSkeleton>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderWrapper = styled.View`
  background-color: #eaeaea;
  padding-bottom: ${hp('3%')}px;
  padding-left: ${wp('3%')}px;
  padding-right: ${wp('3%')}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${hp('15%')}px;
`;

const UserWrapper = styled.View``;

const UserName = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;
  color: #000000;
`;
const UserEmail = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('1.5%')}px;
  color: #7c7c7c;
`;

const ContentWrapper = styled.View`
  width: 100%;
  flex: 1;
`;

const LabelInfoWrapper = styled.View`
  flex-direction: row;
  top: -${hp('4%')}px;
  margin-right: ${wp('3%')}px;
  margin-left: ${wp('3%')}px;
  justify-content: space-between;
`;

const LabelInfo = styled.View`
  padding: ${hp('1%')}px ${wp('2%')}px;
  border-radius: 5px;
  border: 1px;
  border-color: #f6f6f6;
  width: ${wp('45%')}px;
  background-color: #ffffff;
  border: 2px solid #e0e0e0;
`;

const LabelTitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LabelTitle = styled.Text`
  font-family: DMSans-Regular;
  color: #7c7c7c;
  font-size: ${hp('1.75%')}px;
`;

const TotalAmount = styled.Text`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-size: ${hp('2%')}px;
  color: #000000;
`;

const DetailCardWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${wp('3%')}px;
  padding-right: ${wp('3%')}px;
  align-items: center;
  top: -${hp('4.5%')}px;
`;

const SeeMoreText = styled.Text`
  font-family: DMSans-Bold;
  font-style: normal;
  font-size: ${hp('1.5%')}px;
  color: #7c7c7c;
`;

const TransactionWrapper = styled.View`
  padding: ${hp('2%')}px;
  top: -${hp('3%')}px;
  flex: 1;
`;

const TransactionTitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${hp('1%')}px 0px;
`;

const TransactionTitle = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('2%')}px;
  color: #000000;
`;
