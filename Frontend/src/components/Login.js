import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking
} from "react-native";

var t = require("tcomb-form-native");
const Form = t.form.Form;
const Email = t.refinement(t.String, Email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(Email);
});

const LoginForm = t.struct({
  Email: Email,
  Password: t.String
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
    },
    Password: {
      error: "Please enter password",
      Password: true,
      secureTextEntry: true
    }
  },
  stylesheet: formStyles
};

class Login extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log("value: ", value);
  };

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
            <Text style={styles.word}>Welcome</Text>
            <Form
              ref={c => (this._form = c)}
              type={LoginForm}
              options={options}
            />
            <Button
              title="Login"
              color="#0A802B"
              onPress={this.handleSubmit}
              style={{ backgroundColor: "#0a802b" }}
            ></Button>
            <View style={styles.lowText}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 8,
                  color: "grey"
                }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                Forgot Password?
              </Text>
              <Text>Don't have an account?</Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 8,
                  color: "grey",
                  fontSize: 20,
                  color: "#650225"
                }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                Sign Up
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
    backgroundColor: "#fff",
    fontWeight: "bold"
  },
  word: {
    fontSize: 25,
    marginTop: 70,
    color: "#650225",
    paddingBottom: 40,
    paddingTop: 20
  },
  words: {
    marginTop: 5,
    color: "#650225"
  },
  lowText: {
    marginTop: 22,
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#fff",
    alignItems: "center",
    paddingTop: 20
  }
});

export default Login;
