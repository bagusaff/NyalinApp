import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Keyboard,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import NoteCard from '../components/NoteCard';
import ActionButton from '@logvinme/react-native-action-button';

//redux
import {useSelector} from 'react-redux';
import NoteSkeleton from '../components/NoteSkeleton';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EmptyBanner from '../components/EmptyBanner';

const NoteList = ({navigation}) => {
  const [data, setData] = useState([]);
  const {notes} = useSelector(state => state.note);
  const [tagList, setTagList] = useState([]);
  const [filter, setFilter] = useState('');

  const CARD_HEIGHT = 100;

  const getItemLayout = (data, index) => {
    const length = CARD_HEIGHT || 0; // <----- if undefined return 0
    const offset = CARD_HEIGHT * index;
    return {length, offset, index};
  };

  const renderItem = ({item}) => (
    <NoteCard
      id={item.id}
      title={item.title}
      note={item.note}
      tags={item.tags}
      onPress={() => navigation.navigate('EditNote', {item})}
    />
  );

  useEffect(() => {
    setTagList([]);
    setData(
      notes
        .filter(
          n =>
            n.note.toLowerCase().includes(filter.toLowerCase()) ||
            n.title.toLowerCase().includes(filter.toLowerCase()) ||
            filter === '',
        )
        .sort((a, b) => (a.id < b.id ? 1 : -1)),
    );
    const tempTag = [];
    notes.forEach(item =>
      item.tags.forEach(tag => {
        if (tempTag.indexOf(tag) < 0) {
          tempTag.push(tag);
        }
        setTagList(tempTag);
      }),
    );
  }, [notes, filter]);
  return (
    <NoteSkeleton>
      <Wrapper onPress={Keyboard.dismiss}>
        <HeaderTitle>Catatanku</HeaderTitle>
        <SearchBar
          placeholder="Search"
          value={filter}
          onChangeText={setFilter}></SearchBar>
        <FilterWrapper>
          <ScrollView horizontal={true}>
            {tagList?.map((item, index) => {
              return (
                <FilterButton
                  activeOpacity={0.9}
                  key={index}
                  onPress={() => navigation.push('NoteListTag', {tags: item})}>
                  <FilterText>{item}</FilterText>
                </FilterButton>
              );
            })}
          </ScrollView>
        </FilterWrapper>
        <NotesWrapper>
          {notes?.length == 0 ? (
            <EmptyBanner title="Catatan" />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              getItemLayout={getItemLayout}
            />
          )}
        </NotesWrapper>
      </Wrapper>
      <ActionButton
        buttonColor="rgba(46, 58, 89, 1)"
        onPress={() => {
          navigation.navigate('CreateNote');
        }}
      />
    </NoteSkeleton>
  );
};

export default NoteList;

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

const FilterWrapper = styled.View`
  padding-top: ${wp('1.5%')}px;
  flex-direction: row;
`;

const FilterButton = styled.TouchableOpacity`
  background: #2e3a59;
  border-radius: ${hp('3%')}px;
  padding: ${hp('0.875%')}px ${wp('3%')}px;
  margin-right: ${wp('2%')}px;
`;

const FilterText = styled.Text`
  font-family: DMSans-Medium;
  font-size: ${hp('1.5%')}px;
  color: #ffffff;
`;

const NotesWrapper = styled.View`
  padding-top: ${hp('2%')}px;
  flex: 1;
`;
