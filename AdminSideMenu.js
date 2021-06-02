
import React, { Component } from "react";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
} from "react-native";
import FirebaseConfig from "./components/config";
import {bindActionCreators} from "redux";
import {clearData, fetchUser} from "./redux/actions";
import {connect} from "react-redux";
import Firebase from "./components/config";

class AdminSideMenu extends Component {
        state={
            name:null,
            email:null
    }
    componentDidMount() {
        const { navigation } = this.props;
            this.focusListener=navigation.addListener("didFocus",()=>{
                this.props.fetchUser()
            })
    }
    componentWillUnmount() {
            this.focusListener.remove()
    }
    fetchWine(key) {
        let wineData = []
        Firebase.database().ref("/places").orderByChild('category').equalTo(key)
            .once("value").then(snapshot => {
            snapshot.forEach((child) => {
                wineData.push({
                    name: child.val().name,
                    address: child.val().address,
                    key: child.key,
                    website: child.val().website,
                    longitude: child.val().longitude,
                    latitude: child.val().latitude,
                    phoneNumber: child.val().phoneNumber,
                    foodMenu: child.val().foodMenu,
                    drinkMenu: child.val().drinkMenu,
                    happyHour: child.val().happyHour,
                    category: child.val().category,
                    avatar_url:child.val().avatar_url
                })

            })
            this.props.navigation.navigate("CategoryList", {
                data: wineData
            })
            console.log("Data"+wineData)
        })
    }

    render() {
        let wine ="Restaurant"
        let cocktail="Cocktails"
        let food ="Food"
        let beer ="Beer"
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.props.currentUser &&
                    <View style={styles.userInfo}>
                        <Text style={styles.userInfoName}>{this.props.currentUser.name}</Text>
                        <Text style={styles.userInfoMail}>{this.props.currentUser.email}</Text>
                    </View>
                    }

                    <View style={styles.navItems}>
                        <TouchableHighlight underlayColor={'#E0E2E1'} onPress={()=>this.props.navigation.navigate("Home")}>
                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/home.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Home</Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'#E0E2E1'} onPress={()=>this.fetchWine(wine)}>
                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/wine.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Wine</Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'#E0E2E1'} onPress={()=>this.fetchWine(cocktail)}>
                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/cocktail.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Cocktail</Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'#E0E2E1'} onPress={()=>this.fetchWine(food)}>
                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/food.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Food</Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'#E0E2E1'} onPress={()=>this.fetchWine(beer)}>
                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/beer.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Beer</Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'#E0E2E1'} onPress={()=>this.onLogout()}>
                        <View style={styles.navItem}>
                            <View style={styles.navItemImageContainer}>
                                <Image style={styles.navItemImage} source={require("./assets/icons/sidebar/logout.png")} />
                            </View>
                            <View style={styles.navItemTextContainer}>
                                <Text style={styles.navItemText}>Logout</Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}></View>
            </View>

        );
    }

    onLogout=()=> {
            this.props.clearData()
            FirebaseConfig.auth().signOut().then(r => alert("Log out successfully."),
            this.props.navigation.navigate("Landing")
            )

    }
}
const mapStateToProps=(store)=>{
    return{
        currentUser: store.userState.currentUser
    }
}

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AdminSideMenu);

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


