import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackgroundHome from '../components/BackgroundHome';
import Header from '../components/Header';

type HomeScreenProps = {
  navigation: any;
  route: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation, route}) => {
  const [coins, setCoins] = useState(0);
  const [pepsi, setPepsi] = useState(0);
  const [up, set7Up] = useState(0);
  const [mirinda, setmirinda] = useState(0);
  const [roundfree, setRoundfree] = useState(3);
  const [round, setRound] = useState(5);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [modalShow, setModalShow] = useState(false);

  const onPressPlay = () => {
    setModalShow(true);
  };

  const onPressPlayFree = () => {
    setModalShow(false);
    navigation.navigate('PlayGameScreen', {
      playType: 'miễn phí',
      coins: coins,
      pepsi: pepsi,
      up: up,
      mirinda: mirinda,
    });
  };

  const onPressPlayExchange = () => {
    setModalShow(false);
    navigation.navigate('PlayGameScreen', {
      playType: 'miễn phí',
      coins: coins,
      pepsi: pepsi,
      up: up,
      mirinda: mirinda,
    });
  };

  const onPressCollection = () => {
    navigation.navigate('Collection');
  };

  const onPressGiftDetail = () => {
    // navigation.navigate('GiftDetail');
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackgroundHome />
      <Header navigation={navigation} isButtonLogout />

      <Modal
        statusBarTranslucent
        animationType={'slide'}
        transparent
        visible={modalShow}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/imgs/popup_choose_play.png')}
            style={{
              position: 'absolute',
              top: height * 0.37,
            }}
          />

          <Text
            style={{
              color: '#D02027',
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
              position: 'absolute',
              top: height * 0.4,
            }}>
            {'Bạn muốn sử dụng\nlượt chơi nào?'}
          </Text>
          <TouchableOpacity
            onPress={onPressPlayFree}
            activeOpacity={0.6}
            style={{
              alignItems: 'center',
              marginBottom: 15,
              marginTop: 40,
              position: 'absolute',
              top: height * 0.445,
            }}>
            <Image
              source={require('../assets/imgs/btn_play_noflower_active.png')}
              style={{
                position: 'absolute',
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 18,
              }}>
              Lượt chơi miễn phí
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
              }}>
              Bạn còn{' '}
              <Text style={{color: '#FEEEA4', fontWeight: 'bold'}}>
                {roundfree}
              </Text>{' '}
              lượt chơi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressPlayExchange}
            activeOpacity={0.6}
            style={{
              alignItems: 'center',
              marginTop: 10,
              position: 'absolute',
              top: height * 0.58,
            }}>
            <Image
              source={require('../assets/imgs/btn_play_noflower_active.png')}
              style={{
                position: 'absolute',
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 18,
              }}>
              Lượt chơi quy đổi
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
              }}>
              Bạn còn{' '}
              <Text style={{color: '#FEEEA4', fontWeight: 'bold'}}>
                {round}
              </Text>{' '}
              lượt chơi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setModalShow(false)}
            style={{
              position: 'absolute',
              top: height * 0.38,
              right: 60,
            }}>
            <Image
              source={require('../assets/imgs/btn_close_modal.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <View
        style={{
          position: 'absolute',
          top: height * 0.5,
          left: 0,
          right: 0,
          alignItems: 'center',
          marginHorizontal: 28,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          // onPress={() => navigation.navigate('Tutorial')}
        >
          <Text
            style={{
              color: '#FFDD00',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Hướng dẫn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressPlay}
          activeOpacity={0.6}
          style={{
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 28,
          }}>
          <Image
            source={require('../assets/imgs/btn_play_active.png')}
            style={{
              position: 'absolute',
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 14,
            }}>
            Chơi ngay
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
            }}>
            Bạn còn{' '}
            <Text style={{color: '#FEEEA4', fontWeight: 'bold'}}>3</Text> lượt
            chơi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('ScanBillScreen')}>
          <Image source={require('../assets/imgs/btn_scanQR.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={onPressCollection}>
          <Image source={require('../assets/imgs/btn_album.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={onPressGiftDetail}>
          <Image source={require('../assets/imgs/btn_giftDetail.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btn: {
    marginVertical: 5,
  },
});
