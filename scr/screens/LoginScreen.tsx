import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import BackgroundForm from '../components/BackgroundForm';

const LoginScreen = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [phoneNumber, setPhoneNumber] = useState('');

  const onPressSignup = () => {
    Alert.alert('Chức năng đang phát triển');
  };

  const onPressLogin = async () => {
    Alert.alert('Chức năng đang phát triển');
  };

  const isPhoneNumber = (phoneNumber: string): boolean => {
    const regex: RegExp = /^([0])+([0-9]{9})\b$/;
    return regex.test(phoneNumber);
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: height * 0.3,
      left: 0,
      right: 0,
      justifyContent: 'center',
      marginHorizontal: 28,
    },
    title: {
      textAlign: 'center',
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 26,
    },
    label: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 14,
    },
    image: {
      marginVertical: 22,
      alignSelf: 'center',
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      opacity: 1,
    },
    orText: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 8,
    },
  });

  useEffect(() => {}, []);

  const StylesGlobal = StyleSheet.create({
    input: {
      backgroundColor: '#fff',
      marginVertical: 10,
      borderRadius: 10,
      paddingHorizontal: 14,
      height: 45,
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackgroundForm titleShow={true} />

      <View style={styles.container}>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
        <Text style={styles.label}>Số điện thoại</Text>

        <TextInput
          style={StylesGlobal.input}
          placeholder="Nhập số điện thoại"
          keyboardType="number-pad"
          onChangeText={text => setPhoneNumber(text)}
        />

        <Image
          source={require('../assets/imgs/3lon1.png')}
          style={styles.image}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!isPhoneNumber(phoneNumber)}
            onPress={onPressLogin}
            style={[
              styles.button,
              {
                opacity: isPhoneNumber(phoneNumber) ? 1 : 0.5,
              },
            ]}>
            <Image
              source={
                isPhoneNumber(phoneNumber)
                  ? require('../assets/imgs/btn_getOTP_active.png')
                  : require('../assets/imgs/btn_getOTP_disabled.png')
              }
            />
          </TouchableOpacity>

          <Text style={styles.orText}>Hoặc</Text>

          <TouchableOpacity onPress={onPressSignup} activeOpacity={0.8}>
            <Image source={require('../assets/imgs/btn_signup.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
