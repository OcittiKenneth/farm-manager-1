
import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import LandReportFinance from "./LandReportFinance";
import LandReportInventory from "./LandReportInventory";
import HomePage from "./HomePage";


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
      initialRouteName="HomePage"
      activeColor="#fff"
      labelStyle={{ fontSize: 60 }}
      backgroundColor="#650205"
      style={{ backgroundColor: "#650205", fontSize: 40 }}
    >
      <Tab.Screen
        name="LandReportFinance"
        component={LandReportFinance}
        backgroundColor="#650205"
        options={{
          tabBarLabel: "Finace",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="finance" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LandReportInventory"
        component={LandReportInventory}
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="key" color={color} size={size} />
          )
        }}
      />
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
