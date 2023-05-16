import {
  Image,
  View,
  StatusBar,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';

const BackgroundForm = ({titleShow}: {titleShow: boolean}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      flex: 1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    backgroundImage: {
      position: 'absolute',
      flex: 1,
      resizeMode: 'cover',
      zIndex: -10,
    },
    topLeftImage: {
      zIndex: -9,
      position: 'absolute',
      top: -26,
      left: -105,
    },
    topRightImage: {
      zIndex: -9,
      position: 'absolute',
      top: -52,
      right: -95,
    },
    flowerImage1: {
      zIndex: -9,
      position: 'absolute',
      top: height * 0.23,
      left: -17,
    },
    flowerImage2: {
      zIndex: -9,
      position: 'absolute',
      top: height * 0.585,
      right: -20,
    },
    flowerImage3: {
      zIndex: -9,
      position: 'absolute',
      top: height * 0.66,
      left: 0,
    },
    bottomLeftImage: {
      zIndex: -9,
      position: 'absolute',
      top: height * 0.82,
      left: -68,
    },
    bottomRightImage: {
      zIndex: -9,
      position: 'absolute',
      top: height * 0.78,
      right: -179,
    },
    titleContainer: {
      position: 'absolute',
      top: height * 0.15,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    titleText1: {
      color: '#fff',
      fontSize: 18,
    },
    titleText2: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        source={require('../assets/imgs/bg_gradient.png')}
        style={styles.backgroundImage}
      />

      <Image
        source={require('../assets/imgs/ic_topLeft.png')}
        style={styles.topLeftImage}
      />

      <Image
        source={require('../assets/imgs/ic_topRight.png')}
        style={styles.topRightImage}
      />

      <Image
        source={require('../assets/imgs/flower.png')}
        style={styles.flowerImage1}
      />

      <Image
        source={require('../assets/imgs/flower.png')}
        style={styles.flowerImage2}
      />

      <Image
        source={require('../assets/imgs/flower.png')}
        style={styles.flowerImage3}
      />

      <Image
        source={require('../assets/imgs/ic_bottomLeft.png')}
        style={styles.bottomLeftImage}
      />

      <Image
        source={require('../assets/imgs/ic_bottomRight.png')}
        style={styles.bottomRightImage}
      />

      {titleShow ? (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText1}>Hey, mừng bạn đến với</Text>
          <Text style={styles.titleText2}>Pepsi Tết</Text>
        </View>
      ) : null}
    </View>
  );
};

export default BackgroundForm;
