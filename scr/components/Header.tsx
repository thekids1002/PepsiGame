import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

import auth from '@react-native-firebase/auth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {faArrowLeft, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
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
    navigation.goBack();
  };

  const onPressLogout = () => {
    if (auth().currentUser) {
      auth().signOut();
    }
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.headerGroup}>
      {isButtonBack ? (
        <TouchableOpacity
          onPress={onPressBack}
          activeOpacity={0.5}
          style={styles.btnBack}>
          <FontAwesomeIcon icon={faArrowLeft} color="#fff" size={35} />
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
          <FontAwesomeIcon icon={faSignOutAlt} color="#fff" size={35} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btnLogout} />
      )}
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
