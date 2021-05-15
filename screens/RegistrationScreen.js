import React, { Component } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TouchableHighlight,
    ScrollView,
    Image,
    ActivityIndicator,
    Picker,
    TextInput
} from "react-native";
import FirebaseConfig from "../components/config";

export default class RegistrationScreen extends Component{
    state = {  email: "", password: "",name:"",phoneNumber:null};
    validateForm=()=>{
        if(this.state.email===""||this.state.email===undefined){
            alert("Please enter your email address.")
        }
        else{
            if(this.state.password===""||this.state.password===undefined){
                alert("Please enter your password.")
            }
            else{
                if(this.state.name==="" || this.state.name===undefined){
                    alert("Please enter your name")
                }
                else{
                    this.handleRegistration()
                }
            }
        }
    }
    handleRegistration = () => {
        FirebaseConfig.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user)=>{
                FirebaseConfig.auth().currentUser.sendEmailVerification().then(r => {
                    alert("An email sent to you, please verify and login again.")
                    let userId=FirebaseConfig.auth().currentUser.uid
                    if(userId){
                        FirebaseConfig.database().ref("users/" + userId)
                            .set({
                                email: this.state.email,
                                name: this.state.name,
                                phoneNumber: this.state.phoneNumber,
                                role:"Customer"

                            }).then(r =>{
                        })
                    }
                })

             })
            .catch((error)=>{
                alert(error)
            })
    };
    render(){
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.inputContainer}>
                        <Image
                            style={styles.inputIcon}
                            source={require("../assets/name.png")}
                        />
                        <TextInput

                            style={styles.inputs}
                            placeholder="Name"
                            keyboardType="default"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(name) => this.setState({ name })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image
                            style={styles.inputIcon}
                            source={require("../assets/mailIcon.jpg")}
                        />
                        <TextInput
                            style={styles.inputs}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image
                            style={styles.inputIcon}
                            source={require("../assets/pwdIcon.png")}
                        />
                        <TextInput
                            style={styles.inputs}
                            placeholder="Password"
                            keyboardType="default"
                            secureTextEntry
                            underlineColorAndroid="transparent"
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image
                            style={styles.inputIcon}
                            source={require("../assets/mobile.png")}
                        />
                        <TextInput
                            style={styles.inputs}
                            placeholder="Mobile Number"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(phoneNumber) => this.setState({ phoneNumber})}
                        />
                    </View>

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.validateForm()}
                    >
                        <Text style={styles.loginText}>Register</Text>
                    </TouchableHighlight>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    },

    wrapper: {
        display: "flex",
        flex: 1,

    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1
    },
    avoidView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        flex:1
    },
    loginHeader: {
        fontSize: 28,
        color: "white",
        fontWeight: "300",
        marginBottom: 40
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
        alignItems: "center",
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: "#FFFFFF",
        flex: 1,
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
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#2196F3",
    },
    loginText: {
        color: "white",
    },
    fixTotext: {
        justifyContent: "space-between",
        flexDirection: "row",
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
        marginLeft: "20%",
    },

    forgotText: {
        fontWeight: "800",
    },
})
