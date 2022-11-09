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
    Button,
    SafeAreaView,
  } from 'react-native';
 
import { styles } from '../css/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'
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
    const [open, setOpen] = useState(false);
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
    <SafeAreaView style={[styles.TodoContainer, {
        flexDirection: "column"
        }]}>
  
      <StatusBar style = "auto"/>
          <View style = {{ flex: 1, alignItems :'center' , justifyContent : 'center'}} >
          <Text style = {styles.sectionTitle}>Add Todo Items</Text> 
          
          </View>
    
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

        {/* {showPicker && <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            is24Hour={true}
            dateFormat="yyyy-mm-dd"
        //   minimumDate={new Date()}
          onChange = { (event, selectedDate) => {setDate(selectedDate.toLocaleString()); setShowPicker(false);}}
        />} */}

        <Button title="Open Date Time Picker" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={new Date()}
                minimumDate={new Date()}
                onConfirm={(date) => {
                setOpen(false)
                setDate(date.toLocaleString());
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />

         <Text>Selected Date: {date}</Text> 
            
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
    </SafeAreaView>
  )
}
