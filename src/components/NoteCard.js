import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NoteCard = ({id, title, tags, note, onPress}) => {
  const tagsLength = tags.length;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Wrapper>
        <TitleWrapper>
          <NoteTitle numberOfLines={1}>{title}</NoteTitle>
          <View style={{flexDirection: 'row'}}>
            {tagsLength > 1 && tags !== undefined ? (
              tags?.map((item, index) => {
                return <NoteTag key={index}>{item}</NoteTag>;
              })
            ) : (
              <NoteTag>{tags}</NoteTag>
            )}
          </View>
        </TitleWrapper>
        <NoteBody numberOfLines={2} ellipsizeMode="tail">
          {note}
        </NoteBody>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default NoteCard;

const Wrapper = styled.View`
  background: #ffffff;
  border-radius: 4px;
  border: 2px solid #f6f6f6;
  height: ${hp('12.5%')}px;
  width: 100%;
  padding: ${hp('1.125%')}px;
  margin-bottom: ${hp('1.25%')}px;
  overflow: hidden;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${hp('0.875%')}px;
`;

const NoteTitle = styled.Text`
  font-family: DMSans-Bold;
  font-size: ${hp('2.5%')}px;
  color: #000000;
  max-width: ${wp('75%')}px;
`;

const NoteTag = styled.Text`
  font-family: DMSans-Medium;
  font-size: ${hp('1.25%')}px;
  color: #ffffff;
  background: #2e3a59;
  border-radius: ${hp('2%')}px;
  padding: ${hp('0.5')}px ${wp('2.5%')}px;
  margin-left: 5px;
`;

const NoteBody = styled.Text`
  font-family: DMSans-Regular;
  font-size: ${hp('2')}px;
  color: #000000;
  text-align: left;
`;
