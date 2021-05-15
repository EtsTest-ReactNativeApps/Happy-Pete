import React, { Component } from "react";
import {
    createAppContainer,
} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer"
import {createStackNavigator} from "react-navigation-stack";
import {
    Text,
    View,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    Dimensions,
    Button,
} from "react-native";
import HomeScreen from "../screens/HomeScreen";

import SideMenu from "../sidemenu";
import FeaturedMap from "../screens/FeaturedMap";
import MapDataUpload from "../screens/MapDataUpload";
import DrinkScreen from "../screens/DrinkScreen";
import BarDetailsScreen from "../screens/BarDetailsScreen";
import BarMapScreen from "../screens/BarMapScreen";
import Welcome from "../screens/LandingScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import FirebaseConfig from "../components/config";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
class NavigationDrawerStructure extends Component {

    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };


    render() {

        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                        source={require("../images/drawer.png")}
                        style={{ width: 25, height: 25, marginLeft: 6 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const FirstActivity_StackNavigator = createStackNavigator({

    Welcome: {
        screen: Welcome,
        navigationOptions: ({ navigation }) => ({
            headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
            headerLeft: null,
            headerStyle: {
                backgroundColor: "#fff",
            },
            headerTintColor: "#fff",
        }),
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: "#fff",
            },
            headerTintColor: "#fff",

        }),
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: ({ navigation }) => ({
            headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: "#fff",
            },
            headerTintColor: "#fff",

        }),
    }

});


const Drawer = createDrawerNavigator(
    {
        //Drawer Optons and indexing
        NavScreen1: { screen: FirstActivity_StackNavigator },

    },
    {
        contentComponent: SideMenu,
        drawerPosition: "right",
        drawerWidth: Dimensions.get("window").width - 120,
    }
);

export default createAppContainer(Drawer);
const styles = StyleSheet.create({
    headerRight:{
        marginRight:30,
        fontWeight:'bold',
        fontSize:25,
        color:'red'
    }
})
