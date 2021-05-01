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
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import Firebase from "../components/config"


export default class MapDataUpload extends Component{
    state = {category:"",  title:"",phoneNumber:"",address:"",website:"",happyHour:"",drinkMenu:"",foodMenu:"",latitude:"",longitude:""};

    render(){
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <KeyboardAvoidingView>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Title of Bar"
                            keyboardType="default"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(title) => this.setState({ title })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Phone Number"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Address"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(address) => this.setState({ address })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Website"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(website) => this.setState({ website })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Hour for happy hour"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(happyHour) => this.setState({ happyHour })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Happy hour drink menu"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(drinkMenu) => this.setState({ drinkMenu })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Happy hour food menu"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(foodMenu) => this.setState({ foodMenu })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Longitude"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(longitude) => this.setState({ longitude })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="latitude"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(latitude) => this.setState({ latitude })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Category"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={(category) => this.setState({ category })}
                        />
                    </View>

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.savePlaces()}
                    >
                        <Text style={styles.loginText}>Save</Text>
                    </TouchableHighlight>

                </KeyboardAvoidingView>
            </ScrollView>
        )
    }

    savePlaces() {
        Firebase.database()
            .ref('/places/')
            .push({
                title: this.state.title,
                phoneNumber:this.state.phoneNumber,
                website:this.state.website,
                longitude:this.state.longitude,
                latitude:this.state.latitude,
                address:this.state.address,
                happyHour:this.state.happyHour,
                foodMenu:this.state.foodMenu,
                drinkMenu:this.state.drinkMenu,
                category:this.state.category
            })
            .then(() => alert("Data Saved successfully."),
            this.props.navigation.navigate("Home")
            );
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
