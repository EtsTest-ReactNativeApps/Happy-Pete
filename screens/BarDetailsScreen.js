import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Linking, Text, Image, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, FlatList, Alert, Dimensions
} from "react-native";
import * as geolib from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Collapsible from "react-native-collapsible";
import Accordion from 'react-native-collapsible/Accordion';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCDn-KsRdw9W6AKogCtyF7CsCw5Ptg6efA'

export default class BarDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: null,
            longitude: null,
            latitude: null,
            address: null,
            phoneNumber: null,
            collapsed: true,
            isDrinkcollapsed: true,
            isFoodcollapsed: true,
            destinationLatitude: null,
            destinationLongitude: null,
            origin: [{
                latitude: null,
                longitude: null
            }],
            destinationOrigin: [{
                latitude: null,
                longitude: null
            }],
            latitudeDelta: 0.100,
            longitudeDelta: 0.0121,
            active: 0,
        }

    }
    componentDidMount() {
        const { navigation } = this.props
        let data = navigation.getParam('data');
        this.setState({
            latitude: data.latitude,
            longitude: data.longitude,
            destinationOrigin: [{
                latitude: data.latitude,
                longitude: data.longitude
            }]
        })
        this.findDistance(data.longitude, data.latitude)
    }

    openDirection = () => {
        const googleMapOpenUrl = ({ latitude, longitude }) => {
            const latLng = `${latitude},${longitude}`;
            return `google.navigation:q=${latLng}`;
        }
        Linking.openURL(googleMapOpenUrl({ latitude: this.state.latitude, longitude: this.state.longitude }));

    }
    toggleExpanded = () => {
        if (this.state.collapsed === true) {
            this.setState({
                collapsed: false
            })
        }
        else {
            this.setState({
                collapsed: true
            })
        }

    };
    foodToggleExpanded = () => {
        if (this.state.isFoodcollapsed === true) {
            this.setState({
                isFoodcollapsed: false
            })
        }
        else {
            this.setState({
                isFoodcollapsed: true
            })
        }


    }
    drinkToggleExpanded = () => {
        if (this.state.isDrinkcollapsed === true) {
            this.setState({
                isDrinkcollapsed: false
            })
        }
        else {
            this.setState({
                isDrinkcollapsed: true
            })
        }

    }

    change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }
    }

    state = {
        active:0
    }

    render() {
        const { navigation } = this.props
        let data = navigation.getParam("data")
        let drinkMenu = data.drinkMenu
        const images = [
            "https://images.pexels.com/photos/340996/pexels-photo-340996.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/331107/pexels-photo-331107.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        ]
        const { width } = Dimensions.get("window")
        const height = width * 0.6
        return (
            <ScrollView>
                <View style={{ marginTop: 0, width, height }}>
                    <ScrollView
                        pagingEnabled
                        horizontal
                        onScroll = {this.change}
                        showsHorizontalScrollIndicator={false}
                        style={{ width, height }}
                    >
                        {
                            images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image }}
                                    style={{ width, height, resizeMode: 'cover' }}
                                />
                            ))
                        }
                    </ScrollView>
                    <View style={{ flexDirection: "row", position: "absolute", bottom: 0, alignSelf: "center" }}>
                        {
                            images.map((i, k) => (
                                <Text key={k} style={k == this.state.active ? styles.carousalPaginationTextActive : styles.carousalPaginationText}>⬤</Text>

                            ))
                        }
                    </View>

                </View>


                <View style={styles.container}>
                    {/* section 1 header image */}
                    {/* <View style={styles.imageContainer}>
                        <Image
                            style={styles.featureImage}
                            source={{ uri: data.avatar_url }}
                        />
                    </View> */}

                    {/* section 2 : contact details : hotelname, address, website url, phone, map */}
                    <View style={styles.hotelDetails}>

                        {/* section 2.1 name, rating  address, web url */}
                        <View style={styles.hotelInfoAndWebsite}>

                            <View style={styles.nameAndRating}>
                                <Text style={styles.hotelName}>{data.name}</Text>
                                {/* <View style={styles.Rating}>
                                    <Image style={styles.RatingStar} source={require("../assets/icons/hotel_details/starRating.png")} />
                                    <Text style={styles.RatingValue}>4.3</Text>
                                </View> */}
                            </View>

                            <View style={styles.Rating}>
                                <Image style={styles.RatingStar} source={require("../assets/icons/hotel_details/starRating.png")} />
                                <Text style={styles.RatingValue}>4.3 Happy Reviews</Text>
                            </View>

                            <Text style={styles.hotelAddress}>{data.address}</Text>
                            <TouchableHighlight underlayColor="transparent" onPress={() => { Linking.openURL(data.website) }}>
                                <Text style={styles.hotelWebsiteUrl}>{data.website}</Text>
                            </TouchableHighlight>

                        </View>



                        {/* section 2.2 call and map buttons */}
                        <View style={styles.contactButtons}>
                            <TouchableHighlight
                                underlayColor="transparent" onPress={() => { Linking.openURL('tel:' + data.phoneNumber) }}>
                                <View style={styles.callButton}>
                                    <Image style={styles.callIcon} source={require("../assets/icons/hotel_details/callIcon.png")} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                    {/*Accordion for Happy Hour*/}

                    <View style={styles.accordianContainer}>
                        <TouchableOpacity style={styles.accordian} onPress={this.toggleExpanded}>
                            <View style={styles.accordianTop}>
                                <View style={styles.accordianHeaderContainer}>
                                    <View>
                                        <Image style={styles.accordianIcon} source={require("../assets/icons/hotel_details/happyHourIcon.png")} />
                                    </View>
                                    <View>
                                        <Text style={styles.accordianHeading}>Happy Hour</Text>
                                    </View>
                                    {/*Heading of Single Collapsible*/}
                                </View>
                                <View style={styles.dropDownContainer}>
                                    <Image style={styles.dropDownIcon} source={require("../assets/icons/hotel_details/dropDownIcon.png")} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/*Content of Single Collapsible*/}
                        <Collapsible style={styles.accordiancontentContainer} collapsed={this.state.collapsed} align="center">
                            <View style={styles.accordianContent}>
                                <Text style={styles.content}>
                                    {data.happyHour}
                                </Text>
                            </View>
                        </Collapsible>
                    </View>


                    {/*Accordion for Drink Menu*/}

                    <View style={styles.accordianContainer}>
                        <TouchableOpacity style={styles.accordian} onPress={this.drinkToggleExpanded}>
                            <View style={styles.accordianTop}>
                                <View style={styles.accordianHeaderContainer}>
                                    <View>
                                        <Image style={styles.accordianIcon} source={require("../assets/icons/hotel_details/drinkMenuIcon.png")} />
                                    </View>
                                    <View>
                                        <Text style={styles.accordianHeading}>Drink Menu</Text>
                                    </View>
                                    {/*Heading of Single Collapsible*/}
                                </View>
                                <View style={styles.dropDownContainer}>
                                    <Image style={styles.dropDownIcon} source={require("../assets/icons/hotel_details/dropDownIcon.png")} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*Content of Single Collapsible*/}
                        <Collapsible style={styles.accordiancontentContainer} collapsed={this.state.isDrinkcollapsed} align="center">
                            <View style={styles.accordianContent}>


                                {/* table heading */}
                                <View style={styles.tableHeadingContainer}>
                                    <View style={styles.tableHeading1}>
                                        <Text style={styles.heading1}>Drink</Text>
                                    </View>
                                    <View style={styles.tableHeading2}>
                                        <Text style={styles.heading2}>Cost</Text>
                                    </View>
                                </View>
                                {this.drinkMenuList(drinkMenu)}
                            </View>
                        </Collapsible>
                    </View>



                    {/*Accordion for Food Menu*/}

                    <View style={styles.accordianContainer}>
                        <TouchableOpacity style={styles.accordian} onPress={this.foodToggleExpanded}>
                            <View style={styles.accordianTop}>
                                <View style={styles.accordianHeaderContainer}>
                                    <View>
                                        <Image style={styles.accordianIcon} source={require("../assets/icons/hotel_details/foodMenuIcon.png")} />
                                    </View>
                                    <View>
                                        <Text style={styles.accordianHeading}>Food Menu</Text>
                                    </View>
                                    {/*Heading of Single Collapsible*/}
                                </View>
                                <View style={styles.dropDownContainer}>
                                    <Image style={styles.dropDownIcon} source={require("../assets/icons/hotel_details/dropDownIcon.png")} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*Content of Single Collapsible*/}
                        <Collapsible style={styles.accordiancontentContainer} collapsed={this.state.isFoodcollapsed} align="center">
                            <View style={styles.accordianContent}>


                                {/* table heading */}
                                <View style={styles.tableHeadingContainer}>
                                    <View style={styles.tableHeading1}>
                                        <Text style={styles.heading1}>Food</Text>
                                    </View>
                                    <View style={styles.tableHeading2}>
                                        <Text style={styles.heading2}>Cost</Text>
                                    </View>
                                </View>

                                {/* table content */}
                                {this.foodMenuList(data.foodMenu)}

                            </View>
                        </Collapsible>
                    </View>

                    <View style={styles.mapContainerMain}>

                        <View style={styles.mapContainer}>

                            <MapView
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={{
                                    latitude: Number(this.state.latitude),
                                    longitude: Number(this.state.longitude),
                                    longitudeDelta: this.state.longitudeDelta,
                                    latitudeDelta: this.state.latitudeDelta

                                }}
                            >

                                {
                                    this.state.latitude &&
                                    <Marker
                                        coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }}
                                        title={data.name}
                                    />
                                }{this.state.origin &&
                                    <MapViewDirections
                                        origin={this.state.origin[0]}
                                        destination={this.state.destinationOrigin[0]}
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        strokeWidth={3}
                                        strokeColor="hotpink"
                                    />}
                            </MapView>
                        </View>
                    </View>

                    <TouchableNativeFeedback onPress={() => { this.openDirection() }}>
                        <Text style={styles.mapButton}>
                            <Image style={styles.mapIcon} source={require("../assets/icons/hotel_details/mapIcon.png")} />
                        </Text>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => { this.recenterLocation() }}>
                        <View style={styles.recenterContainer}>
                            <Image style={styles.recenterIcon} source={require("../assets/icons/location.png")} />
                            <Text style={styles.recenterText}>Recenter</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.distance}>
                        <Text>You are {this.state.distance} km away from {data.name} </Text>
                    </View>

                </View>

            </ScrollView>

        )
    }



    findDistance(longitude, latitude) {
        navigator.geolocation = require('@react-native-community/geolocation');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let dis = geolib.getDistance(position.coords, {
                    latitude: latitude,
                    longitude: longitude,
                })
                this.setState({
                    distance: dis / 1000,
                    origin: [{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }]
                })
            },
            () => {
                alert('Position could not be determined.');
            }
        );
    }

    drinkMenuList = (drinkMenu) => drinkMenu.map((d) =>

        <View style={styles.tableItemContainer}>
            <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{d.menu}</Text>
            </View>
            <View style={styles.itemCostContainer}>
                <Text style={styles.itemCost}>{d.price}</Text>
            </View>
        </View>
    )


    foodMenuList = (foodMenu) => foodMenu.map((d) =>
        <View style={styles.tableItemContainer}>
            <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{d.menu}</Text>
            </View>
            <View style={styles.itemCostContainer}>
                <Text style={styles.itemCost}>{d.price}</Text>
            </View>
        </View>
    )
    /*Method for finding user current location*/

    getCurrentLocation() {
        navigator.geolocation = require('@react-native-community/geolocation');
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                Alert.alert(error.message.toString());
            },
            {
                showLocationDialog: true,
                enableHighAccuracy: false,
                timeout: 20000
            }
        );
    }
    /*Recenter the map to Restaurant location*/
    recenterLocation() {
        this.setState({
            latitudeDelta: 0.100,
            longitudeDelta: 0.0121
        })
    }
}

