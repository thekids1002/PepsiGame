import {Image, View, StatusBar, Dimensions, Text} from 'react-native';
import React from 'react';

const BackgroundHome = () => {
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
        source={require('../assets/imgs/ic_homeTopLeft.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: -23,
          left: -100,
        }}
      />

      <Image
        source={require('../assets/imgs/ic_homeTopRight.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: -45,
          right: -80,
        }}
      />

      <Image
        source={require('../assets/imgs/ic_homeMidLeft.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.49,
          left: -95,
        }}
      />

      <Image
        source={require('../assets/imgs/ic_homeMidRight.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.49,
          right: 0,
        }}
      />

      <Image
        source={require('../assets/imgs/ic_homeBottom.png')}
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.655,
          left: -202,
        }}
      />

      <View
        style={{
          position: 'absolute',
          zIndex: -9,
          top: height * 0.21,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}>
        <Image source={require('../assets/imgs/ic_lionFace.png')} />
      </View>
    </View>
  );
};

export default BackgroundHome;
