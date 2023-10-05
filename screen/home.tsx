import React,{useState,useEffect} from 'react';
import { View,FlatList,Text,StyleSheet,Pressable,Image,TextInput,ActivityIndicator } from 'react-native';
import {useNavigation} from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../firebase';
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

const userImg='https://img.icons8.com/ios/100/circled.png';

const Home = () => {
  
  const [userName, setUserName] = useState('');
  const [userlist,setUserlist] = useState<{ key: any; username: any;}[]>([]);
  const [userData, setUserData] = useState<{ key: any; username: any;}[]>([]);
  const [getUserlist,setgetUserList]=useState(true);
  const [keyword,setKeyword]=useState('')
  const [page,setpage]=useState(6)
  const slicedData = userlist.slice(0,page);
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParams>>();
  //get user name----------------------------------------------------
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      const userId = currentUser.uid;

      const userRef = firebase.database().ref('users/' + userId+'/username');

      userRef.once('value')
        .then((snapshot) => {
          const userName= snapshot.val();

          setUserName('Hi, ' + userName);
        })
        .catch((error) => {

        });
    } else {

      setUserName('Hi, User');
    }
  }, []);

  //get user data from firebase----------------------------------------------------
  useEffect(() => {
    const usersRef = firebase.database().ref('users');

    usersRef.once('value').then((snapshot) => {
      const data = snapshot.val();
      if (data) {

        const userList = Object.keys(data).map((uid) => ({
          key: data[uid].email, 
          username: data[uid].username, 
        }));

        setUserData(userList);
        setUserlist(userList);
      }
    });
  }, [getUserlist]);
  //when press logOut
  const logOut = () =>{
    firebase.auth().signOut().then(async()=>{
      await AsyncStorage.setItem('userTokenEmail','');
      await AsyncStorage.setItem('userTokenPassword','' );
      navigation.navigate('signIn')
    });
  }
  //reload list
  const reloadUserList =() =>{
    setgetUserList(!getUserlist);
    setKeyword("");
    setUserlist(userlist);
    setpage(6);
  }
  //search bar function
  const searchBarTextOnChange=(searchKeyword:string)=>{
    setKeyword(searchKeyword);
  }
  const searchBarButtoOnClick =()=>{
    const filteredData = userData.filter((Customer) =>
      Customer.key.toLowerCase().includes(keyword.toLowerCase())
    );
    setUserlist(filteredData);
  }
  const[isloadMoreData,setisLoadMoreData]=useState(false)

  const onloadMoreData=()=>{
    setisLoadMoreData(true);
    setTimeout(() => {
      setpage(page+1)
      setisLoadMoreData(false);
    }, 1000);
  }
    
  return (
    <View>

      <View style={style.fixToText}>

        <Text style={style.userName}>{userName}</Text>
        
        <Text style={style.screenTitle}>Manage Customer</Text>

        <Pressable onPress={logOut}>
        <Text style={style.textsignout}>sign out</Text>
        </Pressable>

      </View>

      <View style={[style.fixToText,style.searchBar]}>
        <TextInput style={style.searchBarInput}
        placeholder='Search Customers'
        onChangeText={searchBarTextOnChange}
        value={keyword}/>
        <Pressable 
          style={style.searchBarButton} 
          onPress={searchBarButtoOnClick}>
            <Text style={style.searchBartext}>Search</Text>
        </Pressable>
      </View>

      <View>
      <FlatList style={style.listcontent}
        data={slicedData}
        onEndReached={onloadMoreData} 
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          //list------------------------------------------
          <View style={style.listcontainer}>

            <View style={style.fixToText}>

              <Image
                source={{ uri: userImg }}
                style={{ width: 80, height: 80 }}/>

              <View style={style.userinform}>

                <Text>Email: {item.key}</Text>
                <Text>Username: {item.username}</Text>

              </View>

            </View>

          </View>
          //list------------------------------------------
        )}
          ListFooterComponent={()=>(isloadMoreData?
            <ActivityIndicator size="large" color="red"/>:null
        )}
      />
      </View>
      <View style={style.bottom}>
          <Pressable onPress={reloadUserList}>
            <Image 
              source={{uri:'https://img.icons8.com/external-kosonicon-solid-kosonicon/96/external-reloading-arrows-set-2-kosonicon-solid-kosonicon-6.png'}}
              style={style.reloadImg}/>
          </Pressable>
      </View>
    </View>
  );
};
const style=StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userName:{
    flex:1,
    fontWeight: '800',
    padding:10,
  },
  textsignout:{
    flex:1,
    color:'red',
    fontWeight: '800',
    padding:10,
  },
  screenTitle: {
    flex:5,
    fontWeight: '800',
    textAlign:'center',
    padding:10,
  },
  listcontainer:{
    borderBottomWidth:1,
    padding:10,
    height:110,
  },
  userinform:{
    justifyContent: 'center',
    paddingLeft:20,
  },
  useremail:{
    marginBottom:10,
  },
  listcontent:{
    height:550,
  },
  reloadImg:{
    height:40,
    width:40,
  },
  bottom:{
    alignItems: 'center',
  },
  searchBar:{
    backgroundColor:'lightgray',
    height:50,
  },
  searchBarInput:{
    width:330,
    height:50,
    textAlign:'center',
  },
  searchBarButton:{
    backgroundColor:'red',
    borderRadius:7,
    width:80,
    justifyContent:'center',
  },
  searchBartext:{
    color:'white',
    textAlign:'center',
  },
});
export default Home;