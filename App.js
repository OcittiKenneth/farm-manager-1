import React from 'react';
import { View } from 'react-native';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Consumable from './components/Consumable'

export default function App() {
  return (  
    <View style={{ flex: 1 }}>
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Consumable />
    </View>
  )
}
