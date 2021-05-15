
import React, {Component, useEffect, useState} from "react";
import MainNavigator from "./navigation/MainNavigator";

import * as Updates from "expo-updates";

export default class App extends Component {
    constructor(props) {
        super(props);
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

        }

    }
    render() {

        return (
            <MainNavigator/>
        );
    }
}
