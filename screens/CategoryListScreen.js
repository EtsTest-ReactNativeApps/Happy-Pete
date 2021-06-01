import React, { Component } from        "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Button,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    ImageBackground,
    FlatList,
    Dimensions,
    Alert,
} from "react-native";
import {ListItem} from "react-native-elements";

export default class CategoryList extends Component{
    constructor(props) {
        super(props);

        this.state={
            list:this.props.navigation.getParam("data")
        }
    }
    goToBarDetails(item) {
        let listDetails = item;
        this.props.navigation.navigate("BarDetailsScreen", {
            name: listDetails.name,
            avatar_url:listDetails.avatar_url,
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

    renderItem = ({ item }) => (


        <View style={styles.listItem}>

            {/* image */}
            <View style={styles.listImageContainer}>

                <Image
                    style={styles.listImage}
                    source={{uri:item.avatar_url}} />
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
                <TouchableHighlight underlayColor="none" onPress={()=>this.goToBarDetails(item)}>
                    <Image style={styles.learnMoreIcon} source={require("../assets/icons/all_places/next.png")} />
                </TouchableHighlight>
            </View>

        </View>

    )

    render() {
        const {navigation}=this.props;
        let list = navigation.getParam("data")
        return(
            <View>
                <FlatList data={list}
                          keyExtractor={(a, b) => b.toString()}
                          renderItem={(item) => this.renderItem(item)}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    ListItem:{
        backgroundColor : "purple",
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
});
