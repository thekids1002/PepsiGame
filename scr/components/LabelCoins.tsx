import React from 'react';
import {Text, View, Image, ImageSourcePropType, StyleSheet} from 'react-native';

interface LabelCoinsProps {
  coins: number;
}

const LabelCoins: React.FC<LabelCoinsProps> = ({coins}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/imgs/lbl_coinsBackground.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.coinsContainer}>
        <Text style={styles.coinsText}>{coins}</Text>
      </View>
      <Image
        source={require('../assets/imgs/lbl_coinsCollection.png')}
        style={styles.collectionImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  backgroundImage: {
    width: 100,
    height: 100,
  },
  coinsContainer: {
    justifyContent: 'center',
    height: 100,
    position: 'absolute',
  },
  coinsText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  collectionImage: {
    marginTop: 12,
  },
});

export default LabelCoins;
