import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  Animated,
  PanResponderGestureState,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundPlay from '../components/BackgroundPlay';
import Header from '../components/Header';
import {PanResponderInstance} from 'react-native';

interface PlayGameScreenProps {
  navigation: any;
  route: any;
}

const PlayGameScreen: React.FC<PlayGameScreenProps> = ({navigation, route}) => {
  const playType = route.params.playType;
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: (event, gestureState) => {
        const bottom = -60;
        const top = -250;
        const y = (pan.y as any)._value;
        if (y < top) {
          navigation.replace('CongratulationsScreen');
          return;
        }
        if (y > bottom) {
          pan.setOffset({
            x: 0,
            y: bottom,
          });
        }
        Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(
          event,
          gestureState,
        );
      },
      onPanResponderRelease: (event, gestureState) => {
        pan.flattenOffset();
      },
    }),
  ).current;
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackgroundPlay />
      <Header
        navigation={navigation}
        title={'VUỐT LÊN ĐỂ CHƠI'}
        isButtonBack
        isButtonLogout
      />
      <Text
        style={{
          color: '#fff',
          alignSelf: 'center',
          position: 'absolute',
          top: height * 0.11,
        }}>
        {'Bạn còn '}
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#FFDD00',
          }}>
          3
        </Text>
        {' lượt chơi '}
        {playType}
      </Text>

      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          position: 'absolute',
          bottom: -60,
          right: 0,
          left: 0,
          alignItems: 'center',
        }}
        {...panResponder.panHandlers}>
        <Image source={require('../assets/imgs/ic_lionFace.png')} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default PlayGameScreen;

const styles = StyleSheet.create({});
