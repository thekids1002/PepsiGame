import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';

interface LoadingDialogProps {
  visible: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default LoadingDialog;
