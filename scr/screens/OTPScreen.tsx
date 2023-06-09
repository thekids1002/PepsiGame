import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BackgroundForm from '../components/BackgroundForm';
import {RootState} from '../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {
  fecthGifts,
  fecthGiftsPlayGame,
  fetchUser,
} from '../features/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
type OTPScreenProps = {
  navigation: any;
  route: any;
};

const OTPScreen: React.FC<OTPScreenProps> = ({navigation, route}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const {confirm, phoneNumber} = route.params;

  const [otpCode, setOtpCode] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [otpCorrect, setOtpCorrect] = useState(true);
  const [isBackspace, setIsBackspace] = useState(false);
  const [isEmptyCode, setIsEmptyCode] = useState(true);

  const otp1 = useRef<TextInput>(null);
  const otp2 = useRef<TextInput>(null);
  const otp3 = useRef<TextInput>(null);
  const otp4 = useRef<TextInput>(null);
  const otp5 = useRef<TextInput>(null);
  const otp6 = useRef<TextInput>(null);
  const dataUser = useSelector((state: RootState) => state.user.user);
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

  const nextOtp = (
    text: string,
    ref: React.RefObject<TextInput>,
    index: number,
  ) => {
    if (!isBackspace) {
      (ref === otp1
        ? otp2
        : ref === otp2
        ? otp3
        : ref === otp3
        ? otp4
        : ref === otp4
        ? otp5
        : otp6
      ).current?.focus();
    } else {
      (ref === otp6
        ? otp5
        : ref === otp5
        ? otp4
        : ref === otp4
        ? otp3
        : ref === otp3
        ? otp2
        : otp1
      ).current?.focus();
      if (ref === otp1) {
        setOtpCode([null, null, null, null, null, null]);
        return;
      }
    }
    let tmp = [...otpCode];
    tmp[index] = text !== '' ? parseInt(text) : null;
    setOtpCode(tmp);
    let otp = tmp.filter(item => item !== null).join('');
    setIsEmptyCode(otp.length === 0);
  };

  // Handle login
  // vì hiện tại OTP khi nhận, máy sẽ tự động verify, không cần người dùng nhập   vào
  // nên sẽ lỗi sms otp expired, ở đây hàm này sẽ tự nhận và verify xong vào luôn màn hình home nên sẽ bỏ cái tự đăng nhập này
  // async function onAuthStateChanged(user: any) {
  //   if (user) {
  //     await dispatch(fetchUser(phoneNumber));
  //     navigation.replace('HomeScreen');
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  const onPressResendOTP = () => {
    setOtpCorrect(true);
    // to resend otp
  };

  const onPressConfirm = async () => {
    // code
    let otp = '';
    otpCode.forEach(item => (otp += item !== null ? item.toString() : ''));
    try {
      if (await confirm.confirm(otp)) {
        await dispatch(fetchUser(phoneNumber));
        await dispatch(fecthGiftsPlayGame());
        await dispatch(fecthGifts());
      }
    } catch (e) {
      Alert.alert('Thông báo', e + '');
    }
  };

  useEffect(() => {
    if (dataUser != null && dataUser != undefined) {
      AsyncStorage.setItem('phoneNumber', phoneNumber);
      navigation.replace('HomeScreen');
    }
  }, [dataUser]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackgroundForm titleShow={true} />
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        //Text style of the Spinner Text
      />
      <View
        style={{
          position: 'absolute',
          top: height * 0.35,
          left: 0,
          right: 0,
          justifyContent: 'center',
          marginHorizontal: 28,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 26,
          }}>
          Xác minh OTP
        </Text>
        <Text
          style={{
            color: '#FFF',
            fontSize: 14,
            marginTop: 8,
            textAlign: 'center',
          }}>
          {otpCorrect
            ? 'Nhập mã OTP vừa được gửi về điện thoại của bạn'
            : 'Mã OTP không đúng, vui lòng nhập lại'}
        </Text>

        <View
          style={{
            marginVertical: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {otpCode.map((item, index) => {
            return (
              <TextInput
                style={[styles.otp, !otpCorrect ? styles.otpError : null]}
                key={index}
                placeholder="-"
                ref={
                  index == 0
                    ? otp1
                    : index == 1
                    ? otp2
                    : index == 2
                    ? otp3
                    : index == 3
                    ? otp4
                    : index == 4
                    ? otp5
                    : otp6
                }
                keyboardType="number-pad"
                caretHidden={false}
                maxLength={1}
                onChangeText={text =>
                  nextOtp(
                    text,
                    index == 0
                      ? otp1
                      : index == 1
                      ? otp2
                      : index == 2
                      ? otp3
                      : index == 3
                      ? otp4
                      : index == 4
                      ? otp5
                      : otp6,
                    index,
                  )
                }
                onKeyPress={({nativeEvent}) => {
                  nativeEvent.key === 'Backspace'
                    ? setIsBackspace(true)
                    : setIsBackspace(false);
                }}
              />
            );
          })}
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isEmptyCode}
            onPress={onPressConfirm}>
            {!isEmptyCode ? (
              <Image
                source={require('../assets/imgs/btn_confirm_active.png')}
              />
            ) : (
              <Image
                source={require('../assets/imgs/btn_confirm_disabled.png')}
              />
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
              }}>
              {'Bạn chưa nhận được mã?'}
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={onPressResendOTP}>
              <Text
                style={{
                  color: Colors.kYellowColor,
                  fontSize: 14,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  fontWeight: 'bold',
                }}>
                Gửi lại mã
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  otp: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  otpError: {
    borderColor: 'red',
    borderWidth: 2,
  },
});
