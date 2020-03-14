import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  Linking,
  KeyboardAvoidingView
} from "react-native";
import { SQlite } from 'expo-sqlite';

const db = SQlite.openDatabase("my.db");

var t = require("tcomb-form-native");
const Form = t.form.Form;
const Email = t.refinement(t.String, Email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(Email);
});
const Phone = t.refinement(t.Number, Phone => {
  const reg = /^[0]?[0-9]\d{9}$/;
  return reg.test(Phone);
});
const Name = t.refinement(t.String, Name => {
  const regex = /^[a-zA-Z].*[\s\.]*$/g;
  return regex.test(Name);
});

const User = t.struct({
  Name: Name,
  Email: Email,
  Phone: Phone,
  Password: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 5
    }
  },
  controlLabel: {
    normal: {
      color: "#650205",
      fontSize: 20,
      marginBottom: 5
    },

    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const options = {
  fields: {
    Name: {
      autoFocus: true,
      label: "Name",
      returnKeyType: "next",
      error: "Please enter a correct Name"
    },
    Email: {
      label: "Email",
      returnKeyType: "next",
      error: "Please enter a correct email address"
    },
    Phone: {
      label: "Phone",
      returnKeyType: "next",
      error: "Please enter a correct phone number"
    },
    Password: {
      label: "Password",
      error: "Please create a password",
      Password: true,
      secureTextEntry: true
    }
  },
  stylesheet: formStyles
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "", Email: "", Phone: "", Password: ""
    };

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM users ?", [],
        function (txt, res) {
          console.log("Item: ", res.row.length);
          if (res.row.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXITS users (id interger PRIMARY KEY, name TEXT, email TEXT UNIQUE, phone INTERGER, password TEXT)",
              []
            );
          }
        }
      );
    });
  }

  toggleDataSubmitted = () => {
    this.setState({
      Name: this.state.Name,
      Email: this.state.Email,
      Phone: this.state.Phone,
      Password: this.state.Password
    })
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log(value);
    const { Name } = this.state;
    const { Email } = this.state;
    const { Phone } = this.state.Phone;
    const { Password } = this.state.Password;

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)",
        [Name, Email, Phone, Password],
        (tx, results) => {

        }
      )
    })

  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View>
            <Text style={styles.title}>Sign Up</Text>
            <Form ref={c => (this._form = c)} type={User} options={options} />
            <View style={styles.button}>
              <Button
                color="#0A802B"
                title="Sign Up"
                onPress={this.handleSubmit.bind(this)}
              />
            </View>
            <Text style={styles.question}>Have an account?</Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("http://google.com")}
            >
              Log In
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
};



const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 35,
    marginTop: 30,
    color: "#650205",
    textAlign: "center",
    marginBottom: 25
  },
  question: {
    color: "gray",
    textAlign: "center",
    marginTop: 18,
    fontSize: 18
  },
  link: {
    color: "#650205",
    textAlign: "center",
    marginTop: 8,
    fontSize: 20
  },
  button: {
    marginTop: 20
  }
});

