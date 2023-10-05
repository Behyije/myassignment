import React,{ useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet,TextInput,Image } from 'react-native';
import {useNavigation,} from '@react-navigation/core'
import {ref, set} from 'firebase/database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParams } from '../App';
import firebase from '../firebase';
import isValidEmail from './func/isValidEmail';

const SignUp = () => {

  const navigation=useNavigation<NativeStackNavigationProp<RootStackParams>>()

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

  //sign in button on press----------------------------------------------------
  const handleSignIn =() =>{
    setpassword('')
    setemail('')
    navigation.navigate('signIn');
  };

  //sign up button on press----------------------------------------------------
  const handleSignup = () => {
    //firebase Authentication sign up---------------------------------------------
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const username = email.split('@');
        const db = firebase.database()
        set(ref(db, 'users/' + user?.uid), {
          username:username[0],
          email: email,
        }).catch((error) => {
        });
        firebase.auth().signOut();
        Alert.alert('Successful Signup')
        navigation.navigate('signIn');
      })
      .catch((error) => {
        Alert.alert('email or password format wrong')
      });
  };
  return (
    <View style={styles.sectionContainer}>

      <Text style= {styles.sectionTitle}>Sign Up</Text> 
      <Text>Hi,nice to meet you!</Text>
      <Text style={styles.contentTitle}>Email</Text>

        <TextInput style={styles.input}
          placeholder=''
          onChangeText={handleEmailChange}
          value={email}/>

      <Text style={isValidEmail(email) ? styles.validText : styles.invalidText}>{checkemail}</Text>

      <Text style={styles.contentTitle} >Password</Text>

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

      <Pressable style={styles.signUpbutton} onPress={handleSignup}>

        <Text style={styles.signupButtonText}>Continue</Text>

      </Pressable>

      <View style={styles.fixToText}>

        <Text style={styles.signintext}>Have an Account?    </Text>

        <Pressable style={styles.signinbutton} onPress={handleSignIn}>

          <Text style={styles.signinButtonText}>Sign In</Text>

        </Pressable>

      </View>

    </View> 
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent:'center',
    height:600,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom:20,
  },
  contentTitle:{
      color:'red',
      fontWeight: '600',
      marginTop:30,
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth:1,
    marginBottom:10,
    marginTop:5,
    paddingHorizontal: 10,
    marginHorizontal:10,
    width:300,
  },
  passwordInPutText:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    margin:10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16, 
  },
  signinbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'right',
  },
  signinButtonText: {
    color: 'red',
    fontSize: 16, 
  },
  signintext:{
  },
  fixToText: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  validText: {
    color: 'green',
  },
  invalidText: {
    color: 'red',
  },
  });

export default SignUp;