import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {PieChart} from 'react-native-svg-charts';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data = [
  {
    key: 1,
    amount: 50,
    svg: {fill: '#bababa'},
  },
];

const DetailSpentCard = ({type, chartData}) => {
  const pieData = chartData?.map(item => ({
    value: item.amount / 100,
    svg: {
      fill: item.fill,
    },
    key: item.key,
  }));
  return (
    <Wrapper>
      <LeftWrapper>
        {chartData !== undefined || null ? (
          <>
            <LabelTitle>Detail {type}</LabelTitle>
            {chartData.slice(0, 10).map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    width: wp('1%'),
                    height: wp('1%'),
                    backgroundColor: item.fill,
                    marginRight: wp('1%'),
                    marginBottom: hp('1.25%'),
                  }}></View>
                <Text
                  style={{
                    fontSize: hp('1.125%'),
                    fontStyle: 'italic',
                    color: '#7c7c7c',
                    fontFamily: 'DMSans-Medium',
                  }}>
                  {item.key}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <LabelTitle>Belum ada transaksi.</LabelTitle>
        )}
      </LeftWrapper>
      <RightWrapper>
        {chartData === undefined ? (
          <PieChart
            style={{height: hp('20%')}}
            valueAccessor={({item}) => item.amount}
            key={({item}) => item.key}
            data={data}
            padAngle={0.01}
            outerRadius={'90%'}></PieChart>
        ) : (
          <PieChart
            style={{height: hp('20%')}}
            valueAccessor={({item}) => item.value}
            key={({item}) => item.key}
            data={pieData ? pieData : data}
            padAngle={0.01}
            outerRadius={'90%'}></PieChart>
        )}
      </RightWrapper>
    </Wrapper>
  );
};

export default DetailSpentCard;

const Wrapper = styled.View`
  border-radius: 5px;
  background-color: #fff;
  padding: ${hp('1.5%')}px ${wp('3%')}px;
  width: 100%;
  flex: 1;
  border: 3px #f6f6f6;
  flex-direction: row;
  margin-bottom: ${hp('1%')}px;
  margin-left: ${wp('3%')}px;
  margin-right: ${wp('3%')}px;
  height: ${hp('25%')}px;
`;

const LeftWrapper = styled.View`
  flex-direction: column;
  flex: 1;
`;
const RightWrapper = styled.View`
  flex: 1;
`;

const LabelTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;
  color: #000000;
`;
