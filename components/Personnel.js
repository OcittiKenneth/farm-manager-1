import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Button, Linking, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
var t = require("tcomb-form-native");
const Form = t.form.Form;

var Qualifications = t.enums({
  PHD: "PhD",
  Masters: "Masters",
  Degree: "Degree",
  Diploma: "Diploma",
  Certificate: "Certificate",
  UACE: "A-Level",
  UCE: "O-Level",
  PLE: "PLE",
  None: "None",  
});

const FirstName = t.refinement(t.String, FirstName => {
    const regex = /^[a-zA-Z0-9].*[\s\.]*$/i; //case insensitive string with space.
    return regex.test(FirstName);
});

const LastName = t.refinement(t.String, LastName => {
    const regex = /^[a-zA-Z].*[\s\.]*$/i; //case insensitive string with space
    return regex.test(LastName);
});

const PhoneNumber1 = t.refinement(t.Number, PhoneNumber1 => {
    const regex = /^[0-9].*[\s\.]*$/i; //case insensitive//alphanumeric//with spaces.
    return regex.test(PhoneNumber1);
});

const JobTitle = t.refinement(t.String, JobTitle => {
    const regex = /^[a-zA-Z].*[\s\.]*$/i; //case insensitive string with space
    return regex.test(JobTitle);
});

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
     FirstName: FirstName,  //string
    LastName: LastName,
    dob:t.Date ,
    PhoneNumber1: PhoneNumber1,
    PhoneNumber2: t.maybe(t.Number),
    NIN: t.maybe(t.Number), 
    JobTitle: JobTitle,
   
    Qualifications: Qualifications
   
    
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
        FirstName: {
            error: "Please use only letters."
        },
        LastName: {
            error: "Please use only letters."
        },
        dob:{
            mode:'date'
        },
        PhoneNumber1: {
            error: "Please use only digits."
        },
        JobTitle: {
            error: "Please use only letters & words."
        },
    },
    stylesheet: formStyles
};

export default class Personnel extends Component {
     constructor(props){
         super(props);
        this.state = {
        image: null,

     }
    
  };
    handleSubmit = () => {
        const value = this._form.getValue();
        console.log("value: ", value);
    };
    componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

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
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
                <ScrollView>
                    <View>
                        <Text style={styles.title}>Personnel File</Text>
                        <Form ref={c => (this._form = c)} type={User} options={options} />
                        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        <View style={styles.button}><Button color="#0A802B" title="Save" onPress={this.handleSubmit} /></View>
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
        textAlign: 'center',
        marginTop: 18,
        fontSize: 18
    },
    link: {
        fontWeight: 'bold',
        color: "#650205",
        textAlign: 'center',
        marginTop: 8,
        fontSize: 20,
        fontWeight: "bold"
    },
    butt: {
        marginTop: 20,
    }
});
