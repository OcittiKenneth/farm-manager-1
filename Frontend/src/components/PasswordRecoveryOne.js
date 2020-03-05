import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  Linking,
  Image
} from "react-native";

var t = require("tcomb-form-native");
const Form = t.form.Form;
const Email = t.refinement(t.String, Email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(Email);
});

const RecoveryOne = t.struct({
  Email: Email
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 20
    }
  },
  controlLabel: {
    normal: {
      color: "#650225",
      fontSize: 20,
      marginBottom: 7
    },

    error: {
      color: "red",
      fontSize: 12,
      marginBottom: 7,
      fontWeight: "bold"
    }
  }
};

const options = {
  fields: {
    Email: {
      autoFocus: true,
      error: "Please enter a valid email"
    }
  },
  stylesheet: formStyles
};

export default class PasswordRecovery extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          flexDirection: "column",
          justifyContent: "center"
        }}
        behavior="padding"
        enabled
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.image}>
              <Image source={require("../images/user.png")} />
            </View>
            <Text style={styles.word1}>Password Recovery</Text>
            <Text style={styles.word2}>Enter Account Email</Text>
            <Form
              ref={c => (this._form = c)}
              type={RecoveryOne}
              options={options}
            />
            <View>
              <Text
                style={styles.recovery}
                onPress={() => Linking.openURL("http://google.com")}
              >
                Send Recovery Link To My Email
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  image: {
    alignItems: "center",
    marginTop: 25
  },
  word1: {
    fontSize: 20,
    marginTop: 10,
    color: "#650225",
    fontWeight: "bold"
  },
  word2: {
    fontSize: 18,
    marginTop: 10,
    color: "#650225",
    paddingBottom: 40,
    paddingTop: 20
  },
  recovery: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#650225"
  }
});
