import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Header';
import LabelCoins from '../components/LabelCoins';

type CollectionScreenProps = {
  navigation: any;
  route: any;
};

const CollectionScreen: React.FC<CollectionScreenProps> = ({
  navigation,
  route,
}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [coinsLeft, setCoinsLeft] = useState(700);
  const [pepsiCount, setPepsiCount] = useState(4);
  const [sevenUpCount, setSevenUpCount] = useState(5);
  const [mirindaCount, setMirindaCount] = useState(2);
  const [giftCount, setGiftCount] = useState(0);

  const getGiftNow = () => {};

  const Background: React.FC = () => {
    return (
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../assets/imgs/bg_gradient.png')}
          style={styles.backgroundImage}
        />
        <Image
          source={require('../assets/imgs/ic_backgroundCollectionLeft.png')}
          style={styles.leftBackgroundImage}
        />
        <Image
          source={require('../assets/imgs/ic_backgroundCollectionRight.png')}
          style={styles.rightBackgroundImage}
        />
        <Image
          source={require('../assets/imgs/ic_collectionBottomLeft.png')}
          style={styles.bottomLeftImage}
        />
        <Image
          source={require('../assets/imgs/ic_scanRightBottom.png')}
          style={styles.rightBottomImage}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <Header
        navigation={navigation}
        title={'Bộ sưu tập'}
        isButtonBack
        isButtonLogout
      />

      <LabelCoins coins={coinsLeft} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 42,
          marginTop: 48,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={styles.img}
            source={require('../assets/imgs/pepsi_an.png')}
          />
          <Text style={styles.collectionQty}>{pepsiCount}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={styles.img}
            source={require('../assets/imgs/7up_loc.png')}
          />
          <Text style={styles.collectionQty}>{sevenUpCount}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={styles.img}
            source={require('../assets/imgs/mirinda_phuc.png')}
          />
          <Text style={styles.collectionQty}>{mirindaCount}</Text>
        </View>
      </View>

      <Image
        source={require('../assets/imgs/infoCollection.png')}
        style={{
          width: 260,
          height: 80,
          alignSelf: 'center',
          marginTop: 18,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: '#0063A7',
            },
          ]}
          activeOpacity={0.6}
          onPress={() => {
            const newVal = giftCount - 1;
            if (newVal >= 0) {
              setGiftCount(newVal);
            }
          }}>
          <Icon name="minus" color={'#fff'} size={12} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 22,
          }}>
          {giftCount}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: '#D02027',
            },
          ]}
          activeOpacity={0.6}
          onPress={() => {
            const newVal = giftCount + 1;
            if (newVal >= 0) {
              setGiftCount(newVal);
            }
          }}>
          <Icon name="plus" color={'#fff'} size={12} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: 40,
        }}
        activeOpacity={0.6}
        onPress={getGiftNow}>
        <Image source={require('../assets/imgs/btn_getGiftNow.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default CollectionScreen;

const styles = StyleSheet.create({
  img: {
    height: 210,
    width: 80,
    resizeMode: 'cover',
  },
  collectionQty: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 18,
  },
  button: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: '#0063A7',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  backgroundContainer: {
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
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'cover',
  },
  leftBackgroundImage: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  rightBackgroundImage: {
    position: 'absolute',
    flex: 1,
    top: 0,
    right: 0,
    bottom: 0,
  },
  bottomLeftImage: {
    position: 'absolute',
    flex: 1,
    left: 0,
    bottom: 0,
  },
  rightBottomImage: {
    position: 'absolute',
    flex: 1,
    right: 0,
    bottom: 0,
  },
});
