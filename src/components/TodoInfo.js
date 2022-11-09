import React from 'react'
import { 
    StatusBar,
   StyleSheet,
   TextInput,
   Text,
   View,
   TouchableOpacity,
   ScrollView,
   Image,
} from 'react-native';
import { styles } from '../css/styles';
import TodoSchema from '../schema/TodoSchema';

export default function TodoInfo(props) {

  const updateStatus = async(id) => {
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TodoSchema],
    });
    realm.write(() => {
      const oldTodo = realm.objects('todo').filter(todo => todo._id === id)[0];
      oldTodo.todoStatus = (oldTodo.todoStatus=="pending"?"done":"pending");
      console.log("#########",oldTodo);
    });
  }

  return (
    <View elevation={5} style = {styles.TodoField}>
      <View style={{flex:10, justifyContent:"center", borderRightWidth:1, alignItems:'center'}}>
          <Image source= {props.TodoData.todoType?require('/home/tushar/Desktop/TodoApp/src/static/icons8-face-50.png'):require('/home/tushar/Desktop/TodoApp/src/static/icons8-organization-chart-people-32.png')}></Image>
      </View>
      <View style = {{flex:30, justifyContent:"space-evenly", padding:8, alignItems:'center'}}>
        <Text>
             {props.TodoData.title} 
        </Text>
        <Text>
             {props.TodoData.date} 
        </Text>
      </View>
      <TouchableOpacity onPress={async()=>{await updateStatus(props.TodoData._id); props.onStatusChange(!props.statusChange)}}>
        <View style = {{flex:1, justifyContent:"center", padding:10, backgroundColor:(props.TodoData.todoStatus=="pending"?"red":"green"), borderBottomRightRadius:15, borderTopRightRadius:15}}>
        </View>
      </TouchableOpacity>
    </View>
  )
}
