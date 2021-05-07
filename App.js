
import React, {Component, useEffect, useState} from "react";
import MainNavigator from "./navigation/MainNavigator";
import FirebaseConfig from "./components/config";
import LandingNavigator from "./navigation/LandingNavigator";
import * as Updates from "expo-updates";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedin:false
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
        this.updateAsync();
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();

                await Updates.reloadAsync();
            }
        } catch (e) {
            // handle or log error
        }
        FirebaseConfig.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loggedin: false
                });
            } else {
                this.setState({
                    loggedin: true
                })
            }

        })
    }
    render() {
        const{loggedin}=this.state
        if(!loggedin){
            <LandingNavigator/>
        }
        return (
            <MainNavigator/>
        );
    }
}
