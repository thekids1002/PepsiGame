import {Image, View, StatusBar, Dimensions, Text} from 'react-native';
import React from 'react';

const BackgroundPlay = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        source={require('../assets/imgs/bg_gradient.png')}
        style={{
          position: 'absolute',
          flex: 1,
          resizeMode: 'cover',
          zIndex: -10,
        }}
      />

      <Image
        source={require('../assets/imgs/ic_playTopLeft.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: -40,
          left: -125,
        }}
      />

      <Image
        source={require('../assets/imgs/ic_playTopRight.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: -45,
          right: -40,
        }}
      />

      <Image
        source={require('../assets/imgs/flower.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.25,
          right: -15,
          opacity: 0.6,
        }}
      />

      <Image
        source={require('../assets/imgs/flower.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.72,
          right: -10,
          resizeMode: 'stretch',
          width: 45,
          height: 45,
          opacity: 0.6,
        }}
      />

      <Image
        source={require('../assets/imgs/flower.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.63,
          left: 8,
          resizeMode: 'stretch',
          width: 35,
          height: 35,
          opacity: 0.5,
        }}
      />

      <Image
        source={require('../assets/imgs/ic_backgroundPlay.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.18,
          right: 0,
        }}
      />

      <View
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.715,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}>
        <Image source={require('../assets/imgs/ic_playBottom.png')} />

        <Image
          source={require('../assets/imgs/ic_swipe_arrow.png')}
          style={{
            position: 'absolute',
            bottom: height * 0.5,
          }}
        />
      </View>
    </View>
  );
};

export default BackgroundPlay;
