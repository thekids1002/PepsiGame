import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {randomNumber} from '../utils/Function';
import Header from '../components/Header';
import GlobalStore from '../constrains/GlobalStore';

interface CongratulationScreenProps {
  navigation: any;
  route: any;
}
const PRESENTS = [
  {name: 'Pepsi AN', coins: 50, image: require('../assets/imgs/pepsi_an.png')},
  {
    name: 'Mirinda PHÚC',
    coins: 100,
    image: require('../assets/imgs/mirinda_phuc.png'),
  },
  {name: '7Up LỘC', coins: 50, image: require('../assets/imgs/7up_loc.png')},
];

const CongratulationScreen: React.FC<CongratulationScreenProps> = ({
  navigation,
  route,
}) => {
  const present = randomNumber(0, PRESENTS.length - 1);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  if (present == 0) {
    GlobalStore.setPepsiCount(GlobalStore.pepsiCount + 1);
  }
  if (present == 1) {
    GlobalStore.setMirindaCount(GlobalStore.mirindaCount + 1);
  }
  if (present == 2) {
    GlobalStore.setSevenUpCount(GlobalStore.sevenUpCount + 1);
  }

  GlobalStore.AddCoins(PRESENTS[present].coins);

  const onPressConfirm = () => {
    navigation.replace('HomeScreen');
  };
  const Background = () => {
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
          source={require('../assets/imgs/ic_backgroundLeftCongratulation.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: -10,
          }}
        />

        <Image
          source={require('../assets/imgs/ic_backgroundRightCongratulation.png')}
          style={{
            position: 'absolute',
            top: height * 0.213,
            right: 0,
            bottom: 0,
            zIndex: -10,
          }}
        />

        <View
          style={{
            position: 'absolute',
            zIndex: -9,
            top: height * 0.652,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
          <Image source={require('../assets/imgs/ic_homeBottom.png')} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />
      <Header navigation={navigation} isButtonLogout />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={PRESENTS[present].image}
          style={{
            marginBottom: 26,
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: height * -0.06,
            right: width * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../assets/imgs/ic_score.png')} />
          <Text
            style={{
              position: 'absolute',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 30,
            }}>
            {PRESENTS[present].coins}
          </Text>
        </View>

        <Text style={styles.normalText}>Chúc mừng bạn đã nhận được</Text>

        <Text style={styles.goldenText}>
          1 lon {PRESENTS[present].name}
          <Text style={styles.normalText}>{' ứng với '}</Text>
          <Text style={styles.goldenText}>{PRESENTS[present].coins} coins</Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{marginTop: 22, zIndex: 100}}
          onPress={onPressConfirm}>
          <Image source={require('../assets/imgs/btn_confim_size_m.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CongratulationScreen;

const styles = StyleSheet.create({
  normalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
  },
  goldenText: {
    color: '#FFDD00',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
