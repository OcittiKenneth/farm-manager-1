import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";


import IncomeLand from './IncomeLand';
import ExpenditureLand from './ExpenditureLand';
import PayrollLand from './PayrollLand';
import RequisitionLand from './RequisitionLand';
import AdvanceLand from './AdvanceLand';

// import HomePage from "./src/components/HomePage";
// import SignUp from "./src/components/SignUp";
// import Login from "./src/components/Login";
import PayRoll from "./PayRoll";
// import PasswordRecoveryOne from "./src/components/PasswordRecoveryOne";
// import PasswordRecoveryTwo from "./src/components/PasswordRecoveryTwo";
// import Advance from "./src/components/Advance";
// import ToolBinCard from "./src/components/ToolBinCard";
// import Personnel from "./src/components/Personnel";
// import ExpenditureForm from "./src/components/ExpenditureForm";
// import IncomeForm from "./src/components/IncomeForm";
// import BottomNav from "./src/components/BottomNav";
// import Harvest from "./src/components/Harvest";
// import Consumable from "./src/components/Consumable";
// import RequisitionForm from "./src/components/RequisitionForm";
// // import LandReportFinace from "./src/components/LandReportFinance";
// import LandReportInventory from "./src/components/LandReportInventory";


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function LandReportFinace({navigation}) {
  return (
     <View style={{flex: 1}}>
        <View style={{flex: 1, }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
            onPress={() => navigation.navigate('incomeLand')}
            style={{flex:1, backgroundColor: '#ecef57', borderRadius:20, margin:10,fontSize: 24, justifyContent: "center", alignItems: "center", fontSize:30}}>
            <Text>INCOME</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate('expenditureland')}
            style={{flex:1, backgroundColor: '#abdd53', borderRadius:20, margin:10,fontSize: 24, justifyContent: "center", alignItems: "center"}}>
            <Text>EXPENDITURE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity 
            onPress={() => navigation.navigate('payrollLand')}
            style={{flex:1, backgroundColor: '#7cb407', borderRadius:20, margin:10,fontSize: 24,justifyContent: "center", alignItems: "center"}}>
            <Text>PAYROLL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate('requisitionland')}
            style={{flex:1, backgroundColor: '#349e00', borderRadius:20, margin:10,fontSize: 24, justifyContent: "center", alignItems: "center"}}>
            <Text>REQUISITION</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, }}>
          <View 
          onPress={() => navigation.navigate('advanceland')}
          style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
            onPress={() => navigation.navigate('advanceLand')}
            style={{flex:1, backgroundColor: '#606734', borderRadius:20, margin:10,fontSize: 24, justifyContent: "center", alignItems: "center"}}>
            <Text>ADVANCE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1, backgroundColor: '#163700', borderRadius:20, margin:10, justifyContent: "center", alignItems: "center"}}>
            <Text>EXPENDITURE</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </View>
    );
  }
