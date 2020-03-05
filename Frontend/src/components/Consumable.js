import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Linking,
  Text,
  KeyboardAvoidingView
} from "react-native";

var t = require("tcomb-form-native");
const Form = t.form.Form;
// const Quantity = t.refinement(t.String, Quantity => {
//     const qtyReg = /^[0-9\s]$/;
//     return qtyReg.test(Quantity);
// });
// const QuantityUsed = t.refinement(t.Number, QuantityUsed => {
//     const qtyUsedReg = /^[0-9\s]$/;
//     return qtyUsedReg.test(QuantityUsed);
// });
// const Name = t.refinement(t.String, Name => {
//     const regex = /^[a-zA-Z].*[\s\.]*$/g;
//     return regex.test(Name);
// });

// const QuantityBalance = t.refinement(t.Number, QuantityBalance => {
//     const qtyBalanceReg = /^[0-9\s]$/;
//     return qtyBalanceReg.test(QuantityBalance);
// })
// const Description = t.refinement(t.String, Description => {
//     const descReg = /^[a-zA-Z].*[\s\.]*$/g;
//     return descReg.test(Description);
// })
// const Notification = t.refinement(t.String, Notification => {
//     const notificationReg = ''
// })
// const TakenBy = t.refinement(t.String, TakenBy => {
//     const takenReg = /^[a-zA-Z].*[\s\.]*$/g;
//     return takenReg.test(TakenBy);
// })

const User = t.struct({
  Name: t.String,
  Quantity: t.Number,
  QuantityUsed: t.Number,
  QuantityBalance: t.Number,
  Description: t.String,
  Notification: t.String,
  TakenBy: t.String
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
      error: "Please enter a correct Name"
    },
    Quantity: {
      error: "Please enter correct quantity value"
    },
    QuantityUsed: {
      label: "Quantity Used",
      error: "Please enter correct quantity value"
    },
    QuantityBalance: {
      label: "Quantity Balance",
      error: "Please enter correct quantity value"
    },
    TakenBy: {
      label: "Taken By",
      error: "Please enter in letters"
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
              <Text style={styles.title}>Consumable</Text>
            </View>
            <View style={styles.horizontal} />
            <Form ref={c => (this._form = c)} type={User} options={options} />
            <View style={styles.button}>
              <Button
                color="#0A802B"
                title="Save"
                onPress={this.handleSubmit}
              />
            </View>
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
    padding: 20,
    paddingBottom: 50
  },
  title: {
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
    marginTop: 20,
    marginBottom: 50
  }
});
