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

export default class AddAdminScreen extends Component{
    state = {  email: "", password: "",name:"",phoneNumber:null,address:""};
    handleRegistration = () => {
        FirebaseConfig.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user)=>{
                let userId=FirebaseConfig.auth().currentUser.uid
                if(userId){
                    FirebaseConfig.database().ref("users/" + userId)
                        .set({
                            email: this.state.email,
                            name: this.state.name,
                            phoneNumber: this.state.phoneNumber,
                            address: this.state.address,
                            role:"Admin"

                        }).then(r =>{
                        alert("Admin Added Successfully");
                        this.props.navigation.navigate("Admin")
                    })
                }
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
                        <TextInput
                            style={styles.inputs}
                            placeholder="Address"
                            keyboardType="default"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(address) => this.setState({ address })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(phoneNumber) => this.setState({ phoneNumber})}
                        />
                    </View>

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.handleRegistration()}
                    >
                        <Text style={styles.loginText}>Register</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.forgotButton]}
                        onPress={() =>
                            this.props.navigation.navigate("ForgotPasswordScreen")
                        }
                    >
                        <Text style={styles.loginText}>Forgot Password ?</Text>
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
        backgroundColor: "red",
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
