/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState,useEffect}from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import  {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from './screen/signIn';
import SignUp from './screen/signUp';
import Home from './screen/home';

export type RootStackParams = {
  signIn:any;
  signUp:any;
  home:any;
  list:any;
};
const RootStack = createNativeStackNavigator<RootStackParams>();

function MainApp(): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer >
      <RootStack.Navigator initialRouteName={'signIn'} screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='signIn' component={SignIn}/>
        <RootStack.Screen name='signUp' component={SignUp}/>
        <RootStack.Screen name='home' component={Home}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  }

});

export default MainApp;

/*
reference
https://www.youtube.com/watch?v=UzMbu3XKEoM&t=382s
https://www.reactnavigation.org.cn/docs/guide-quick-start
https://reactnavigation.org/docs/hello-react-navigation
https://reactnative.dev/docs/button
https://www.youtube.com/watch?v=LiHkAGyNSJU&t=592s
https://rnfirebase.io/
https://firebase.google.com/docs/database/web/structure-data?hl=zh&authuser=0
*/