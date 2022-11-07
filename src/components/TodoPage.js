import React, { useState, useEffect } from 'react'
import { NavigationContainer, useIsFocused} from '@react-navigation/native';
import Realm from "realm";

import { 
    StatusBar,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';

import TodoInfo from './TodoInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../css/styles';
import { getUserDetails } from '../api/User';
import TodoSchema from '../schema/TodoSchema';

const getUserFirstName = async() => {
  let response = await getUserDetails();
  return (await response.json())[0].firstName;
}

export default function TodoPage({navigation}) {

    const [TodoList ,setTodoList] = useState([]);
    const [userName, setUserName] = useState("");
    const [isSelected, setIsSelected] = useState("ToDo");

   useEffect( () => {
    async function fetchTodoData(){
    // try {
    //     const valueString = await AsyncStorage.getItem('todoList');
    //     const value = JSON.parse(valueString);
    //     if (value !== null) {
    //         setTodoList(value);
    //       console.log(value);
    //     }
    //   } catch (error) {
    //         console.log(error);
    //   }
      const realm = await Realm.open({
        path: "myrealm",
        schema: [TodoSchema],
      });
      const todoList = realm.objects("todo");

      console.log("todoList from realm", todoList);

      setTodoList(todoList);
    }
    fetchTodoData();
   }, [useIsFocused()])
   
   useEffect( () => {
    async function fetchData(){
    try {
        const userName = await getUserFirstName();
        console.log("%%%%%%%",await userName);
        setUserName(userName);
      } catch (error) {
          console.log(error);
      }
    }
    fetchData();
   }, [])
   
  return (

    <View style={[styles.TodoContainer, {
      flexDirection: "column"
      }]}>

    <StatusBar style = "auto"/>
        <View style = {{ flex: 1, alignItems :'center' ,justifyContent : 'center'}} >
        <Text style = {styles.sectionTitle}>Hello {userName}</Text>
        </View>
        <View style = {{ 
            flex: 4, 
            backgroundColor: "white" , 
            alignItems :'center', 
            borderTopLeftRadius : 25, 
            borderTopRightRadius : 25,
            justifyContent : 'center'
            }} >

            <View elevation = {5} style={styles.TodoNav}>
                <Text style={{color:(isSelected=="ToDo"?"#000080":"black")}} onPress = {()=>setIsSelected("ToDo")} >ToDo</Text> 
                <Text style={{color:(isSelected=="Doing"?"#000080":"black")}} onPress = {()=>setIsSelected("Doing")}>Doing</Text> 
                <Text style={{color:(isSelected=="Done"?"#000080":"black")}} onPress = {()=>setIsSelected("Done")}>Done</Text>
            </View>

            <ScrollView style= {{alignContent:'center', width:"80%", padding:10}}>
                {TodoList.map((field) => {
                    let today = new Date();
                    let currDate =  today. getFullYear()+'/' +parseInt(today. getMonth() + 1) + '/' +today. getDate();
                    console.log("todays date",currDate);
                    if(isSelected=="ToDo")
                    return <TodoInfo TodoData = {field}></TodoInfo>
                    if(isSelected=="Doing" && field.date>=currDate)
                    return <TodoInfo TodoData = {field}></TodoInfo>
                    if(isSelected=="Done" && field.date<currDate)
                    return <TodoInfo TodoData = {field}></TodoInfo>
                }
                )}
            </ScrollView>


        <TouchableOpacity style = {styles.AddUserButton} onPress = {() => navigation.navigate('AddTodo')}>
        <Image source={require('/home/tushar/Desktop/TodoApp/src/static/icons8-add-40.png')} />
        </TouchableOpacity>

        
          {/* <Text onPress={()=>AsyncStorage.clear()}>Clear Async Storage</Text> */}
        
    </View>

    </View>
  )
}
