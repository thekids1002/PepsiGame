import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import {RootStackParams} from './RootStackParam';
import SignupScreen from '../screens/SignupScreen';
import OTPScreen from '../screens/OTPScreen';
import RulesScreen from '../screens/RuleScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanBillScreen from '../screens/ScanBillScreen';
import PlayGameScreen from '../screens/PlayGameScreen';
import CollectionScreen from '../screens/CollectionScreen';
import CongratulationScreen from '../screens/CongratulationScreen';
import TutorialScreen from '../screens/TutorialScreen';
import GiftDetailScreen from '../screens/GiftDetailScreen';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Rule" component={RulesScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ScanBillScreen" component={ScanBillScreen} />
        <Stack.Screen name="Collection" component={CollectionScreen} />
        <Stack.Screen name="PlayGameScreen" component={PlayGameScreen} />
        <Stack.Screen
          name="CongratulationsScreen"
          component={CongratulationScreen}
        />
        <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
        <Stack.Screen name="GiftDetailScreen" component={GiftDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
