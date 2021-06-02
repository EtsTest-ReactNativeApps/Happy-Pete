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
    constructor(props) {
        super(props);
        this.state = { email: "" };
    }


    resetPassword = (navigation) => {
        FirebaseConfig
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then(function(user) {
                Alert.alert("Please check your email to reset the password!");

                navigation.goBack()
            })
            .catch(function(e) {
                console.log(e);
            });
    };

    render() {
        const {navigation} = this.props
        return (

                <View style={styles.container}>

      <Text style={styles.heading}>FORGOT PASSWORD</Text>

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
                        onPress={() => this.resetPassword(navigation)}
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
        alignItems: "center",
        justifyContent: "flex-start",
        alignContent: "center",
        backgroundColor : "#008080",
        fontSize : 18,
    },

    heading :{
        color:"#fff",
        fontWeight : "bold",
        marginVertical :40,
        fontSize : 24,
        marginTop : "50%",
      },

      inputContainer: {
        backgroundColor: "white",
        borderRadius: 30,
        width : 350,
        height: 45,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        borderWidth:2,
        paddingVertical:25,
      },
      inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: "#FFFFFF",
        flex: 1,
        fontWeight:"500",
        fontSize : 18
      },
      inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: "center",
      },
      buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: 350,
        borderRadius: 30,
        paddingVertical:25,

      },
      loginButton: {
        backgroundColor: "#000",
      },
    loginText: {
        color: "white",
        fontSize:18,
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
    },
    description : {
        fontWeight : "bold",
        color : "#fff",
        width : 300,
        textAlign : "center",
        fontSize : 16,
        marginTop : 30,
        lineHeight : 27
    }
});
