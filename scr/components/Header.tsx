import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {faArrowLeft, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HeaderProps {
  title?: any;
  isButtonBack?: any;
  isButtonLogout?: any;
  navigation: any;
  route?: any;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isButtonBack,
  isButtonLogout,
  navigation,
  route,
}) => {
  const onPressBack = () => {
    navigation.replace('HomeScreen');
  };
  const [isLogout, setLogout] = useState(false);

  const onPressLogout = async () => {
    setLogout(true);
  };

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <View style={styles.headerGroup}>
      {isButtonBack ? (
        <TouchableOpacity
          onPress={onPressBack}
          activeOpacity={0.5}
          style={styles.btnBack}>
          <FontAwesomeIcon icon={faArrowLeft} color="#fff" size={25} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btnBack} />
      )}

      <Text style={styles.title}>{title}</Text>

      {isButtonLogout ? (
        <TouchableOpacity
          onPress={onPressLogout}
          activeOpacity={0.5}
          style={styles.btnLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} color="#fff" size={25} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btnLogout} />
      )}

      <Modal
        statusBarTranslucent
        animationType={'slide'}
        transparent
        visible={isLogout}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/imgs/PopupLogOut.png')}
            style={{
              position: 'absolute',
              top: height * 0.37,
            }}
          />

          <TouchableOpacity
            onPress={async () => {
              if (auth().currentUser) {
                auth().signOut();
              }
              await AsyncStorage.setItem('phoneNumber', '');
              navigation.replace('LoginScreen');
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
              top: height * 0.4,
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
              Đăng xuất
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setLogout(false);
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
              top: height * 0.46,
            }}>
            <Image
              source={require('../assets/imgs/btn_logout_flower_active.png')}
              style={{
                position: 'absolute',
                width: 140,
                height: 40,
              }}
            />

            <Text
              style={{
                color: '#0063A7',
                fontSize: 14,
                fontWeight: 'bold',
                alignSelf: 'center',
                textAlignVertical: 'center',
                alignContent: 'center',
                textAlign: 'center',
                marginBottom: 6,
              }}>
              Huỷ
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerGroup: {
    paddingHorizontal: 32,
    width: Dimensions.get('screen').width,
    marginVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnBack: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: -20,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  btnLogout: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: -20,
  },
});
