import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ScrollView,
    TextInput,
} from "react-native";
import Firebase from "../components/config"
export default class MapDataUpload extends Component{
    state = {title:'',blogs:'',userName:'',email:''}

    render(){
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Your Name"
                            keyboardType="default"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(userName) => this.setState({ userName })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
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

                        <TextInput
                            style={styles.inputs}
                            placeholder="Title/Heading"
                            keyboardType="default"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(title) => this.setState({ title })}
                        />
                    </View>

                    <View style={styles.inputContainerBlog}>

                        <TextInput
                            style={styles.inputs}
                            placeholder="Blogs/Description"
                            keyboardType="default"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(blogs) => this.setState({ blogs })}
                        />
                    </View>

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.savePlaces()}
                    >
                        <Text style={styles.loginText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }

    savePlaces() {

        Firebase.database()
            .ref('/blogs/')
            .push({
                title: this.state.title,
                description:this.state.blogs,
                userName:this.state.userName,
                email:this.state.email
            })
            .then(() => alert("Data Saved successfully."),

            );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",

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
    inputContainerBlog: {
        borderBottomColor: "#fff8dc",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 200,

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
    forgotButton: {
        marginRight: 40,
        fontWeight: "900",
        color: "#00ffff",
        fontSize: 17,
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
