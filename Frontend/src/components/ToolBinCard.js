import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
var t = require("tcomb-form-native");
const Form = t.form.Form;

var ToolCondition = t.enums({
  GoodWorkingOrder: "Good Working Order",
  ToolNeedsMaintenance: "Tool Needs Maintenance",
  DamagedNotWorking: "Damaged, Not Working",
  Misplaced: "Misplaced or Lost",
  BoardedOff: "Boarded Off"
});

const ToolName = t.refinement(t.String, ToolName => {
  const regex = /^[a-zA-Z0-9].*[\s\.]*$/i; //case insensitive string with space.
  return regex.test(ToolName);
});

const TakenBy = t.refinement(t.String, TakenBy => {
  const regex = /^[a-zA-Z].*[\s\.]*$/i; //case insensitive string with space
  return regex.test(TakenBy);
});

const Desription = t.refinement(t.String, Desription => {
  const regex = /^[a-zA-Z].*[\s\.]*$/i; //case insensitive string with space
  return regex.test(Desription);
});

const StoreName = t.refinement(t.String, StoreName => {
  const regex = /^[a-zA-Z].*[\s\.]*$/i; //case insensitive string with space
  return regex.test(StoreName);
});

/** create the structure of the form. Image field is treated separately. */
const User = t.struct({
  ToolName: ToolName, //string
  Description: t.String, //string
  DateTakenIn: t.Date, //date picker
  StoreName: t.String, //string
  DateTakenOut: t.Date, //date picker
  TakenBy: t.String, //string
  ToolCondition: ToolCondition, //drop down select t.enums
  DateOfPurchase: t.Date,
  SerialNumber: t.String //string
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

/** define extra options of the form fields. */
const options = {
  fields: {
    ToolName: {
      label: "Tool Name",
      error: "Please use only letters."
    },
    Description: {
      error: "Please explain what the tool is exactly."
    },
    DateTakenIn: {
      label: "Date Taken In",
      mode: "date",
      config: {
        defaultValueText: "Select",
        format: date => moment(date).format("DD-MM-YYYY")
      }
    },
    StoreName: {
      label: "Store Name",
      error: "Please mention where the tool is being kept."
    },
    DateTakenOut: {
      label: "Date Taken Out",
      mode: "date",
      config: {
        defaultValueText: "Select",
        format: date => moment(date).format("DD-MM-YYYY")
      }
    },
    TakenBy: {
      label: "Taken By",
      error: "Please enter persons name."
    },
    ToolCondition: {
      label: "Tool Condition",
      error: "Please enter tool condition."
    },
    DateOfPurchase: {
      label: "Date of Purchase",
      mode: "date",
      config: {
        defaultValueText: "Select",
        format: date => moment(date).format("DD-MM-YYYY")
      }
    },
    SerialNumber: {
      label: "Serial Number",
      error: "Please use letters & numbers."
    }
  },
  stylesheet: formStyles
};
/** class based component */

export default class ToolBinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log("value: ", value);
  };
  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, get camera permissions first!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View>
            <Text style={styles.title}>Tool Bin Card</Text>
            <Form ref={c => (this._form = c)} type={User} options={options} />
            <Button title="Select Image." onPress={this._pickImage} />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
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
    padding: 20
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

  button: {
    marginTop: 20,
    marginBottom: 20
  }
});
