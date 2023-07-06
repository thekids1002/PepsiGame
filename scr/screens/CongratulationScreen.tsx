import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {randomNumber} from '../utils/Function';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {
  updateFreeRoundCount,
  updatePepsi_Mirinda_7Up,
  updateRoundCount,
} from '../features/user/userSlice';
interface ListCollection {
  id: any;
  name: any;
  coins: any;
  image: any;
}
interface CongratulationScreenProps {
  navigation: any;
  route: any;
}

const CongratulationScreen: React.FC<CongratulationScreenProps> = ({
  navigation,
  route,
}) => {
  const PRESENTS = useSelector(
    (state: RootState) => state.user.listCollection,
  ) as ListCollection[];
  const present = randomNumber(0, PRESENTS.length - 1);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const infouser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();
  const typePlay = route.params.typePlay;
  if (typePlay === 'miễn phí') {
    dispatch(
      updateFreeRoundCount({
        userPhone: infouser?.Phone,
        uvalue: infouser?.freeRoundCount - 1,
      }),
    );
  } else {
    dispatch(
      updateRoundCount({
        userPhone: infouser?.Phone,
        userValue: infouser?.roundCount - 1,
      }),
    );
  }
  const updateDrink = async () => {
    if (present == 0) {
      await dispatch(
        updatePepsi_Mirinda_7Up({
          userPhone: infouser?.Phone,
          type: 1,
          userValue: infouser?.pepsiCount + 1,
        }),
      );
    }
    if (present == 1) {
      await dispatch(
        updatePepsi_Mirinda_7Up({
          userPhone: infouser?.Phone,
          type: 3,
          userValue: infouser?.mirindaCount + 1,
        }),
      );
    }
    if (present == 2) {
      await dispatch(
        updatePepsi_Mirinda_7Up({
          userPhone: infouser?.Phone,
          type: 2,
          userValue: infouser?.sevenUpCount + 1,
        }),
      );
    }
  };
  updateDrink();
  // GlobalStore.AddCoins(PRESENTS[present].coins);

  const onPressConfirm = () => {
    navigation.replace('HomeScreen');
  };
  const Background = () => {
    return (
      <View
        style={{
          position: 'absolute',
          flex: 1,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Image
          source={require('../assets/imgs/bg_gradient.png')}
          style={{
            position: 'absolute',
            flex: 1,
            resizeMode: 'cover',
            zIndex: -10,
          }}
        />

        <Image
          source={require('../assets/imgs/ic_playTopLeft.png')}
          style={{
            position: 'absolute',
            zIndex: -9,
            top: -40,
            left: -125,
          }}
        />

        <Image
          source={require('../assets/imgs/ic_playTopRight.png')}
          style={{
            position: 'absolute',
            zIndex: -9,
            top: -45,
            right: -40,
          }}
        />

        <Image
          source={require('../assets/imgs/ic_backgroundLeftCongratulation.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: -10,
          }}
        />

        <Image
          source={require('../assets/imgs/ic_backgroundRightCongratulation.png')}
          style={{
            position: 'absolute',
            top: height * 0.213,
            right: 0,
            bottom: 0,
            zIndex: -10,
          }}
        />

        <View
          style={{
            position: 'absolute',
            zIndex: -9,
            top: height * 0.652,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
          <Image source={require('../assets/imgs/ic_homeBottom.png')} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />
      <Header navigation={navigation} isButtonLogout />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={
            PRESENTS[present].image === 'pepsi'
              ? require('../assets/imgs/pepsi_an.png')
              : PRESENTS[present].image === 'mirinda'
              ? require('../assets/imgs/mirinda_phuc.png')
              : require('../assets/imgs/7up_loc.png')
          }
          style={{
            marginBottom: 26,
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: height * -0.06,
            right: width * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../assets/imgs/ic_score.png')} />
          <Text
            style={{
              position: 'absolute',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 30,
            }}>
            {PRESENTS[present].coins}
          </Text>
        </View>

        <Text style={styles.normalText}>Chúc mừng bạn đã nhận được</Text>

        <Text style={styles.goldenText}>
          1 lon {PRESENTS[present].name}
          <Text style={styles.normalText}>{' ứng với '}</Text>
          <Text style={styles.goldenText}>{PRESENTS[present].coins} coins</Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{marginTop: 22, zIndex: 100}}
          onPress={onPressConfirm}>
          <Image source={require('../assets/imgs/btn_confim_size_m.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CongratulationScreen;

const styles = StyleSheet.create({
  normalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
  },
  goldenText: {
    color: '#FFDD00',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
