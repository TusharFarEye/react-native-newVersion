/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {
   StatusBar,
   StyleSheet,
   TextInput,
   Text,
   View,
   TouchableOpacity,
   TouchableWithoutFeedback,
 } from 'react-native';
 
import { styles } from '../css/styles';
import { Keyboard } from 'react-native';

 const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

 function validateEmail(email){
    return (regEmail.test(email)?"":"Invalid Email");
 };

 function validatePassword(password){
    if(password.length == 0){
        return("Password is required");
    }        
    else if(password.length < 6){
        return("Password should be minimum 6 characters");
    }      
    else if(password.indexOf(' ') >= 0){        
      return("Password cannot contain spaces");                          
    }    
    else{
      return("");
    }        
 };

 const SignUp = ({navigation},props) => {
    
    const [name,setName] = useState("");
    const [email ,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
      setEmailError(validateEmail(email));
    }, [email]);

    useEffect(() => {
      setPasswordError(validatePassword(password));
    }, [password]);

   return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={[styles.LoginContainer, {
      flexDirection: "column"
      }]}>

    <StatusBar style = "auto"/>
    <View style = {{ flex: 1, backgroundColor: "grey" , alignItems :'center' ,justifyContent : 'center'}} >
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
                 placeholder="Name."
                 placeholderTextColor="#003f5c"
                 onChangeText={setName} />
 
           <TextInput
               style={styles.TextInput}
               placeholder="Email."
               placeholderTextColor="#003f5c"
               onChangeText={setEmail}
               keyboardType='email-address'
                />

            {emailError.length>0?<Text style = {styles.redAlert}>{emailError}</Text>:<></>}           

           <TextInput
               style={styles.TextInput}
               placeholder="Password."
               placeholderTextColor="#003f5c"
               secureTextEntry={true}
               onChangeText={setPassword} />
           
           
           {passwordError.length>0?<Text style = {styles.redAlert}>{passwordError}</Text>:<></>}

           <View style = {{justifyContent:'center', paddingTop:5, flexDirection:'row'}}>
              <Text>Already Registered? </Text>
              
              <TouchableOpacity onPress = {() => navigation.navigate("Login")}>
                <Text  style = {{ fontWeight:'bold', color:'purple'}}>Login</Text>
              </TouchableOpacity>
            
              
            </View>
           

           <TouchableOpacity style={styles.loginButton}>
             <Text style = {{color:'white'}}>SIGN UP</Text>
           </TouchableOpacity>

           
           </View>
      </View> 
      </TouchableWithoutFeedback>
   );
 };
 
 export default SignUp;
 