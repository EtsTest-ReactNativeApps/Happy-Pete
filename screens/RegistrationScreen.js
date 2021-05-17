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
                      <Text style={styles.heading}>LOGIN</Text>

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

            <View style={styles.login}>
                <Text style={styles.loginTextBlack} onPress={() =>
                    this.props.navigation.navigate("Login")
                  }>Already a user? Login</Text>
              </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        backgroundColor : "#F7F082",
    },
    
heading :{
    color:"#000",
    fontWeight : "bold",
    marginVertical :40,
    fontSize : 31,
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

    login : {
        display :"flex",
        alignItems : "center",
        justifyContent : "center",
      },
      
      loginTextBlack : {
        color : "#000",
        fontWeight: "bold",
        fontSize :18,
        marginTop : 30,

      },

})
