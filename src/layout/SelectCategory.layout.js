import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useSelector} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {FlatGrid} from 'react-native-super-grid';

const SelectCategory = ({navigation}) => {
  const {categories} = useSelector(state => state.transaction);

  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const [allCategories, setAllCategories] = useState([]);

  const CARD_HEIGHT = wp('10%');

  const getItemLayout = (data, index) => {
    const length = CARD_HEIGHT || 0; // <----- if undefined return 0
    const offset = CARD_HEIGHT * index;
    return {length, offset, index};
  };

  useEffect(() => {
    setAllCategories(categories);
    setTimeout(() => setisLoading(false), 2000);
  }, [categories]);
  return (
    <Wrapper>
      <HeaderWrapper>
        <Icon
          name="arrow-back-outline"
          size={hp('3.5%')}
          color="#000000"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Pilih Kategori </HeaderTitle>
        <Icon name="arrow-back-outline" size={hp('3.5%')} color="transparent" />
      </HeaderWrapper>
      <ContentWrapper>
        <FilterButtonWrapper>
          <FilterButton
            activeOpacity={0.8}
            onPress={() => setIsSelected(false)}
            isSelected={isSelected}>
            <ButtonTitle isSelected={isSelected}>Pemasukan</ButtonTitle>
            <Image
              source={require('../assets/income.png')}
              style={{width: wp('3%'), height: wp('3%')}}
            />
          </FilterButton>
          <FilterButton
            activeOpacity={0.8}
            onPress={() => setIsSelected(true)}
            isSelected={!isSelected}>
            <ButtonTitle isSelected={!isSelected}>Pengeluaran</ButtonTitle>
            <Image
              source={require('../assets/outcome.png')}
              style={{width: wp('3%'), height: wp('3%')}}
            />
          </FilterButton>
        </FilterButtonWrapper>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2E3A59" />
        ) : (
          <FilterWrapper>
            {!isSelected ? (
              <FlatGrid
                itemDimension={wp('15%')}
                data={allCategories.filter(obj => obj.type_id === 1)}
                getItemLayout={getItemLayout}
                renderItem={({item, index}) => (
                  <FilterIconWrapper key={index}>
                    <FilterIcon
                      onPress={() =>
                        navigation.push('Post', {
                          type: 'Pemasukan',
                          title: item.name,
                          image: item.icon,
                          category: item.id,
                          type_id: item.type_id,
                        })
                      }>
                      <Image
                        source={{uri: item.icon}}
                        style={{
                          width: wp('8%'),
                          height: wp('8%'),
                          alignSelf: 'center',
                        }}
                      />
                    </FilterIcon>
                    <FilterTitle>{item.name}</FilterTitle>
                  </FilterIconWrapper>
                )}
              />
            ) : (
              <FlatGrid
                itemDimension={wp('15%')}
                data={allCategories.filter(obj => obj.type_id === 2)}
                getItemLayout={getItemLayout}
                renderItem={({item, index}) => (
                  <FilterIconWrapper key={index}>
                    <FilterIcon
                      onPress={() =>
                        navigation.push('Post', {
                          type: 'Pemasukan',
                          title: item.name,
                          image: item.icon,
                          category: item.id,
                          type_id: item.type_id,
                        })
                      }>
                      <Image
                        source={{uri: item.icon}}
                        style={{
                          width: wp('8%'),
                          height: wp('8%'),
                          alignSelf: 'center',
                        }}
                      />
                    </FilterIcon>
                    <FilterTitle>{item.name}</FilterTitle>
                  </FilterIconWrapper>
                )}
              />
            )}
          </FilterWrapper>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default SelectCategory;

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const HeaderWrapper = styled.View`
  background-color: #eaeaea;
  width: 100%;
  padding: ${hp('3%')}px ${wp('3%')}px ${hp('6%')}px;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2.5%')}px;
  color: #000000;
`;

const ContentWrapper = styled.View`
  padding: 0px ${wp('3%')}px;
  justify-content: space-around;
`;

const FilterButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  top: -${hp('2%')}px;
`;

const FilterButton = styled.TouchableOpacity`
  background-color: ${({isSelected}) => (isSelected ? 'white' : '#2E3A59')};
  border-radius: 5px;
  padding: ${hp('1.25%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${wp('45%')}px;
`;

const ButtonTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2%')}px;
  color: ${({isSelected}) => (isSelected ? 'black' : 'white')};
  margin-right: ${wp('3%')}px;
`;

const FilterWrapper = styled.View`
  flex-wrap: wrap;
  flex-direction: row;

  flex: 1;
`;

const FilterIconWrapper = styled.View``;

const FilterIcon = styled.TouchableOpacity`
  padding: ${hp('1%')}px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: ${hp('0.875%')}px;
`;

const FilterTitle = styled.Text`
  font-family: DMSans-Bold;
  font-weight: bold;
  font-size: ${wp('2.25%')}px;
  text-align: center;
  color: #000000;
`;
