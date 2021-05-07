
import React, { Component } from "react";
import Home from "./screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";

import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from "react-native";
import FirebaseConfig from "./components/config";
class SideMenu extends Component {
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
        const{loggedin}=this.state;
        if(!loggedin){
           return (
               <View style={styles.container}>
                   <ScrollView>
                       <TouchableHighlight style={[styles.buttonContainerHome]}>
                           <Text style={styles.kecText}>
                               Happy St. Pete
                           </Text>
                       </TouchableHighlight>
                       <View style={styles.fixIcon}>
                           <Ionicons name="md-home" size={25} />
                           <TouchableHighlight
                               style={[styles.buttonContainerText]}
                               onPress={() => this.props.navigation.navigate("Landing")}
                           >
                               <Text style={styles.clickText}>Home</Text>
                           </TouchableHighlight>
                       </View>
                       <View style={styles.fixIcon}>
                           <Ionicons name="md-notifications" size={25} />
                           <TouchableHighlight
                               style={[styles.buttonContainerText]}
                               onPress={() => this.props.navigation.navigate("HappyHour")}
                           >
                               <Text style={styles.clickText}>Happy Hour</Text>
                           </TouchableHighlight>
                       </View>
                       <View style={styles.fixIcon}>
                           <Ionicons name="md-people" size={25} />
                           <TouchableHighlight
                               style={[styles.buttonContainerText]}
                               onPress={() => this.props.navigation.navigate("HappyBlog")}
                           >
                               <Text style={styles.clickText}>Happy Blog</Text>
                           </TouchableHighlight>
                       </View>
                       <View style={styles.fixIcon}>
                           <Ionicons name="md-people" size={25} />
                           <TouchableHighlight
                               style={[styles.buttonContainerText]}
                               onPress={() => this.props.navigation.navigate("Login")}
                           >
                               <Text style={styles.clickText}>Login</Text>
                           </TouchableHighlight>
                       </View>
                       <View style={styles.fixIcon}>
                           <Ionicons name="md-heart" size={25} />
                           <TouchableHighlight
                               style={[styles.buttonContainerText]}
                               onPress={() => this.props.navigation.navigate("AboutApp")}
                           >
                               <Text style={styles.clickText}>Contact Us</Text>
                           </TouchableHighlight>
                       </View>
                   </ScrollView>
                   <View style={styles.footerContainer}/>
               </View>
           )
        }
        return (
                <View style={styles.container}>
                    <ScrollView>
                        <TouchableHighlight style={[styles.buttonContainerHome]}>
                            <Text style={styles.kecText}>
                                Happy St. Pete
                            </Text>
                        </TouchableHighlight>
                        <View style={styles.fixIcon}>
                            <Ionicons name="md-home" size={25} />
                            <TouchableHighlight
                                style={[styles.buttonContainerText]}
                                onPress={() => this.props.navigation.navigate("Home")}
                            >
                                <Text style={styles.clickText}>Home</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.fixIcon}>
                            <Ionicons name="md-notifications" size={25} />
                            <TouchableHighlight
                                style={[styles.buttonContainerText]}
                                onPress={() => this.props.navigation.navigate("RcvNotification")}
                            >
                                <Text style={styles.clickText}>Happy Hour</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.fixIcon}>
                            <Ionicons name="md-people" size={25} />
                            <TouchableHighlight
                                style={[styles.buttonContainerText]}
                                onPress={() => this.props.navigation.navigate("Developers")}
                            >
                                <Text style={styles.clickText}>Happy Blog</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.fixIcon}>
                            <Ionicons name="md-heart" size={25} />
                            <TouchableHighlight
                                style={[styles.buttonContainerText]}
                                onPress={() => this.props.navigation.navigate("AboutApp")}
                            >
                                <Text style={styles.clickText}>Contact Us</Text>
                            </TouchableHighlight>
                        </View>


                    </ScrollView>
                    <View style={styles.footerContainer}></View>
                </View>

        );
    }

    onLogout() {
        FirebaseConfig.auth().signOut().then(()=>{
            this.setState({
                logout:'Logout'
            })
            this.props.navigation.navigate("Landing")
        });

    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1,
        width: "100%"
    },
    secondaryHeading: {
        padding: 5,
        fontWeight: "800",
        fontSize: 30,
        backgroundColor: "#fff"
    },
    mainHeading: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: "lightgrey"
    },
    buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 10,
        width: 175,
        borderRadius: 30
    },
    logoutButton: {
        backgroundColor: "#00b5ec"
    },
    logoutText: {
        color: "white"
    },
    clickText: {
        color: "black",

        fontSize: 18
    },
    kecText: {
        color: "white",
        fontWeight: "800",
        fontSize: 20
    },
    buttonContainerText: {
        height: 45,
        flexDirection: "row",
        width: 150,
        borderRadius: 20,
        marginTop: 2,
        marginLeft: "5%"
    },
    buttonContainerHome: {
        height: 85,
        flexDirection: "row",
        width: 250,
        marginTop: "1%",
        borderRadius: 20,
        marginLeft: "5%"
    },
    fixIcon: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    footerContainer: {}
});

export default SideMenu;
