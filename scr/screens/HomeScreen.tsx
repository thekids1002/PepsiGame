import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackgroundHome from '../components/BackgroundHome';
import Header from '../components/Header';
import {observer} from 'mobx-react';
import {firebase} from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {
  decrementFreeRoundCount,
  fetchUser,
  updateFreeRoundCount,
} from '../features/user/userSlice';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
type HomeScreenProps = {
  navigation: any;
  route: any;
};

const HomeScreen: React.FC<HomeScreenProps> = observer(
  ({navigation, route}) => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [modalShow, setModalShow] = useState(false);
    const [modalHetLuot, setModalHetLuot] = useState(false);
    const infouser = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();
    const [loading, setLoading] = useState(false);
    const status = useSelector((state: RootState) => state.user.status);
    const startLoading = async () => {
      if (status === 'loading') {
        setLoading(true);
      }
      if (status === 'succeeded' || status === 'failed') {
        setLoading(false);
      }
    };
    useEffect(() => {
      startLoading();
    }, [status]);
    const onPressPlay = () => {
      setModalShow(true);
    };

    const onPressPlayFree = async () => {
      setModalShow(false);
      if (infouser?.freeRoundCount == 0) {
        setModalHetLuot(true);
        return;
      }

      navigation.replace('PlayGameScreen', {playType: 'miễn phí'});
    };

    const onPressPlayExchange = () => {
      setModalShow(false);
      if (infouser?.roundCount == 0) {
        setModalHetLuot(true);
        return;
      }

      navigation.replace('PlayGameScreen', {playType: 'quy đổi'});
    };

    const onPressCollection = () => {
      navigation.replace('Collection');
    };

    const onPressGiftDetail = () => {
      navigation.replace('GiftDetailScreen');
    };
    const getUser = async () => {
      const value = await AsyncStorage.getItem('phoneNumber');
      if (value) {
        dispatch(fetchUser(value));
      }
    };

    useEffect(() => {
      getUser();
    }, []);
    useEffect(() => {
      const unsubcribe = navigation.addListener('focus', async () => {
        await getUser();
      });
      return unsubcribe;
    }, [navigation]);

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
                source={
                  infouser?.freeRoundCount == 0
                    ? require('../assets/imgs/btn_play_noflower_disabled.png')
                    : require('../assets/imgs/btn_play_noflower_active.png')
                }
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
                  {infouser?.freeRoundCount}
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
                source={
                  infouser?.roundCount == 0
                    ? require('../assets/imgs/btn_play_noflower_disabled.png')
                    : require('../assets/imgs/btn_play_noflower_active.png')
                }
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
                  {infouser?.roundCount}
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
        <Modal
          statusBarTranslucent
          animationType={'slide'}
          transparent
          visible={modalHetLuot}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, .5)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/imgs/background_PopupHetLuot.png')}
              style={{
                position: 'absolute',
                top: height * 0.37,
              }}
            />

            <Text
              style={{
                color: '#FFDD00',
                fontWeight: 'bold',
                fontSize: 21,
                textAlign: 'center',
                position: 'absolute',
                top: height * 0.41,
              }}>
              {'BẠN ĐÃ HẾT LƯỢT!'}
            </Text>

            <Text
              style={{
                color: '#fff',

                fontSize: 13,
                textAlign: 'center',
                position: 'absolute',
                paddingLeft: 27,
                paddingRight: 27,
                top: height * 0.46,
              }}>
              Hãy scan thêm mã trên bill{'\n'} mua nước hoặc combo Pepsi rạp{' '}
              {'\n'}để nhận thêm lượt chơi
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalHetLuot(false);
                navigation.replace('ScanBillScreen');
              }}
              activeOpacity={0.6}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 50,
                width: 140,
                height: 40,
                position: 'absolute',
                top: height * 0.712,
              }}>
              <Image
                source={require('../assets/imgs/btn_play_noflower_active.png')}
                style={{
                  position: 'absolute',
                  width: 140,
                  height: 40,
                }}
              />

              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  textAlignVertical: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                  marginBottom: 6,
                }}>
                Scan ngay
              </Text>
            </TouchableOpacity>

            <Image
              source={require('../assets/imgs/Cry.png')}
              style={{
                position: 'absolute',
                top: height * 0.55,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setModalHetLuot(false)}
              style={{
                position: 'absolute',
                top: height * 0.38,
                right: 70,
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
            top: height * 0.52,
            left: 0,
            right: 0,
            alignItems: 'center',
            marginHorizontal: 28,
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.replace('TutorialScreen')}>
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
              <Text style={{color: '#FEEEA4', fontWeight: 'bold'}}>
                {infouser?.freeRoundCount + infouser?.roundCount}
              </Text>{' '}
              lượt chơi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.6}
            onPress={() => navigation.replace('ScanBillScreen')}>
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
        <Spinner visible={loading} />
      </SafeAreaView>
    );
  },
);

export default HomeScreen;

const styles = StyleSheet.create({
  btn: {
    marginVertical: 5,
  },
});
