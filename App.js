
import React, {Component, useEffect, useState} from "react";
import MainNavigator from "./navigation/MainNavigator";

import * as Updates from "expo-updates";
import { NavigationContainer } from '@react-navigation/native';
import createStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import FirebaseConfig from "./components/config";
import LandingScreen from "./screens/LandingScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
const Stack = createStackNavigator();
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            loaded:false,
            loggedIn:false
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
        this.getCurrentUser()
        this.updateAsync();
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
    if(!loggedIn){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegistrationScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            )
    }
        return (
            <MainNavigator/>
        );
    }

    getCurrentUser() {
        FirebaseConfig.auth().onAuthStateChanged((user) => {
            console.log(user)
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
