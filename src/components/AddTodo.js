import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Realm from "realm";

import {
    StatusBar,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Switch,
  } from 'react-native';
 
import { styles } from '../css/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import TodoSchema from '../schema/TodoSchema';

storeDataInAsync = async(obj) => { 
    try {
        const objString = await AsyncStorage.getItem('todoList');
        let objArray = JSON.parse(objString);
        if(objArray == null)objArray = [];
        console.log(objArray);
        objArray.push(obj);
        const finalObjArray = JSON.stringify(objArray);

        await AsyncStorage.setItem('todoList', finalObjArray ,(error) => console.log(error));
    
    } catch (error) {
        console.log(error);
    }
}  

export default function AddTodo({navigation}) {

    const [title , setTitle] = useState("");
    const [date , setDate] = useState("");
    const [todoStatus, setTodoStatus] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [todoType, setTodoType] = useState(true);

    const addToStorage = async() => {
        console.log("adding to storage");
        
        // try {
        //     await storeDataInAsync(obj)
        //     console.log("Todo Info Stored")
        //     navigation.navigate('TodoPage');
        // }catch(error){
        //     console.log(error);
        // }
        
        const realm = await Realm.open({
            path: "myrealm",
            schema: [TodoSchema],
          });

        const incrementID =()=>  {
            return (realm.objects("todo").max("_id") ) + 1;
        }

        obj = {
            _id:incrementID(),
            title:title,
            date:date,
            todoStatus: todoStatus,
            todoType: todoType
        }
    
        realm.write(() => {
        let todoField = realm.create("todo", obj);
        console.log(`created todo: ${todoField}`);
        navigation.navigate('TodoPage');
        });
    }

    

  return (
    <View style = {styles.AddTodo}>

        <TextInput 
        style={styles.TextInput}
        placeholder="Title"
        placeholderTextColor="#003f5c"
        onChangeText = {setTitle}>
        </TextInput>

        <TextInput 
        style={styles.TextInput}
        placeholder="Status"
        placeholderTextColor="#003f5c"
        onChangeText = {setTodoStatus}>
        </TextInput>

        <TouchableOpacity style ={styles.loginButton} onPress= {() => setShowPicker(true)}>
            <Text style = {{color:"white"}}>Select Date</Text>
        </TouchableOpacity>

        {showPicker && <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            is24Hour={true}
            dateFormat="yyyy-mm-dd"
        //   minimumDate={new Date()}
          onChange = { (event, selectedDate) => {setDate(selectedDate.toLocaleString()); setShowPicker(false);}}
        />}
         <Text>Selected Date: {date.toLocaleString()}</Text> 
            
        <View style = {{flexDirection:"row",marginTop:20}}>
                <Text>Personal</Text>
                <Switch onValueChange={() => setTodoType(!todoType)} value={!todoType}/>
                <Text>Work</Text>
         </View>

        <TouchableOpacity style ={styles.loginButton} onPress= {() => addToStorage()}>
            <Text style = {{color:"white"}}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style ={styles.loginButton} onPress= {() => navigation.navigate("TodoPage")}>
            <Text style = {{color:"white"}}>Cancel</Text>
        </TouchableOpacity>

    </View>
  )
}
