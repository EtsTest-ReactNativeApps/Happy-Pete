
import    React, { Component, useEffect, useState } from "react";
import MainNavigator from "./navigation/MainNavigator";
import {View, Text, StyleSheet, ActivityIndicator, Image} from "react-native";
import * as Updates from "expo-updates";
import { NavigationContainer } from '@react-navigation/native';
import createStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import FirebaseConfig from "./components/config";
import LandingScreen from "./screens/LandingScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import { createStore, applyMiddleware } from 'redux'
const store = createStore(rootReducer, applyMiddleware(thunk))
const Stack = createStackNavigator();
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loggedIn: false
        }
    }
    updateAsync = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                alert("A new update is available.")

            }
        } catch (e) {
            // handle or log error
        }
    }
    async componentDidMount() {
        console.disableYellowBox = true;
        this.getCurrentUser()
        await this.updateAsync();
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();

                await Updates.reloadAsync();
            }
        } catch (e) {

        }

    }
    render() {
        const { loggedIn, loaded } = this.state;
        if (!loaded) {
            return (
                <View style={styles.loadingContainer}>
                                        <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                    <Image
                        style={{
                            resizeMode:"contain",
                            width : 250,
                            marginTop: -50,
                            marginBottom : -50,
                        }}
                        source={require('./assets/logo3.png')} />

                    <Text style={styles.loadingText}>Discovering the best places for you </Text>
                </View>
            )
        }
        if (!loggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen name="Landing" component={LandingScreen}
                          options={

                              {headerShown:false
                          }}/>
                        <Stack.Screen name="Register" component={RegistrationScreen} options={{title:<View><Image source={require("./images/flagLogo.png")} style={styles.logo} /></View>,
                            headerTitleStyle:{
                                display:'flex',
                                marginLeft:'auto'
                            },

                        }}/>
                        <Stack.Screen name="Login" component={LoginScreen} options={{title :<View style={styles.logoContainer}><Image source={require("./images/flagLogo.png")} style={styles.logo} /></View>,
                            headerTitleStyle:{
                                display:'flex',
                                marginLeft:'auto'
                            },

                        }} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{title:<View><Image source={require("./images/flagLogo.png")} style={styles.logo} /></View>,
                            headerTitleStyle:{
                                display:'flex',
                                marginLeft:'auto'
                            },

                        }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }
        return (
        <Provider store={store}>
            <MainNavigator />
        </Provider>
        );
    }

    getCurrentUser() {
        FirebaseConfig.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loggedIn: false,
                    loaded: true,
                })
            } else {
                this.setState({
                    loggedIn: true,
                    loaded: true,
                })
            }
        })
    }

}

const styles = StyleSheet.create({
    loadingContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#6DD5D5",
    },
    loadingText: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 50,
        width:"80%"

    },
    container: {
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 40,
    },
    logo:{

        width:200,
        resizeMode:"contain",
        marginRight:30,
    },
    logoContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft:20
    }
})
