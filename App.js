/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';

 import Login from './src/components/Login';
 import SignUp from './src/components/SignUp';
 import TodoPage from './src/components/TodoPage';
 import AddTodo from './src/components/AddTodo';
 
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 const Stack = createNativeStackNavigator();
 
 const App= () => {
 
   return (
         <NavigationContainer>
           <Stack.Navigator>
             <Stack.Screen
               name="Login"
               component={Login}
               options={{
                 headerShown:false
               }}
             />
             <Stack.Screen
               name="TodoPage"
               component={TodoPage}
               options={{
                 headerShown:false
               }}
             />
             <Stack.Screen 
             name="AddTodo"  
             component={AddTodo} 
             />
             <Stack.Screen 
             name="SignUp"  
             component={SignUp} 
             options={{
               headerShown:false
             }}
             />
           </Stack.Navigator>
         </NavigationContainer>
   );
 };
 
 export default App;
 