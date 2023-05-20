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

  const onPressResendOTP = () => {
    setOtpCorrect(true);
    // to resend otp
  };

  const onPressConfirm = async () => {
    // code
    let otp = '';
    otpCode.forEach(item => (otp += item !== null ? item.toString() : ''));
    try {
      await confirm.confirm(otp);
      Alert.alert('Xác nhận otp');
    } catch (e) {
      Alert.alert('Lỗi rồi');
      console.log(e);
    }
  };

  useEffect(() => {
    // Code to run on component mount
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackgroundForm titleShow={true} />
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
            fontSize: 24,
            marginBottom: 32,
          }}>
          Enter OTP
        </Text>
        <View style={styles.otpContainer}>
          <TextInput
            ref={otp1}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => nextOtp(text, otp1, 0)}
            value={otpCode[0]?.toString()}
          />
          <TextInput
            ref={otp2}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => nextOtp(text, otp2, 1)}
            value={otpCode[1]?.toString()}
          />
          <TextInput
            ref={otp3}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => nextOtp(text, otp3, 2)}
            value={otpCode[2]?.toString()}
          />
          <TextInput
            ref={otp4}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => nextOtp(text, otp4, 3)}
            value={otpCode[3]?.toString()}
          />
          <TextInput
            ref={otp5}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => nextOtp(text, otp5, 4)}
            value={otpCode[4]?.toString()}
          />
          <TextInput
            ref={otp6}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => nextOtp(text, otp6, 5)}
            value={otpCode[5]?.toString()}
          />
        </View>
        {!otpCorrect && (
          <Text style={styles.errorText}>Incorrect OTP. Please try again.</Text>
        )}
        <TouchableOpacity
          style={styles.resendButton}
          onPress={onPressResendOTP}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            isEmptyCode ? {backgroundColor: '#ccc'} : null,
          ]}
          onPress={onPressConfirm}
          disabled={isEmptyCode}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  resendButton: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  resendButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
