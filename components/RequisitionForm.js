import React, { Component } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    // TextInput,
    Button,
    Text,
    TouchableHighlight,
    KeyboardAvoidingView,
} from "react-native";
import t from 'tcomb-form-native'

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
    Total: t.Number,
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 5,
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
            mode: 'date',
            error: "Please enter harvest date",
        },
        CostType: {
            returnKeyType: 'next',
            placeholder: 'CostType',
            error: "Please enter correct quantity value"
        },
        Units: {
            returnKeyType: 'next',
            placeholder: 'Units',
            error: "Please enter correct unit value"
        },
        Activity: {
            returnKeyType: 'next',
            placeholder: 'Activity',
            error: "Name of activity or item is required"
        },
        store: {
            returnKeyType: 'next',
            placeholder: 'P',
            error: 'Please provide store name'
        },
        Quantity: {
            returnKeyType: 'next',
            placeholder: 'Quantity',
            error: 'Please provide description'
        },
        UnitPrice: {
            returnKeyType: 'next',
            placeholder: 'Unit price',
            error: 'Please enter unit price'
        },
        SubTotal: {
            placeholder: 'Sub total',
            error: 'Expect correct values'
        },
        Description: {
            returnKeyType: 'next',
            placeholder: 'Description',
            error: 'Please describe requisition'
        },
        RequestedBy: {
            returnKeyType: 'next',
            placeholder: 'Requested by who?',
            error: 'Requested by who?'
        },
        ApprovedBy: {
            returnKeyType: 'done',
            placeholder: 'Approved by?',
        },
        Total: {
            placeholder: 'Here is totalu amount'
        }
    },
    stylesheet: formStyles
};

export default class RequisitionForm extends Component {

    constructor(props) {
        super(props);
        this.state = { Quantity: "", UnitPrice: "", SubTotal: "" };
    }

    onFormChange = (text) => {
        reQuantity = this.refs.form.getComponent('Quantity').refs.input.focus();
        reUnitPrice = this.refs.form.getComponent('UnitPrice').refs.input.focus();
        reSubTotal = this.refs.form.getComponent('SubTotal').refs.input.focus();
        const yy = this.setState({ reQuantity: this.state.Quantity + text });
        const xx = this.setState({ reUnitPrice: this.state.UnitPrice + text });
        const subResult = yy * xx;
        SubTotal = this.setState({ reSubTotal: this.state.SubTotal + subResult });
    }

    handleSubmit = () => {
        const value = this.formRef.getValue();
        console.log("value: ", value);
    };

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" enabled >
                    <ScrollView>
                        <View><Text style={styles.text}>Requisition Form</Text></View>
                        <Form ref={request => (this.formRef = request)} type={Requisition} options={RequisitionOptions} onPress={this.onFormChange} />
                        <TouchableHighlight>
                            <View style={styles.buttonView}><Button color="#0A802B" title="SUBMIT REQUEST" onPress={this.handleSubmit} /></View>
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
        marginTop: 17,
        padding: 17,
        paddingBottom: 50

    },
    text: {
        fontSize: 40,
        marginBottom: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: "#650205",
    },
    buttonView: {
        alignItems: 'flex-end',
        margin: 10,
    },
});

