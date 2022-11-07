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

export default function TodoInfo(props) {
  return (
    <View elevation={5} style = {styles.TodoField}>
      <View style={{flex:1, justifyContent:"center"}}>
          <Image source= {props.TodoData.todoType?require('/home/tushar/Desktop/TodoApp/src/static/doraemon.png'):require('/home/tushar/Desktop/TodoApp/src/static/business.png')}></Image>
      </View>
      <View style = {{flex:4, justifyContent:"center", padding:10}}>
        <Text>
             {props.TodoData.title} |  {props.TodoData.date} 
        </Text>
      </View>
    </View>
  )
}
