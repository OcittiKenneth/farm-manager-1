import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import ExpenditureForm from "./ExpenditureForm";
import IncomeForm from "./IncomeForm";

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="IncomeForm"
      activeColor="#fff"
      labelStyle={{ fontSize: 60 }}
      backgroundColor="#650205"
      style={{ backgroundColor: "#650205", fontSize: 40 }}
    >
      <Tab.Screen
        name="IncomeForm"
        component={IncomeForm}
        backgroundColor="#650205"
        options={{
          tabBarLabel: "Income",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="finance" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="ExpenditureForm"
        component={ExpenditureForm}
        options={{
          tabBarLabel: "Expenditure",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="key" color={color} size={size} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function BottomNav() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
