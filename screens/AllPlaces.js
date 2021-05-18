import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Button,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    ImageBackground, FlatList, Dimensions, Alert,
} from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default class AllPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barLists: this.props.navigation.getParam("barList"),
            role: this.props.navigation.getParam("role")
        };
        console.log(this.props.navigation.getParam("barList"))
    }



    render() {
        return (
            <ScrollView contentContainerStyle={<styles className="container"></styles>}>
                    { this.state.barLists &&
                                <FlatList
                                    data={this.state.barLists}
                                    keyExtractor={(a, b) => b.toString()}
                                    renderItem={(item) => this.renderItem(item)}

                                />
                            }
            </ScrollView>

        )
    }
     renderItem = ({ item }) => (


        <View style={styles.listItem}>

            {/* image */}
            <View style={styles.listImageContainer}>
                <Image
                    style={styles.listImage}
                    source={require("../images/hotel.jpg")} />
            </View>

            {/* hotelDetails */}
            <View style={styles.hotelInfoAndWebsite}>

                <View style={styles.nameAndRating}>
                    <Text style={styles.hotelName}>{item.name}</Text>
                    <View style={styles.Rating}>
                        <Image style={styles.RatingStar} source={require("../assets/icons/hotel_details/starRating.png")} />
                        {/*<Text style={styles.RatingValue}>4.3</Text>*/}
                    </View>
                </View>

                <Text style={styles.hotelAddress}>{item.address}</Text>
            </View>

            {/* learn */}

            <View style={styles.learnMore}>
                <TouchableHighlight onPress={()=>this.goToBarDetails(item)}>
                    <Image style={styles.learnMoreIcon} source={require("../assets/icons/all_places/next.png")} />
                </TouchableHighlight>
            </View>

        </View>

    )
    goToBarDetails(item) {

        let listDetails = item;
        this.props.navigation.navigate("BarDetailsScreen", {
            name: listDetails.name,
            // avatar_url:list[i].avatar_url,
            website: listDetails.website,
            longitude: listDetails.longitude,
            latitude: listDetails.latitude,
            phoneNumber: listDetails.phoneNumber,
            address: listDetails.address,
            drinkMenu: listDetails.drinkMenu,
            foodMenu: listDetails.foodMenu,
            happyHour: listDetails.happyHour
        })
    }


}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
    },
    listItem: {
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#bababa",

        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
    },
    listImageContainer: {
        borderRadius: 50,
        flexBasis: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    listImage: {
        width: 60,
        height: 60,
        resizeMode: "cover",
        borderRadius: 50,
    },
    hotelInfoAndWebsite: {
        flex: 1,
    },
    nameAndRating: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
    hotelName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    Rating: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
    },
    RatingStar: {
        width: 15,
        height: 20,
        resizeMode: "contain",
    },
    RatingValue: {
        color: "black",
        fontWeight: "bold",
        marginLeft: 5
    },
    hotelAddress: {
        fontSize: 14,
        width: "85%",
        lineHeight: 20,
        marginVertical: 5,
        color: "#3A3A3A",
    },
    learnMore: {
        width: 40,
    },
    learnMoreIcon: {
        width: 25,
        height: 25,

    },

    fixTotext: {
        justifyContent: "space-between",
        flexDirection: "row",
    },

    bestText: {
        marginTop: "5%",
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: '5%'
    },
    randomText: {
        marginLeft: '5%',
        marginRight: '10%'
    },
    readMore: {
        color: 'red',
        fontWeight: '500',
        marginLeft: '10%'

    },
    fixImg: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
        width: 300,
        textAlign: "center",
        marginLeft: 15

    },
    btn: {
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 30,
        backgroundColor: "red",
        height: 30,
        width: "75%",
        alignContent: "center"
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    },
    locationTxt: {

    },
    mapcontainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        display: 'none',
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 300,
    },
    cardsText: {
        fontSize: 22,
    },
    Home: {
        justifyContent: "center",
        alignContent: "center",
        marginTop: "5%"
    },
    separator: {
        marginVertical: "3%",
        borderBottomColor: "#737373",

    },
    paragraph: {
        margin: 1.5,
        textAlign: "center",
        fontWeight: "700",
        paddingLeft: 12,
        color: "#008b8b",
        marginTop: "5%"
    },
    welcomeUser: {
        textAlign: "center",
        fontSize: 18,
        paddingTop: 30,
        fontWeight: "600",
        color: "#09C5F7"
    },
    buttonContainer: {
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
        width: wp('43%'),
        borderRadius: 15,
        marginRight: 15,
        marginLeft: "2%"
    },
    clickButton: {
        backgroundColor: "#09C5F7"
    },
    clickText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800"
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
        width: 300,
        textAlign: "center",
        marginLeft: 15
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },
    foodImage: {
        height: 165,
        width: 220
    },
    mapView: {
        marginRight: '15%'
    },
    mapText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'red',
        marginLeft: '35%'
    },
    fav: {
        marginRight: "20%",
    },
    fixMargin: {
        marginBottom: "12%"
    },
    cardStyle: {
        borderRadius: 25
    },
    noplaces: {
        marginTop: '3%',
        color: 'red',
        fontSize: 22,
        fontWeight: '500'
    }


})
