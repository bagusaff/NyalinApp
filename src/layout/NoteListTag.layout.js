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
import NoteCard from '../components/NoteCard';

//redux
import {useDispatch, useSelector} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NoteListTag = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const {tags} = route.params;
  const [data, setData] = useState([]);
  const {notes, isFetching} = useSelector(state => state.note);

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
    const tempData = [];
    notes.forEach(item =>
      item.tags.forEach(tag => {
        if (tag === tags) {
          tempData.push(item);
        }
        setData(tempData);
      }),
    );
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
        <HeaderTitle>Catatan : {tags}</HeaderTitle>
        <Icon name="arrow-back-outline" size={25} color="transparent" />
      </HeaderWrapper>
      <ContentWrapper>
        <NotesWrapper>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            style={{width: width, paddingHorizontal: 15}}
          />
        </NotesWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default NoteListTag;

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

const NotesWrapper = styled.View`
  padding-top: ${hp('1.5%')}px;
  flex: 1;
`;
