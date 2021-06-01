import React, {useEffect,useState} from 'react'
import {Text, View, Button, Image, StyleSheet, TouchableHighlight, ImageBackground} from 'react-native'

export default function Welcome({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={{display:"flex", alignItems : "center", justifyContent : "center"}}>
            <Image
                style={{
                    resizeMode:"contain",
                    width : 210,
                    height:210,
                }}
                source={require('../images/bartender.png')} />

            <Image
                style={{
                    resizeMode:"contain",
                    width : 313,
                    marginTop: -30,
                }}
                source={require('../assets/logo3.png')} />
            </View>
            
            <Text style={styles.exclusive}>Register for exclusive, personalized food, drink,beer and restaurant places in St. Petersburg</Text>

            <View>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton, styles.buttonTransparent]}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.registerText}>Register</Text>
                </TouchableHighlight>

            </View>
        </View>
    )
}
const styles =StyleSheet.create({
container:{
    flex:1,
    display:'flex',
    justifyContent:'center',
    backgroundColor : "#6DD5D5",
    // alignItems:"center",
    // alignItems: "center",
    // justifyContent: "center",
    // // alignContent: "center",
    width:"auto",
},

    exclusive:{
    fontWeight:'bold',
    fontSize:21,
    marginTop : -20,
    marginBottom : 50,
    color : "#323232",
    textAlign : "center",
    width:300,
    marginLeft:"auto",
    marginRight : "auto",
    lineHeight : 31, 
    },


    buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 350,
        borderRadius: 30,
        paddingVertical:25,
        marginLeft : "auto",
        marginRight : "auto",
        fontWeight : "bold",
        borderWidth:3,
        borderColor : "#323232",
      },
      loginButton: {
        backgroundColor: "#323232",
      },
      loginText: {
        color: "#fff",
        fontWeight : 'bold',
        fontSize : 18,
    },
    registerText:{
        color :"#323232",
        fontWeight : 'bold',
        fontSize : 18,
    },
    buttonTransparent:{
        backgroundColor:"transparent",
        borderWidth : 3,
        borderColor : "#323232",
    },

})