const styles = StyleSheet.create({

    carousalPaginationText: { fontSize:16, marginHorizontal:5, color: "#888", marginBottom: 10 },
    carousalPaginationTextActive: {fontSize:16, marginHorizontal:5,  color: "#008080", marginBottom: 10 },


    recenterContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row",
        backgroundColor: "white",
        width: 100,
        padding: 5,
        borderRadius: 50,
        position: "absolute",
        bottom: 60,
        right: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    recenterIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginRight: 10,
    },
    recenterText: {

    },
    // accordian table stylings
    tableHeadingContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
    },
    tableHeading1: {
        flex: 1,
    },

    heading1: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 16,
    },

    tableHeading2: {},
    heading2: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 16,
    },

    tableItemContainer: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 10,
    },

    itemNameContainer: {
        flex: 1,
    },

    itemName: {
        color: "#282828",
        fontSize: 15,

    },

    itemCostContainer: {},

    itemCost: {
        color: "#282828",
        fontSize: 15,

    },


    // accordian styling
    accordianContainer: {
        marginHorizontal: 20,
        marginBottom: 5,
    },
    accordian: {
        backgroundColor: "#008080",
        padding: 15,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: 5,

    },
    accordianTop: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    accordianHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
    },
    accordianIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    accordianHeading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 20,
    },
    dropDownContainer: {},
    dropDownIcon: {
        width: 15,
        height: 10,
        resizeMode: "contain",
    },
    accordiancontentContainer: {
        backgroundColor: "white",
    },
    accordianContent: {
        padding: 15,
    },
    content: {
        color: "#000",
    },






    imageContainer: {
        width: "100%",
        height: 250,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,


        shadowColor: "#008080",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 5,
    },
    featureImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        height: "100%",
        resizeMode: "cover",

    },
    hotelDetails: {
        display: "flex",
        marginVertical: "5%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: "5%",
        flexWrap: "wrap",
    },
    hotelInfoAndWebsite: {

    },
    nameAndRating: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
    hotelName: {
        fontSize: 27,
        fontWeight: "bold",
        color: "black",
    },
    Rating: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    RatingStar: {
        width: 20,
        height: 15,
        resizeMode: "contain",
    },
    RatingValue: {
        color: "gray",
        fontWeight: "bold",
        marginLeft: 5
    },
    hotelAddress: {
        fontSize: 15,
        width: 200,
        lineHeight: 23,
        marginVertical: 10,
        color: "#3A3A3A",
    },
    hotelWebsiteUrl: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#008080",
        backgroundColor: "#fff",
        textAlign: "center",
        padding: 10,
        paddingHorizontal: 10,
        borderRadius: 20,

        shadowColor: "#008080",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 5,
    },
    contactButtons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        marginVertical: 20,
    },

    callButton: {
        backgroundColor: 'white',
        padding: 9,
        borderRadius: 50,
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        height: 50,
        width: 50,
        marginRight: "5%",
    },
    callIcon: {
        resizeMode: "contain",
        width: "100%",
        height: " 100%",
    },

    menuDetails: {
        marginBottom: 20,
    },
    menuTable: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 20,
    },
    menuHeading: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        fontWeight: "bold"
    },
    menuData: {
        flex: 2,
        fontSize: 16,
        color: "#000",
    },


    mapContainerMain: {
        marginTop: 30,
        position: "relative",
        borderWidth: 5,
        borderColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",

        marginHorizontal: "5%",
        borderRadius: 5,
    },


    mapButton: {
        backgroundColor: 'white',
        zIndex: +100,
        borderRadius: 50,

        position: "absolute",
        bottom: 100,
        right: 35,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        height: 50,
        width: 50,
    },
    mapIcon: {
        width: 50,
        height: 30,
        resizeMode: "contain",
    },
    urlIcon: {


    },

    mapcontainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: -1,

    },
    map: {
        display: 'none',
        ...StyleSheet.absoluteFillObject,
    },
    mapContainer: {

        justifyContent: "flex-end",
        alignItems: 'center',
        width: "100%",
        height: 200,
        // margin: "5%",
    },
    drinks: {
        color: 'red'
    },
    fixMenu: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    distance: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    }
})

