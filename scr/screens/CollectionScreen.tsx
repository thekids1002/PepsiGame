import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import LabelCoins from '../components/LabelCoins';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import GlobalStore from '../constrains/GlobalStore';
import {randomNumber} from '../utils/Function';
import listGift from '../constrains/GlobleVar';
import {globalState} from 'mobx/dist/internal';
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
  const [giftCount, setGiftCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const present = randomNumber(0, listGift.length - 1);
  const getGiftNow = () => {
    openModal();
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal2 = () => {
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const openModal3 = () => {
    setModalVisible3(true);
  };

  const closeModal3 = () => {
    setModalVisible3(false);
  };

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

      <LabelCoins coins={GlobalStore.coins} />

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
          <Text style={styles.collectionQty}>{GlobalStore.pepsiCount}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={styles.img}
            source={require('../assets/imgs/7up_loc.png')}
          />
          <Text style={styles.collectionQty}>{GlobalStore.sevenUpCount}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={styles.img}
            source={require('../assets/imgs/mirinda_phuc.png')}
          />
          <Text style={styles.collectionQty}>{GlobalStore.mirindaCount}</Text>
        </View>
      </View>

      <Image
        source={require('../assets/imgs/infoCollection.png')}
        style={{
          width: 200,
          height: 80,
          alignSelf: 'center',
          marginTop: 18,
          resizeMode: 'contain',
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
              backgroundColor: !GlobalStore.checkcombo(giftCount)
                ? '#D02027'
                : '#0063A7',
            },
          ]}
          activeOpacity={0.6}
          onPress={() => {
            const newVal = giftCount - 1;
            if (newVal >= 0) {
              setGiftCount(newVal);
            }
          }}>
          <FontAwesomeIcon icon={faMinus} color="#fff" size={11} />
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
              backgroundColor: GlobalStore.checkcombo(giftCount)
                ? '#D02027'
                : '#0063A7',
            },
          ]}
          activeOpacity={0.6}
          onPress={() => {
            if (GlobalStore.checkcombo(giftCount)) {
              const newVal = giftCount + 1;
              if (newVal >= 0) {
                setGiftCount(newVal);
              }
            }
          }}>
          <FontAwesomeIcon icon={faPlus} color="#fff" size={11} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: 10,
        }}
        activeOpacity={0.6}
        onPress={getGiftNow}>
        <Image source={require('../assets/imgs/btn_getGiftNow.png')} />
      </TouchableOpacity>
      <Modal
        statusBarTranslucent
        animationType={'slide'}
        transparent
        visible={modalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/imgs/popup_Gift.png')}
              style={{}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Bạn có chắc muốn đổi
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            <Text style={{color: '#FFDD00'}}>{giftCount} Combo</Text> hay không?
          </Text>

          <TouchableOpacity
            onPress={() => {
              closeModal();
              if (
                GlobalStore.pepsiCount > 0 &&
                GlobalStore.mirindaCount > 0 &&
                GlobalStore.mirindaCount > 0
              ) {
                if (randomNumber(0, 1) == 0) {
                  openModal2();
                } else {
                  openModal3();
                }
                GlobalStore.exchangeCombo();
              } else {
                Alert.alert('Thông báo', 'Bạn không đủ combo để đổi');
              }
            }}
            activeOpacity={0.6}
            style={{
              width: 100,
              height: 50,
              alignItems: 'center',
              marginTop: 60,
              position: 'absolute',
              top: height * 0.58,
            }}>
            <Image
              source={require('../assets/imgs/btn_doiqua.png')}
              style={{
                position: 'absolute',
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        statusBarTranslucent
        animationType={'slide'}
        transparent
        visible={modalVisible2}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/imgs/popup_gift_coin.png')}
              style={{
                height: 285,
                width: 282,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Bạn nhận được
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            <Text style={{color: '#FFDD00'}}>300 Coins</Text>
          </Text>

          <TouchableOpacity
            onPress={() => {
              closeModal2();
            }}
            activeOpacity={0.6}
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              marginTop: 150,
              position: 'absolute',
              top: height * 0.58,
            }}>
            <Image
              source={require('../assets/imgs/btn_close_popup.png')}
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal 3 */}

      <Modal
        statusBarTranslucent
        animationType={'slide'}
        transparent
        visible={modalVisible3}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/imgs/popup_gift_no_item.png')}
              style={{
                height: 285,
                width: 282,
                resizeMode: 'contain',
              }}
            />

            <Image
              source={listGift[present].image}
              style={{
                height: 160,
                width: 117,
                position: 'absolute',
                top: height * 0.1,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Bạn nhận được
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            <Text style={{color: '#FFDD00'}}>{listGift[present].name}</Text>
          </Text>

          <TouchableOpacity
            onPress={() => {
              closeModal3();
            }}
            activeOpacity={0.6}
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              marginTop: 150,
              position: 'absolute',
              top: height * 0.58,
            }}>
            <Image
              source={require('../assets/imgs/btn_close_popup.png')}
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default CollectionScreen;

const styles = StyleSheet.create({
  img: {
    height: 160,
    width: 70,
    resizeMode: 'contain',
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
