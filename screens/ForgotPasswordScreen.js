import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    Picker,
    AsyncStorage
} from "react-native";
import FirebaseConfig from "../components/config";


export default class ForgotPasswordScreen extends Component {
    state = { email: "" };

    resetPassword = () => {
        const { email } = this.state;
        FirebaseConfig
            .auth()
            .sendPasswordResetEmail(email)
            .then(function(user) {
                Alert.alert("Please check your email to reset the password!");
            })
            .catch(function(e) {
                console.log(e);
            });
    };

    render() {
        return (

                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image
                            style={styles.inputIcon}
                            source={require("../assets/mailIcon.jpg")}
                        />
                        <TextInput
                            style={styles.inputs}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoFocus
                            underlineColorAndroid="transparent"
                            onChangeText={email => this.setState({ email })}
                        />
                    </View>

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.resetPassword()}
                    >
                        <Text style={styles.loginText}>Reset</Text>
                    </TouchableHighlight>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        borderBottomColor: "#fff8dc",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: "#FFFFFF",
        flex: 1
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: "center"
    },
    buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 250,
        borderRadius: 30
    },
    loginButton: {
        backgroundColor: "#00b5ec"
    },
    loginText: {
        color: "white"
    },
    fixTotext: {
        justifyContent: "space-between",
        flexDirection: "row"
    },
    forgotButton: {
        marginRight: 40,
        fontWeight: "900",
        color: "#00ffff",
        fontSize: 17
    },
    buttonContainerForgot: {
        marginTop: "4%",
        height: 35,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "40%",
        borderRadius: 15,
        marginLeft: "4%"
    },
    forgotText: {
        fontWeight: "800"
    }
});
