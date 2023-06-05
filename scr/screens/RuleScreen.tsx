import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';

type RulesScreenProps = {
  navigation: any;
  route: any;
};

const RulesScreen: React.FC<RulesScreenProps> = ({navigation, route}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [content, setContent] = useState<string[]>(['Đang tải dữ liệu']);

  useEffect(() => {
    firestore()
      .collection('Host')
      .doc('Rules')
      .get()
      .then(data => {
        if (data.exists) {
          const rulesData = data.data();
          if (rulesData) {
            setContent(rulesData.rules);
          }
        }
      })
      .catch(e => console.log(e));
  }, []);

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
          source={require('../assets/imgs/ic_topRight.png')}
          style={{
            zIndex: -9,
            position: 'absolute',
            top: -52,
            right: -95,
          }}
        />

        <Image
          source={require('../assets/imgs/flower.png')}
          style={{
            zIndex: -9,
            position: 'absolute',
            top: height * 0.32,
            left: -26,
          }}
        />

        <Image
          source={require('../assets/imgs/flower.png')}
          style={{
            zIndex: -9,
            position: 'absolute',
            top: height * 0.4,
            right: -30,
          }}
        />

        <Image
          source={require('../assets/imgs/flower.png')}
          style={{
            zIndex: -9,
            position: 'absolute',
            top: height * 0.8,
            left: -20,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={{flex: 1}}>
        <Header
          title="Thể lệ chương trình"
          isButtonBack
          navigation={navigation}
          route={route}
        />

        <ScrollView style={{flex: 1}}>
          <Text style={styles.content}>
            {/* {content.map((item, index) => {
              return <Text key={index}>{item + '\n\n'}</Text>;
            })} */}
            <Text>{content}</Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default RulesScreen;

const styles = StyleSheet.create({
  content: {
    textAlign: 'justify',
    marginHorizontal: 34,
    color: '#FFF',
  },
});
