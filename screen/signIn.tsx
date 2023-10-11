import React, { useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core'
import { View, Text,StyleSheet,TextInput,Pressable, Alert,Image} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParams } from '../App';
import firebase from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState, AppDispatch } from '../store';
import { setEmail } from '../slice/emailSlice';
import { setPassword, setVisible } from '../slice/passwordSlice';
import { useSelector, useDispatch } from 'react-redux';


const SignIn = () => {
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParams>>();

  //email input text----------------------------------------------------
  const email = useSelector((state: RootState) => state.email.email);
  const checkEmail = useSelector((state: RootState) => state.email.checkEmail);
  const isValidEmail = useSelector((state: RootState) => state.email.isvalidEmail);
  const dispatch: AppDispatch = useDispatch();

  const handleEmailChange = (text: string) => {
    dispatch(setEmail(text));
  };
  
  //password input text----------------------------------------------------
  const password = useSelector((state: RootState) => state.password.password);
  const isVisible = useSelector((state: RootState) => state.password.isVisible);
  const [imageVisible,setImageVisible] = useState('https://img.icons8.com/material-outlined/24/invisible.png');

  const handlePasswordChange = (text: string) => {
    dispatch(setPassword(text));
  };
  const handleVisibleChange=()=>{
    if(isVisible){
      dispatch(setVisible(false));
      setImageVisible('https://img.icons8.com/material-outlined/24/visible--v1.png');
    }else{
      dispatch(setVisible(true));
      setImageVisible('https://img.icons8.com/material-outlined/24/invisible.png');
    }
    
  }
  //press sign up----------------------------------------------------
  const handleSignUp =() =>{
    setImageVisible('https://img.icons8.com/material-outlined/24/invisible.png');
    dispatch(setVisible(true));
    dispatch(setPassword(''));
    dispatch(setEmail(''));
    navigation.navigate('signUp');
  };
  //press sign in----------------------------------------------------
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async() => {
        setImageVisible('https://img.icons8.com/material-outlined/24/invisible.png');
        dispatch(setVisible(true));
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        navigation.navigate('home');
        await AsyncStorage.setItem('userTokenEmail', email);
        await AsyncStorage.setItem('userTokenPassword', password);
      })
      .catch((error) => {
        Alert.alert('Email or password is wrong')
      });
  };
  //check are user login?----------------------------------------------------
  useEffect(() => {
    const checkUserLoginStatus = async () => {
      const userTokenEmail  = await AsyncStorage.getItem('userTokenEmail');
      const userTokenPassword = await AsyncStorage.getItem('userTokenPassword');
      if (userTokenEmail !== '' && userTokenPassword !== '') {
          firebase
        .auth()
        .signInWithEmailAndPassword(userTokenEmail as string, userTokenPassword as string)
        .then(() => {
          navigation.navigate('home'); 
        })
        .catch((error) => {
        });
      }
    };

    checkUserLoginStatus();
  }, []);

  return (
    <View style={{backgroundColor:'red'}}>
        <Text style= {styles.screenTitle}>Compeny name</Text>
        <View style={styles.sectionContainer}>

        <View style={styles.sectionTitleView}>
          <Text style= {styles.sectionTitle}>Sign In</Text>
          <Text>HI there,nice to meet you again!</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.contentTitle}>Email</Text>
            <TextInput style={styles.input}
              placeholder=''
              onChangeText={(text) => handleEmailChange(text)}
              value={email} 
            />
          <Text style={isValidEmail ? styles.validText : styles.invalidText}>{checkEmail}</Text>
          <Text style={styles.contentTitle}>Password</Text>
          <View style={styles.passwordInPutText}>
            <TextInput style={styles.input}
                placeholder='at least 6 number'
                secureTextEntry={isVisible}
                onChangeText={handlePasswordChange}
                value={password}/>
            <Pressable onPress={handleVisibleChange}>
              <Image
                source={{ uri: imageVisible }}
                style={{ width: 24, height: 24 }}
              />
            </Pressable>
          </View>
        </View>
          <Pressable style={styles.signinbutton} onPress={handleSignIn}>
            <Text style={styles.signinButtonText}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.signupbutton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </Pressable>
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: '600',
    margin: 20,
    color:'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    backgroundColor:'white',
    height:600,
    justifyContent:'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionTitleView: {
    marginBottom:60,
  },
  contentTitle:{
      color:'red',
      marginTop:10,
  },
  inputView:{
    padding:10,
    marginBottom:30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth:1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width:300,
  },
  passwordInPutText:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  signinbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    margin:10,
  },
  signinButtonText: {
    color: 'white',
    fontSize: 16, 
  },
  signupbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin:10,
  },
  signupButtonText: {
    color: 'red',
    fontSize: 16, 
  },
  validText: {
    color: 'green',
  },
  invalidText: {
    color: 'red',
  },
});
export default SignIn;