import React, { useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core'
import { View, Text,StyleSheet,TextInput,Pressable, Alert,Image} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParams } from '../App';
import firebase from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isValidEmail from './func/isValidEmail';

const SignIn = () => {
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParams>>();

  //email input text----------------------------------------------------
  const [email,setemail] = useState('');
  const [checkemail, setcheckemail] = useState<string>('');
  const handleEmailChange = (text:string) =>{

    if(isValidEmail(text)){
      setcheckemail('Email format valid');
    }else{
      setcheckemail('Email format is not valid');
    }

    setemail(text);
    };
  
  //password input text----------------------------------------------------
  const[password,setpassword]=useState('');
  const[visible,setvisible]=useState<boolean>(true);
  const[imageVisible,setImgVisible]=useState('https://img.icons8.com/material-outlined/24/invisible.png');
  
  const handlePasswordChange = (text:string) =>{
    setpassword(text);};
  const handlevisibleChange = () =>{
    if(visible){
      setImgVisible('https://img.icons8.com/material-outlined/24/visible--v1.png');
      setvisible(false);
    }else{
      setImgVisible('https://img.icons8.com/material-outlined/24/invisible.png');
      setvisible(true);
    }
      };
  //press sign up----------------------------------------------------
  const handleSignUp =() =>{
    navigation.navigate('signUp');
  };
  //press sign in----------------------------------------------------
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async() => {
        setemail('');
        setpassword('');
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
              onChangeText={handleEmailChange}
              value={email} 
            />
          <Text style={isValidEmail(email) ? styles.validText : styles.invalidText}>{checkemail}</Text>
          <Text style={styles.contentTitle}>Password</Text>
          <View style={styles.passwordInPutText}>
            <TextInput style={styles.input}
                placeholder='at least 6 number'
                secureTextEntry={visible}
                onChangeText={handlePasswordChange}
                value={password}/>
            <Pressable onPress={handlevisibleChange}>
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