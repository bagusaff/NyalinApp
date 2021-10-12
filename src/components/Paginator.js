import React from 'react';
import {StyleSheet, View, Animated, useWindowDimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Paginator = ({scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row'}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: hp('1%'),
    borderRadius: wp('5%'),
    backgroundColor: '#2E3A59',
    marginHorizontal: 3,
  },
});

const data = [
  {
    id: '1',
  },
  {
    id: '2',
  },
];
