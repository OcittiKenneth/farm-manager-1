import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./src/components/HomePage";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";
import PayRoll from "./src/components/PayRoll";
import PasswordRecoveryOne from "./src/components/PasswordRecoveryOne";
import PasswordRecoveryTwo from "./src/components/PasswordRecoveryTwo";
import Advance from "./src/components/Advance";
import ToolBinCard from "./src/components/ToolBinCard";
import Personnel from "./src/components/Personnel";
import ExpenditureForm from "./src/components/ExpenditureForm";
import IncomeForm from "./src/components/IncomeForm";
import BottomNav from "./src/components/BottomNav";
import Harvest from "./src/components/Harvest";
import Consumable from "./src/components/Consumable";
import RequisitionForm from "./src/components/RequisitionForm";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HomePage />
        {/* <Login /> */}
        {/* <SignUp /> */}
        {/* <PayRoll /> */}
        {/* <PasswordRecoveryOne /> */}
        {/* <PasswordRecoveryTwo /> */}
        {/* <Advance /> */}
        {/* <Personnel /> */}
        {/* <ToolBinCard /> */}
        {/* <ExpenditureForm /> */}
        {/* <IncomeForm /> */}
        {/* <BottomNav /> */}
        {/* <Harvest /> */}
        {/* <Consumable /> */}
        {/* <RequisitionForm /> */}
      </View>
    );
  }
}
