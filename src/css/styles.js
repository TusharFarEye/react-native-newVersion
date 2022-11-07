import {
    StyleSheet
  } from 'react-native';

export const styles = StyleSheet.create({
    redAlert :{
      color: "red",
      marginBottom: 20,
    },
     LoginContainer: {
       flex: 1,
       backgroundColor: "grey",
     },
     TodoContainer: {
        flex: 1,
        backgroundColor: "#000080",
      },
     TextInput: {
      borderBottomWidth : 1,
       minWidth : 240,
       width: "80%",
       height: 45,
       marginBottom: 20,
       alignItems: "center",
       marginTop:20,
       padding :10,
     },
     sectionTitle: {
       fontSize: 24,
       fontWeight: '600',
       justifyContent:'center',
       color:'white'
     },
     signUpRedirect: {
       height: 30,
       marginBottom: 30,
     },
     loginButton: {
       width: "80%",
       borderRadius: 25,
       minWidth : 250,
       height: 50,
       alignItems: "center",
       justifyContent: "center",
       marginTop: 40,
       backgroundColor: "purple",
     },
     TodoNav: {
        flexDirection:"row",
        color:'yellow',
        justifyContent:'space-evenly',
        width: "70%",
        height:60,
        alignContent:'center',
        padding:20,
        borderRadius:10,
        backgroundColor: "white",
        marginTop:-30,
        shadowColor: '#000000',
    },
    TodoField:{
        flex:1,
        flexDirection:"row",
        backgroundColor: "white",
        height:100,
        marginBottom:10,
        marginTop:10,
        shadowColor: '#000000',
        padding:10,
        justifyContent:"center",
        alignContent:"center",
        borderRadius:15,
    },
    AddUserButton:{
        flexDirection: "row",
        alignContent: "flex-end",
        marginBottom:20,
        marginTop:10,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    AddTodo:{
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"grey",
    }
   });