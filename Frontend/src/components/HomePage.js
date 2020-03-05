import React from "react";
import {
  View,
  StyleSheet,
  Text,
  AppRegistry,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image
} from "react-native";

export default function HomePage() {
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="yellow" hidden={false} backgroundColor="blue" translucent={true} /> */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.menu}>
          <Text>MENU</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detail}>
          <Text>DETAIL</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.finance}>
        <View>
          <Text>FINANCE</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.inventory}>
        <View>
          <Text>INVENTORY</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.update}>
        <Text style={styles.text}>UPDATE</Text>
      </View>
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
