import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  Alert,
} from 'react-native';
import BackgroundForm from '../components/BackgroundForm';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoadingDialog from '../components/LoadingDialog';
import {isPhoneNumber, isPersonName} from '../utils/Function';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations/RootStackParam';

type Props = NativeStackScreenProps<RootStackParams, 'SignupScreen'>;

const SignupScreen = ({navigation, route}: Props) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [isAcceptRule, setIsAcceptRule] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onPressViewRule = () => {
    navigation.navigate('Rule');
  };
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const onPressSigup = () => {
    Alert.alert('Thông báo', 'Chức năng đang phát triển');
  };

  const onPressLogin = () => {
    setIsLoading(true);

    try {
      navigation.replace('LoginScreen');
    } catch (error) {
      // Handle the error
      // ...
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
      marginBottom: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxText: {
      color: '#fff',
      fontSize: 12.5,
      marginStart: 4,
    },
    ruleLinkText: {
      alignSelf: 'center',
      fontWeight: 'bold',
      color: Colors.kYellowColor,
      fontSize: 12.5,
      marginTop: 10,
    },
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
        <Text style={styles.title}>ĐĂNG KÝ</Text>

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="number-pad"
          onChangeText={text => setPhoneNumber(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          autoComplete="name"
          autoCapitalize="words"
          onChangeText={text => setFullname(text)}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            activeOpacity={1}
            onPress={() => setIsAcceptRule(!isAcceptRule)}>
            <Image
              style={{width: 20, height: 20}}
              source={
                isAcceptRule
                  ? require('../assets/imgs/checkbox_checked.png')
                  : require('../assets/imgs/checkbox_unchecked.png')
              }
            />
            <Text style={styles.checkboxText}>
              Tôi đã đọc và đồng ý với
              <TouchableOpacity
                activeOpacity={0.8}
                style={{}}
                onPress={onPressViewRule}>
                <Text style={[styles.ruleLinkText]}>thể lệ chương trình </Text>
              </TouchableOpacity>
              Pepsi Tết.
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: isKeyboardVisible ? height * 0.27 : height * 0.43,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressSigup}
            disabled={
              !(
                isPhoneNumber(phoneNumber) &&
                isPersonName(fullname) &&
                isAcceptRule
              )
            }>
            <Image
              source={
                isPhoneNumber(phoneNumber) &&
                isPersonName(fullname) &&
                isAcceptRule
                  ? require('../assets/imgs/btn_getOTP_active.png')
                  : require('../assets/imgs/btn_getOTP_disabled.png')
              }
            />
          </TouchableOpacity>

          <Text style={{color: '#fff', fontSize: 16, marginBottom: 8}}>
            Hoặc
          </Text>

          <TouchableOpacity onPress={onPressLogin} activeOpacity={0.8}>
            <Image source={require('../assets/imgs/btn_login.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <LoadingDialog visible={isLoading} />
    </SafeAreaView>
  );
};

export default SignupScreen;
