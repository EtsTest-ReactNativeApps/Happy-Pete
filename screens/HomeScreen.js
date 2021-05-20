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
import { Fontisto } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import { Avatar, ListItem, SearchBar, Icon } from 'react-native-elements';
import FeaturedMap from "./FeaturedMap";
import Firebase from "../components/config";
import DrinkScreen from "./DrinkScreen";
import * as geolib from "geolib";


export default class HomeScreen extends Component {
    state = {
        search: '',
        drinkData: '',
        barLists: [],
        bar: [],
        AllBarList: [],
        role: this.props.navigation.getParam("role"),
        isNearestPlace:false
    };

    async componentDidMount() {
        const { navigation } = this.props;
        this.fetchAllDetails()
        this.getNearestPlace()
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
                <TouchableHighlight underlayColor="none" onPress={() => this.goToBarDetails(item)}>
                    <Image style={styles.learnMoreIcon} source={require("../assets/icons/all_places/next.png")} />
                </TouchableHighlight>
            </View>

        </View>


    )

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.buttonSection}>

                    <TouchableHighlight
                        underlayColor=""
                        // style={[styles.buttonContainer, styles.clickButton]}
                        onPress={() => this.fetchRestaurant()}
                    >
                        <View style={styles.buttonContainer} onPress={() => this.fetchRestaurant()} >
                            <View style={styles.buttonImageContainer}>
                                <Image style={styles.buttonImage} source={require("../assets/icons/homescreen/wine.png")} />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.clickText}>Wine</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor=""
                        // style={[styles.buttonContainer, styles.clickButton]}
                        onPress={() => this.fetchDrink()}
                    >
                        <View style={styles.buttonContainer} onPress={() => this.fetchRestaurant()} >
                            <View style={styles.buttonImageContainer}>
                                <Image style={styles.buttonImage} source={require("../assets/icons/homescreen/cocktail.png")} />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.clickText}>Cocktail</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor=""
                        // style={[styles.buttonContainer, styles.clickButton]}
                        onPress={() => this.fetchFood()}
                    >
                        <View style={styles.buttonContainer} onPress={() => this.fetchRestaurant()} >
                            <View style={styles.buttonImageContainer}>
                                <Image style={styles.buttonImage} source={require("../assets/icons/homescreen/food.png")} />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.clickText}>Food</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor=""
                        // style={[styles.buttonContainer, styles.clickButton]}
                        onPress={() => this.fetchBeer()}
                    >
                        <View style={styles.buttonContainer} onPress={() => this.fetchRestaurant()} >
                            <View style={styles.buttonImageContainer}>
                                <Image style={styles.buttonImage} source={require("../assets/icons/homescreen/beer.png")} />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.clickText}>Beer</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>

                {/* end of button section */}

                <View style={styles.featuredContainer}>
                    <Text style={styles.featuredText}>Featured Places</Text>
                </View>

                {/* end of featured */}

                <View style={styles.mapView}>
                    <FeaturedMap children={this.state.barLists} />
                </View>
                {this.state.isNearestPlace === true  ?
                    <ScrollView >
                        <View style={styles.featuredContainer}>
                            <Text style={styles.featuredText}>Best places near you</Text>
                        </View>

                        <FlatList
                            data={this.state.bar}
                            keyExtractor={(a, b) => b.toString()}
                            renderItem={(item) => this.renderItem(item)}
                        />

                    <TouchableHighlight
                            style={styles.viewAll}
                            onPress={() => this.gotoAllPlace()}
                        >
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableHighlight>
                    </ScrollView>
                    :
                    <View><Text style={styles.noplaces}>No nearest places or Bar found for your location</Text>
                        <TouchableHighlight
                            style={styles.viewAll}
                            onPress={() => {
                                this.gotoAllPlace()
                            }}
                        >
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableHighlight>
                    </View>
                }
            </ScrollView>

        )
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
    update = async () => {
        this.setState({
            updateAlert: false,

        })
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();


    }

    fetchRestaurant() {
        let resData = []
        Firebase.database().ref("/places").orderByChild('category').equalTo('Restaurant')
            .once("value").then(snapshot => {
                snapshot.forEach((child) => {
                    resData.push({
                        title: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        website: child.val().website,
                        longitude: child.val().longitude,
                        latitude: child.val().latitude,
                        phoneNumber: child.val().phoneNumber,
                        foodMenu: child.val().foodMenu,
                        drinkMenu: child.val().drinkMenu,
                        happyHour: child.val().happyHour,
                        category: child.val().category
                    })
                })
                this.props.navigation.navigate("CategoryList", {
                    data: resData
                })
            })
    }
    fetchDrink() {
        let drinkData = []
        Firebase.database().ref("/places").orderByChild('category').equalTo('Cocktails')
            .once("value").then(snapshot => {
                snapshot.forEach((child) => {
                    drinkData.push({
                        title: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        website: child.val().website,
                        longitude: child.val().longitude,
                        latitude: child.val().latitude,
                        phoneNumber: child.val().phoneNumber,
                        foodMenu: child.val().foodMenu,
                        drinkMenu: child.val().drinkMenu,
                        happyHour: child.val().happyHour,
                        category: child.val().category
                    })
                })
                this.props.navigation.navigate("CategoryList", {
                    data: drinkData
                })
            })
    }

    fetchFood() {
        let foodData = []
        Firebase.database().ref("/places").orderByChild('category').equalTo('Food')
            .once("value").then(snapshot => {
                snapshot.forEach((child) => {
                    foodData.push({
                        title: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        category: child.val().category,
                        website: child.val().website,
                        longitude: child.val().longitude,
                        latitude: child.val().latitude,
                        phoneNumber: child.val().phoneNumber,
                        foodMenu: child.val().foodMenu,
                        drinkMenu: child.val().drinkMenu,
                        happyHour: child.val().happyHour
                    })
                })
                this.props.navigation.navigate("CategoryList", {
                    data: foodData
                })


            })
    }

    fetchBeer() {
        let beerData = []
        Firebase.database().ref("/places").orderByChild('category').equalTo('Beer')
            .once("value").then(snapshot => {
                snapshot.forEach((child) => {
                    beerData.push({
                        title: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        website: child.val().website,
                        longitude: child.val().longitude,
                        latitude: child.val().latitude,
                        phoneNumber: child.val().phoneNumber,
                        foodMenu: child.val().foodMenu,
                        drinkMenu: child.val().drinkMenu,
                        happyHour: child.val().happyHour,
                        category: child.val().category
                    })
                })
                this.props.navigation.navigate("CategoryList", {
                    data: beerData
                })

            })
    }


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

    fetchAllDetails() {
        let bar = []
        Firebase.database().ref("/places")
            .once("value").then(snapshot => {
                snapshot.forEach((child) => {
                    bar.push({
                        name: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        website: child.val().website,
                        longitude: child.val().longitude,
                        latitude: child.val().latitude,
                        phoneNumber: child.val().phoneNumber,
                        foodMenu: child.val().foodMenu,
                        drinkMenu: child.val().drinkMenu,
                        happyHour: child.val().happyHour
                    })
                    this.getNearestPlace(bar)
                })
            })
    }

    getNearestPlace(barList) {
        navigator.geolocation = require('@react-native-community/geolocation');
        navigator.geolocation.getCurrentPosition(
            position => {
                let bar = []
                for (let i in barList) {
                    let dis = geolib.getDistance(position.coords, {
                        latitude: barList[i].latitude,
                        longitude: barList[i].longitude,
                    })
                    let disKM = dis / 1000;

                    if (disKM < 50) {
                        bar.push({
                            name: barList[i].name,
                            // avatar_url:list[i].avatar_url,
                            website: barList[i].website,
                            longitude: barList[i].longitude,
                            latitude: barList[i].latitude,
                            phoneNumber: barList[i].phoneNumber,
                            address: barList[i].address,
                            drinkMenu: barList[i].drinkMenu,
                            foodMenu: barList[i].foodMenu,
                            happyHour: barList[i].happyHour
                        })
                        this.setState({
                            isNearestPlace:true
                        })
                    }
                }
                this.setState({
                    bar: bar
                });

            },
            error => {
                Alert.alert(error.message.toString());
            },

        );

    }

    gotoAllPlace() {
        let bar = []
        Firebase.database().ref("/places")
            .once("value").then(snapshot => {
                snapshot.forEach((child) => {
                    bar.push({
                        name: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        website: child.val().website,
                        longitude: child.val().longitude,
                        latitude: child.val().latitude,
                        phoneNumber: child.val().phoneNumber,
                        foodMenu: child.val().foodMenu,
                        drinkMenu: child.val().drinkMenu,
                        happyHour: child.val().happyHour
                    })
                    this.props.navigation.navigate("AllPlaces", {
                        barList: bar
                    })
                    this.setState({
                        AllBarList: bar
                    })
                })

            })
    }
}

const styles = StyleSheet.create({
    buttonSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginVertical: 20,
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonImageContainer: {
        width: 75,
        height: 75,
        backgroundColor: "#F7F082",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    buttonImage: {
        width: "50%",
        height: "50%",
        resizeMode: "contain",
    },
    buttonText: {
        marginTop: 10,
    },
    clickText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    featuredContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    featuredText: {
        fontSize: 21,
        marginLeft: 20,
        color: "#000",
        fontWeight: "bold"
    },

    mapcontainer: {
        ...StyleSheet.absoluteFillObject,

    },
    map: {
        display: 'none',
        ...StyleSheet.absoluteFillObject,
    },

    mapView: {
        paddingHorizontal:50,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },

    mapText: {
        fontWeight: 'bold',
        fontSize: 21,
        color: 'black',
        marginLeft: "5%",
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
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
    viewAll: {
        color: '#fff',
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        backgroundColor: "#000",
        height: 45,
        // width: wp(90),
        borderRadius: 30,
        paddingVertical: 25,
        marginBottom: 50,
        marginHorizontal:15,
    },
    viewAllText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    listItem: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 10,

        // shadowColor: "#fff",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
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



})
