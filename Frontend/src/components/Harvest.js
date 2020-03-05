import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";

var t = require("tcomb-form-native");
const Form = t.form.Form;

const User = t.struct({
  HarvestDate: t.Date,
  Quantity: t.Number,
  Units: t.Number,
  Source: t.String,
  Description: t.String,
  Store: t.String
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
    HarvestDate: {
      mode: "date",
      error: "Please enter harvest date",
      config: {
        defaultValueText: "Select",
        format: date => moment(date).format("DD-MM-YYYY")
      }
    },
    Quantity: {
      error: "Please enter correct quantity value"
    },
    Units: {
      error: "Please enter correct unit value"
    },
    Source: {
      error: "Please enter source"
    },
    Store: {
      error: "Please provide store name"
    },
    Description: {
      error: "Please provide description"
    }
  },
  stylesheet: formStyles
};

export default class Consumable extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log("value: ", value);
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ScrollView>
          <View>
            <View>
              <View>
                <Text style={styles.text}>New Harvest</Text>
              </View>
            </View>
            <Form ref={c => (this._form = c)} type={User} options={options} />
            <TouchableHighlight>
              <View style={styles.button}>
                <Button
                  color="#0A802B"
                  title="Save"
                  onPress={this.handleSubmit}
                />
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 24,
    padding: 17,
    paddingBottom: 50
  },
  text: {
    fontSize: 35,
    marginTop: 5,
    color: "#650205",
    textAlign: "center",
    marginBottom: 25
  },
  question: {
    color: "#650205",
    textAlign: "center",
    marginTop: 18,
    fontSize: 18
  },
  link: {
    fontWeight: "bold",
    color: "#650205",
    textAlign: "center",
    marginTop: 8,
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    marginTop: 20
  }
});
