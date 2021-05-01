import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedMultistep from "../lib";

import Step1 from "../components/step1";
import Step2 from "../components/step2";
import Step3 from "../components/step3";
import Step4 from "../components/step4";
import Step5 from "../components/step5";
import Step6 from "../components/step6";
import Step7 from "../components/step7";
import Step8 from "../components/step8";
import Step9 from "../components/step9";
import Step10 from "../components/step10";
import Step11 from "../components/step11";
import Step12 from "../components/step12";

const allSteps = [
    { name: "step 1", component: Step1 },
    { name: "step 2", component: Step2 },
    { name: "step 3", component: Step3 },
    { name: "step 4", component: Step4 },
    { name: "step 5", component: Step5 },
    { name: "step 6", component: Step6 },
    { name: "step 7", component: Step7 },
    { name: "step 8", component: Step8 },
    { name: "step 9", component: Step9 },
    { name: "step 10", component: Step10 },
    { name: "step 11", component: Step11 },
    { name: "step 12", component: Step12 }
];

export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "tansparent" }}>
                <View style={styles.upperContainer}>
                    <Text style={styles.loginText}>Register</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <AnimatedMultistep
                        steps={allSteps}
                        onFinish={this.finish}
                        animate={true}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    upperContainer: {
        alignItems:'center'
    },
    loginText: {
        fontSize: 28,
        color: "#5a5050"
    },
    lowerContainer: {
        flex: 2
    }
});
