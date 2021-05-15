import React, {useEffect,useState} from 'react'
import {Text, View, Button, Image, StyleSheet, TouchableHighlight} from 'react-native'

export default function Welcome({ navigation }) {

    return (
        <View style={styles.container}>
            {/*<Image
                style={{
                    width:'80%',
                    height:"20%",
                    marginLeft:'11%',
                    borderRadius:35
                }}
                source={require('../images/undraw_welcome_cats_thqn.png')}/>*/}
            <View>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.loginText}>Register</Text>
                </TouchableHighlight>
            </View>
            <Text style={styles.exclusive}>Register for exclusive, personalized food, drink,beer and restaurant places in St. Petersburg</Text>
        </View>
    )
}
const styles =StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#ffffed',
    display:'flex',
    justifyContent:'center'
},
    btnReg:{
    marginBottom:'10%'
    },
    welcome:{
        fontWeight:'700',
        fontSize: 28,
        marginTop :'3%',
        marginLeft:'18%'
    },
    exclusive:{
    fontWeight:'700',
    fontSize:28,
    marginLeft:'10%',
    marginTop:'2%'
    },
    buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        width: 250,
        borderRadius: 30,
        marginLeft:'18%',
        marginTop:8
    },
    loginButton: {
        backgroundColor: "red",
    },
    loginText: {
        color: "white",
    },

})
