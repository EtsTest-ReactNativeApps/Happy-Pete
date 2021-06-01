
import React, { Component } from "react";
import Home from "./screens/HomeScreen";

import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
} from "react-native";
import FirebaseConfig from "./components/config";

class AdminSideMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedin:false,
            logout:'Login'
        }
    }
    componentDidMount() {
        const{navigation}=this.props
        FirebaseConfig.auth().onAuthStateChanged((user)=>{
            if(user){

                this.setState({
                    loggedin:true,
                    logout:'Logout'
                })
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                    <View style={styles.userInfo}>
                        <Text style={styles.userInfoName}>Varun Krishnan</Text>
                        <Text style={styles.userInfoMail}>varunkrishnan0001@gmail.com</Text>
                    </View>

                    <View style={styles.navItems}>
                        
                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/home.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Home</Text>
                            </View>
                        </View>

                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/wine.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Wine</Text>
                            </View>
                        </View>

                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/cocktail.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Cocktail</Text>
                            </View>
                        </View>

                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/food.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Food</Text>
                            </View>
                        </View>

                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/beer.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Beer</Text>
                            </View>
                        </View>

                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/logout.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Logout</Text>
                            </View>
                        </View>



                    </View>


                    
                </ScrollView>
                <View style={styles.footerContainer}></View>
            </View>

        );
    }

    onLogout=()=> {

            FirebaseConfig.auth().signOut().then(r => alert("Log out successfully."),
            this.props.navigation.navigate("Landing")
            )

    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1,
        width: "100%"
    },
    userInfo:{
        backgroundColor:"#DFFFFF",
        padding : 25,
        paddingVertical:30,
    },
    userInfoName:{
        color:"#008080",
        fontWeight:"bold",
        fontSize : 24,
    },
    userInfoMail:{
        color:"#000",
        fontSize:14,
        marginTop:5,
        // fontWeight:"bold",
    },
    navItems:{
    },
    navItem:{
        display:"flex",
        flexDirection:"row",
        // backgroundColor:"orange",
        alignItems:"center",
        padding : 20,

    },
    navItemImage : {
        width:30,
        height:30,
        resizeMode:"contain",
    },
    navItemText :{
        fontSize :18,
        color:"#333333",
        fontWeight:"bold",
        marginLeft:25,
    }





});

export default AdminSideMenu;
