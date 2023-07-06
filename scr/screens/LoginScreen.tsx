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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations/RootStackParam';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {
  fecthGifts,
  fecthGiftsPlayGame,
  fetchUser,
} from '../features/user/userSlice';
import Spinner from 'react-native-loading-spinner-overlay';
type LoginScreenProps = {
  navigation: any;
  route: any;
};
type Props = NativeStackScreenProps<RootStackParams, 'LoginScreen'>;
const LoginScreen: React.FC<LoginScreenProps> = ({navigation, route}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [phoneNumber, setPhoneNumber] = useState('');

  const dataUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();

  const [loading, setLoading] = useState(false);
  const status = useSelector((state: RootState) => state.user.status);
  const startLoading = async () => {
    if (status === 'loading') {
      setLoading(true);
    }
    if (status === 'succeeded') {
      setLoading(false);
    }
  };
  useEffect(() => {
    startLoading();
  }, [status]);

  const onPressSignup = () => {
    navigation.replace('SignupScreen');
  };

  const onPressLogin = async () => {
    try {
      // Kiểm tra xem số điện thoại đã được xác thực trước đó hay chưa
      const confirm = await auth().signInWithPhoneNumber('+84' + phoneNumber);
      navigation.replace('OTP', {confirm, phoneNumber: '+84' + phoneNumber});
    } catch (error: any) {
      Alert.alert('Error', error + '');
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  const isPhoneNumber = (phoneNumber: string): boolean => {
    const regex: RegExp = /^([0])+([0-9]{9})\b$/;
    return regex.test(phoneNumber);
  };

  useEffect(() => {
    checkPhoneNumberAuthentication();
  }, []);

  const checkPhoneNumberAuthentication = async () => {
    // Kiểm tra xem số điện thoại đã được xác thực trước đó hay chưa
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');

    if (phoneNumber) {
      // Số điện thoại đã được xác thực, tiến hành đăng nhập tự động
      setPhoneNumber(phoneNumber);
      signInWithPhoneNumber(phoneNumber);
    } else {
      // Số điện thoại chưa được xác thực, thực hiện xác thực OTP
      // Gửi mã OTP đến số điện thoại và yêu cầu người dùng nhập mã OTP
      // Sau khi xác thực thành công, lưu thông tin số điện thoại vào AsyncStorage
      // và tiến hành đăng nhập tự động
      console.log('Không tìm thấy mã');
    }
  };

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    // Sử dụng firebase.auth().signInWithPhoneNumber() để đăng nhập bằng số điện thoại
    // Lưu ý rằng hàm này vẫn cần xác thực OTP, nhưng OTP được gửi tự động và không cần yêu cầu người dùng nhập
    // auth()
    //   .signInWithPhoneNumber(phoneNumber)
    //   .then(async confirmationResult => {
    //     // Xác thực thành công, lưu thông tin số điện thoại vào AsyncStorage
    //     AsyncStorage.setItem('phoneNumber', phoneNumber);
    //     await dispatch(fetchUser(phoneNumber));
    //     await dispatch(fecthGiftC());
    //     navigation.replace('HomeScreen');
    //     console.log('Đăng nhập thành công');
    //   })
    //   .catch(error => {
    //     console.log('Đăng nhập thất bại', error);
    //   });

    AsyncStorage.setItem('phoneNumber', phoneNumber);
    await dispatch(fecthGiftsPlayGame());
    await dispatch(fecthGifts());
    await dispatch(fetchUser(phoneNumber));
    navigation.replace('HomeScreen');
    console.log('Đăng nhập thành công');
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
      color: 'black',
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
      <Spinner
        visible={loading}
      />
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
