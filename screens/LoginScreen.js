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


export default class LoginScreen extends Component{
  state = {  email: "", password: ""};
  validateForm=()=>{
    if(this.state.email === "" || this.state.email === undefined){
      alert("Please enter your email")
    }else{
      if(this.state.password===""||this.state.password===undefined){
        alert("Please enter your password.")
      }
      else{
        this.handleLogin()
      }
    }
  }
  handleLogin = () => {
    FirebaseConfig.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((result)=>{
          if(FirebaseConfig.auth().currentUser.emailVerified) {
            let role = null;
            FirebaseConfig.database().ref("users/")
                .orderByChild("email").equalTo(this.state.email).once("value")
                .then((snapshot) => {
                  let userInfo = snapshot.val();
                  for (let attributes in userInfo) {
                    role = userInfo[attributes].role
                  }
                  if (role === "Admin") {
                    this.props.navigation.navigate("Admin",{
                      role:role
                    })
                  } else {
                    this.props.navigation.navigate("Home",{
                      role:role
                    })
                  }
                })
          }
          else{
            FirebaseConfig.auth().currentUser.sendEmailVerification().then(r => {
              alert("Your email address is not verified yet, Please check your email and verify first")
            });
          }
        })
        .catch((error)=>{
          alert("Your Email or Password is wrong.")
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
                  caretHidden
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

              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.validateForm()}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.forgotBtn]}
                onPress={() =>
                  this.props.navigation.navigate("ForgotPassword")
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
  forgotBtn:{
  backgroundColor:'red'
  }
})
