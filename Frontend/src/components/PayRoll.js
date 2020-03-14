import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  Linking,
  KeyboardAvoidingView,
  TouchableHighlight
} from "react-native";
import moment from "moment";
import ImageFactory from "react-native-image-picker-form";
// import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';

// var ImagePicker = require('react-native-image-picker');
var t = require("tcomb-form-native");
const Form = t.form.Form;

const MobileMoneyNumber = t.refinement(t.Number, MobileMoneyNumber => {
  const reg = /^[0]?[0-9]\d{9}$/;
  return reg.test(MobileMoneyNumber);
});
const Name = t.refinement(t.String, Name => {
  const regex = /^[a-zA-Z].*[\s\.]*$/g;
  return regex.test(Name);
});

var PaymentMode = t.enums({
  Cash: "Cash",
  Bank: "Bank",
  MobileMoney: "Mobile Money"
});

var Gender = t.enums({
  M: "Male",
  F: "Female"
});

var Status = t.enums({
  Permanent: "Permanent",
  Temporary: "Temporary"
});

var Tax = t.enums({
  VAT: "Value Added Tax",
  WHT: "Withholding Tax"
});

const Payroll = t.struct({
  ...Form.User,
  Date: t.Date,
  Name: Name,
  Gender: Gender,
  Position: t.maybe(t.String),
  Status: Status,
  PaymentMode: PaymentMode,
  SalaryAmount: t.Number,
  PAYE: t.maybe(t.Number),
  NSSF1: t.maybe(t.Number),
  NSSF2: t.maybe(t.Number),
  Tax: t.maybe(Tax),
  LST: t.maybe(t.Number),
  Advance: t.maybe(t.Number),
  NetPay: t.Number,
  // PaySlip: t.maybe(t.String),
  Total: t.Number
});

const formStyles = {
  ...Form.stylesheet,
  //   formGroup: {
  //     normal: {
  //       marginBottom: 5
  //     }
  //   },
  controlLabel: {
    normal: {
      color: "#650205",
      fontSize: 20
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
  ...Form.options,
  fields: {
    Date: {
      label: "Date",
      mode: "date",
      error: "Please enter a correct date",
      returnKeyType: "next",
      config: {
        defaultValueText: "Select",
        format: date => moment(date).format("DD-MM-YYYY")
      }
    },
    Name: {
      autoFocus: true,
      label: "Name",
      error: "Please enter a correct Name",
      returnKeyType: "next"
    },
    Gender: {
      label: "Gender",
      error: "You must select gender",
      returnKeyType: "next",
      config: {
        defaultValueText: "Select"
      }
    },
    Position: {
      label: "Position",
      error: "Please enter the employee's position",
      returnKeyType: "next"
    },
    Status: {
      label: "Status",
      error: "Please enter the status of the employee",
      returnKeyType: "next"
    },
    PaymentMode: {
      label: "Payment Mode",
      error: "Please select a mode of payment",
      returnKeyType: "next"
    },
    SalaryAmount: {
      label: "Salary Amount",
      error: "Please enter a correct Salary Amount",
      returnKeyType: "next"
    },
    PAYE: {
      label: "PAYE",
      error: "PAYE is missing",
      returnKeyType: "next"
    },
    NSSF1: {
      label: "NSSF(5%)",
      error: "NSSF is missing",
      returnKeyType: "next"
    },
    NSSF2: {
      label: "NSSF(10%)",
      error: "NSSF is missing",
      returnKeyType: "next"
    },
    Tax: {
      label: "Tax",
      error: "Tax is missing",
      returnKeyType: "next"
    },
    LST: {
      label: "Local Service Tax",
      error: "LST is missing",
      returnKeyType: "next"
    },
    Advance: {
      label: "Salary Advance",
      error: "Advance missing",
      returnKeyType: "next"
    },
    NetPay: {
      label: "Net Pay",
      error: "Net pay is missing",
      returnKeyType: "next"
    },
    PaySlip: {
      label: "Pay Slip",
      returnKeyType: "next",
      config: {
        title: "Select Pay Slip Image",
        options: ["Open camera", "Select from gallery", "Cancel"],
        style: {
          titleFontFamily: "Roboto"
        }
      },
      factory: ImageFactory
    },
    Total: {
      label: "Total",
      error: "Total is missing"
    }
  },
  stylesheet: formStyles
};

export default class PayRoll extends Component {
  constructor() {
    super();

    this.state = {};
  }
  handleSubmit = event => {
    const value = this._form.getValue();
    console.log("value: ", value);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View>
            <Text style={styles.title}>Payroll Form</Text>
            <Form
              ref={c => (this._form = c)}
              type={Payroll}
              options={options}
            />
            <TouchableHighlight>
              <View style={styles.button}>
                <Button
                  color="#0A802B"
                  title="SAVE"
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
    marginTop: 15,
    padding: 20
  },
  title: {
    fontSize: 35,
    marginTop: 5,
    color: "#650205",
    textAlign: "center",
    marginBottom: 25
  },
  button: {
    marginBottom: 15
  }
});
