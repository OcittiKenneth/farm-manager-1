import 'react-native-gesture-handler';
import React from "react";
import {
  View, StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
// import LandReportFinance from "./IncomeForm";
// import LandReportInventory from "./LandReportInventory";

const Stack = createStackNavigator();


export default function LandReportInventory({navigation}) {
  return (
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.finance}>
        <View>
          <Text>INVENTORY</Text>
        </View>
      </TouchableOpacity>
      <Button
                    title="ADD"
                    style={styles.butt}
                    onPress={() => navigation.navigate("NewToolForm")}
                />

      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
  nav: {
    flex: 0.7,
    flexDirection: "row",
    backgroundColor: "#ad2525",
    justifyContent: "center",
    alignItems: "center"
  },
  menu: {
    flex: 1,
    height: 90,
    alignItems: "flex-start",
    paddingLeft: 15,
    justifyContent: "center",
    color: "white"
  },
  detail: {
    flex: 1,
    justifyContent: "center",
    height: 90,
    alignItems: "flex-end",
    paddingRight: 15
  },
  finance: {
    backgroundColor: "green",
    flex: 2,
    justifyContent: "center",
    margin: 8,
    alignItems: "center"
  },
  inventory: {
    backgroundColor: "gray",
    margin: 8,
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  update: {
    backgroundColor: "black",
    margin: 8,
    flex: 1.3,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
});



// import React, { Component } from 'react'
// import { Text, View } from 'react-native'

// export default class LandReportInventory extends Component {
//     render( {} ) {
//         // const ref = React.useRef(null);
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text> Landing page for the inventory module </Text>
//             </View>
//         )
//     }
// }

