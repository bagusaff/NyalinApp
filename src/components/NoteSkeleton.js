import React from 'react';
import {useWindowDimensions} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useSelector} from 'react-redux';

const NoteSkeleton = ({children}) => {
  const {isFetching} = useSelector(state => state.note);
  const {height, width} = useWindowDimensions();
  return (
    <SkeletonContent
      containerStyle={{flex: 1, width: width, backgroundColor: 'white'}}
      isLoading={isFetching}
      layout={[
        {
          paddingHorizontal: 15,
          paddingTop: 40,
          children: [
            {
              width: '100%',
              height: (10 / 100) * height,
              marginBottom: 15,
            },
            {
              key: 'filter',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
              children: [
                {
                  width: '17%',
                  height: (4 / 100) * height,
                  borderRadius: 50,
                },
                {
                  width: '17%',
                  height: (4 / 100) * height,
                  borderRadius: 50,
                },
                {
                  width: '17%',
                  height: (4 / 100) * height,
                  borderRadius: 50,
                },
                {
                  width: '17%',
                  height: (4 / 100) * height,
                  borderRadius: 50,
                },
                {
                  width: '17%',
                  height: (4 / 100) * height,
                  borderRadius: 50,
                },
              ],
            },
            {
              key: 'notesCard',
              flexDirection: 'column',
              paddingVertical: 10,
              children: [
                {
                  width: '100%',
                  height: (15 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (15 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (15 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (15 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (15 / 100) * height,
                  marginBottom: 10,
                },
              ],
            },
          ],
        },
      ]}>
      {children}
    </SkeletonContent>
  );
};

export default NoteSkeleton;
