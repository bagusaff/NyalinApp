import React from 'react';
import {useWindowDimensions} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useSelector} from 'react-redux';

const TransactionSkeleton = ({children}) => {
  const {isFetching} = useSelector(state => state.transaction);
  const {height, width} = useWindowDimensions();
  return (
    <SkeletonContent
      containerStyle={{flex: 1, width: width}}
      isLoading={isFetching}
      layout={[
        {
          paddingHorizontal: 15,
          paddingTop: 20,
          children: [
            {
              key: 'header',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
              children: [
                {
                  width: '75%',
                  height: (7 / 100) * height,
                },
                {
                  width: '15%',
                  height: (7 / 100) * height,
                  borderRadius: 75,
                },
              ],
            },
            {
              key: 'filter',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
              children: [
                {
                  width: '31%',
                  height: (6 / 100) * height,
                },
                {
                  width: '31%',
                  height: (6 / 100) * height,
                },
                {
                  width: '31%',
                  height: (6 / 100) * height,
                },
              ],
            },
            {
              key: 'pieCard',
              width: '100%',
              height: (25 / 100) * height,
              marginBottom: 15,
            },
            {
              key: 'categoryCard',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
              children: [
                {
                  width: '31%',
                  height: (6 / 100) * height,
                },
                {
                  width: '31%',
                  height: (6 / 100) * height,
                },
                {
                  width: '31%',
                  height: (6 / 100) * height,
                },
              ],
            },
            {
              key: 'transactionCards',
              flexDirection: 'column',
              paddingVertical: 10,
              children: [
                {
                  width: '100%',
                  height: (8 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (8 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (8 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (8 / 100) * height,
                  marginBottom: 10,
                },
                {
                  width: '100%',
                  height: (8 / 100) * height,
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

export default TransactionSkeleton;
