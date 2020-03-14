import React, { Component } from 'react'
import { Text, View, Button} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function incomeland({navigation}) {
  return (
            <View>
                <Text> Income Landing Page </Text>
                <Button 
                title="ADD"
                style={{position: 'absolute', bottom:0, left:0,}}
                onPress={() => navigation.navigate('incomeForm')}
                />
            </View>
        )
    }


