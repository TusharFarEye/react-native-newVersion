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
    Image,
    SafeAreaView,
    FlatList
} from 'react-native';

import TodoInfo from './TodoInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../css/styles';
import { getUserDetails } from '../api/User';
import TodoSchema from '../schema/TodoSchema';
import UserDetailsSchema from '../schema/UserDetailsSchema';

const getUserFirstName = async() => {
  let response = await getUserDetails();
  return (await response.json())[0].firstName;
}

export default function TodoPage({navigation}) {

    const [TodoList ,setTodoList] = useState([]);
    const [userName, setUserName] = useState("");
    const [isSelected, setIsSelected] = useState("ToDo");
    const [statusChange, onStatusChange] = useState(false);

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
   
   userLogout = async() => {
    const realm1 = await Realm.open({
      path: "myrealm1",
      schema: [UserDetailsSchema],
    });

    realm1.write(() => {
      realm1.deleteAll();
      });

    navigation.navigate("Login");
   }

   const renderItem = ( data ) => {
              const field = data.item;
              if(isSelected=="ToDo")
              return <TodoInfo TodoData = {field} statusChange = {statusChange} onStatusChange = {onStatusChange}></TodoInfo>
              if(isSelected=="Pending" && field.todoStatus=="pending")
              return <TodoInfo TodoData = {field} statusChange = {statusChange} onStatusChange = {onStatusChange}></TodoInfo>
              if(isSelected=="Done" && field.todoStatus=="done")
              return <TodoInfo TodoData = {field} statusChange = {statusChange} onStatusChange = {onStatusChange}></TodoInfo>
    };

  return (

    <SafeAreaView style={[styles.TodoContainer, {
      flexDirection: "column"
      }]}>

    <StatusBar style = "auto"/>
        <View style = {{ flex: 1, alignItems :'center' , justifyContent : 'center'}} >

        <TouchableOpacity style = {styles.LogoutButton} onPress = {()=>userLogout()}>
        <Image style = {{width :30, height:30, resizeMode: 'contain'}} source={require('/home/tushar/Desktop/TodoApp/src/static/icons8-logout-64.png')} />
        </TouchableOpacity>

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
                <Text style={{color:(isSelected=="Doing"?"#000080":"black")}} onPress = {()=>setIsSelected("Pending")}>Pending</Text> 
                <Text style={{color:(isSelected=="Done"?"#000080":"black")}} onPress = {()=>setIsSelected("Done")}>Done</Text>
            </View>

          <SafeAreaView style= {{alignContent:'center', width:"80%", padding:10, height:500}}>
          {TodoList.length==0?<Text>No Tasks left, Well Done !</Text>:
                <FlatList
                  data={TodoList}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                />}
              </SafeAreaView>

        <TouchableOpacity style = {styles.AddUserButton} onPress = {() => navigation.navigate('AddTodo')}>
        <Image source={require('/home/tushar/Desktop/TodoApp/src/static/icons8-add-40.png')} />
        </TouchableOpacity>

        
          {/* <Text onPress={()=>AsyncStorage.clear()}>Clear Async Storage</Text> */}
        
    </View>

    </SafeAreaView>
  )
}
