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
import t from "tcomb-form-native";

const Form = t.form.Form;

const Requisition = t.struct({
  Date: t.Date,
  CostType: t.String,
  Units: t.Number,
  Activity: t.String,
  Quantity: t.Number,
  UnitPrice: t.Number,
  SubTotal: t.Number,
  Description: t.String,
  RequestedBy: t.String,
  ApprovedBy: t.maybe(t.String),
  Total: t.Number
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

const RequisitionOptions = {
  fields: {
    Date: {
      mode: "date",
      error: "Please enter harvest date",
      config: {
        defaultValueText: "Select",
        format: date => moment(date).format("DD-MM-YYYY")
      }
    },
    CostType: {
      error: "Please enter correct quantity value"
    },
    Units: {
      error: "Please enter correct unit value"
    },
    Activity: {
      error: "Name of activity or item is required"
    },
    store: {
      error: "Please provide store name"
    },
    Quantity: {
      error: "Please provide description"
    },
    UnitPrice: {
      error: "Please enter unit price"
    },
    SubTotal: {
      error: "Expect correct values"
    },
    Description: {
      error: "Please describe requisition"
    },
    RequestedBy: {
      error: "Requested by who?"
    },
    Total: {
      error: "No total captured"
    }
  },
  stylesheet: formStyles
};

export default class RequisitionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { Quantity: "", UnitPrice: "", SubTotal: "" };
  }
  handleSubmit = () => {
    const value = this.formRef.getValue();
    const quantity = value.Quantity;
    const unitPrice = value.UnitPrice;
    const subTotal = quantity * unitPrice

    console.log("value: ", value);
    console.log(subTotal);
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <ScrollView>
            <View>
              <Text style={styles.title}>Requisition Form</Text>
            </View>
            <Form
              ref={request => (this.formRef = request)}
              type={Requisition}
              options={RequisitionOptions}
            />
            <TouchableHighlight>
              <View style={styles.buttonView}>
                <Button
                  color="#0A802B"
                  title="SUBMIT REQUEST"
                  onPress={this.handleSubmit}
                />
              </View>
            </TouchableHighlight>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
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
  title: {
    fontSize: 35,
    marginTop: 5,
    color: "#650205",
    textAlign: "center",
    marginBottom: 25
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 50
  }
});
