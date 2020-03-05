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
    this.Name, this.Email, this.Phone, this.Password;
  }

  // componentDidMount() {
  //   this.refs._form.getComponent("Name").refs.input.focus();
  // }

  InsertDataToServer = async () => {
    fetch("http://ac23113a.ngrok.io/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.Name,
        email: this.Email,
        phone: this.Phone,
        password: this.Password
      })
    })
      // .then(response => {
      //   if (
      //     response.statusText == "OK" &&
      //     response.status >= 200 &&
      //     response.status < 300
      //   ) {
      //     return response.json();
      //   } else {
      //     throw new Error("Server can't be reached!");
      //   }
      // })
      // .then(json => {
      //   alert("Thank You for Signing Up!");
      //   this.props.navigation.navigate("Login");
      //   console.log("hooray! we have json!");
      //   console.log(json);
      // })
      // .catch(error => {
      //   console.log("error fetching data");
      //   console.log(error);
      //   console.log(error.message); // Server can't be reached!
      //   this.setState({ server_error: "request failed try again." });
      // });

      .then(response => response.json())
      .then(responseJson => {
        // alert("Thank You for Signing Up!");
        Alert.alert(responseJson);
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log(value);
    if (value != null) {
      (this.Name = value.Name),
        (this.Email = value.Email),
        (this.Phone = value.Phone),
        (this.Password = value.Password),
        this.InsertDataToServer();
    }
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
                onPress={this.handleSubmit}
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
    );
  }
}

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
    // fontWeight: "bold",
    color: "#650205",
    textAlign: "center",
    marginTop: 8,
    fontSize: 20
  },
  button: {
    marginTop: 20
  }
});

// export default SignUp;
