/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useState} from 'react';
 import {
   StatusBar,
   StyleSheet,
   TextInput,
   Text,
   View,
   TouchableOpacity,
   Touchable,
   TouchableWithoutFeedback,
 } from 'react-native';
 
import { postUserLogin } from '../api/Login';
import { styles } from '../css/styles';
import { Keyboard } from 'react-native';
import Realm from 'realm';
import UserDetailsSchema from '../schema/UserDetailsSchema';

 const Login= ({navigation}) => {
 
    const [email ,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    // maintining session if user details already in database;
    useEffect(() => {
        const renderUser = async() => {

        const realm1 = await Realm.open({
          path: "myrealm1",
          schema: [UserDetailsSchema],
        });

        userList = realm1.objects("userDetailsNew");
        
        console.log("found userList :" , userList);
          if(userList.length > 0){
            checkAuthorizedUserAndNavigate(userList[0].email, userList[0].password, false);
          }else{
            console.log("New User");
          }
        }
          
        renderUser();
        
      }, []);

    const storeUserDetails = async() => {
        const realm1 = await Realm.open({
          path: "myrealm1",
          schema: [UserDetailsSchema],
        });

        const incrementID =()=> {
          userList = realm1.objects("userDetailsNew");
          if(userList.length>0)
            return (userList.max("_id") ) + 1;
          else
            return 1;
        }

        obj = {
          _id:incrementID(),
          email : email,
          password : password,
        }

        realm1.write(() => {
          let userDetails = realm1.create("userDetailsNew", obj);
          console.log(`created user: ${userDetails}`);
          });

          
      };
      

    const checkAuthorizedUserAndNavigate = async(email, password, isNewUser) => {
      console.log("checking if authorized user");
      const userData = {
        username:email,
        password:password,
      };

      let response = await postUserLogin(userData);

      console.log("*************************",response);

      if(response.status == 200){
        console.log("Logged In");
        if(isNewUser)storeUserDetails();
        navigation.navigate('TodoPage');
      }else{
        console.log("Invalid Credentials");
        setLoginMessage("Invalid Credentials");
      }
    };

   return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={[styles.LoginContainer, {
      flexDirection: "column"
      }]}>

    <StatusBar style = "auto"/>
    <View style = {{ flex: 1, alignItems :'center', justifyContent : 'center'}} >
      <Text style = {styles.sectionTitle}>TODO APP</Text>
      </View>
      <View style = {{ 
          flex: 2, 
          backgroundColor: "white" , 
          alignItems :'center', 
          borderTopLeftRadius : 25, 
          borderTopRightRadius : 25,
          justifyContent : 'space-evenly'
          }} >

           <TextInput
               style={styles.TextInput}
               placeholder="Email."
               placeholderTextColor="#003f5c"
               onChangeText={setEmail} 
               keyboardType='email-address'
               />
           
           <TextInput
               style={styles.TextInput}
               placeholder="Password."
               placeholderTextColor="#003f5c"
               secureTextEntry={true}
               onChangeText={setPassword} />
           
           <View style = {{justifyContent:'center', paddingTop:5, flexDirection:'row'}}>
              <Text>New User? </Text>
              
              <TouchableOpacity onPress = {() => navigation.navigate("SignUp")}>
                <Text  style = {{ fontWeight:'bold', color:'purple'}}>Sign Up</Text>
              </TouchableOpacity>
              
            </View>

           {loginMessage.length>0?<Text style = {styles.redAlert}>{loginMessage}</Text>:<></>}

           <TouchableOpacity style={styles.loginButton} onPress = {
            ()=>checkAuthorizedUserAndNavigate(email, password, true)
            }>  
             <Text style = {{color:'white'}}>LOGIN</Text>
           </TouchableOpacity>

         </View>
      </View> 
       </TouchableWithoutFeedback>
   );
 };
   
 export default Login;
 