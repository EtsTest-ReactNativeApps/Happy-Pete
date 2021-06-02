import React, { Component } from "react";
import { getDistance } from 'geolib';
import {
    StyleSheet,
    View,
    ScrollView,
    Linking, Text, Image, TouchableHighlight, TouchableNativeFeedback
} from "react-native";
import * as geolib from 'geolib';
import MapViewDirections from 'react-native-maps-directions';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import openMap from 'react-native-open-maps';
import { createOpenLink } from 'react-native-open-maps';

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Firebase from "../components/config";
import color from "color";
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
            destinationOrigin: [{
                latitude: this.props.navigation.getParam("latitude"),
                longitude: this.props.navigation.getParam("longitude")
            }
            ],
            origin: [{
                latitude: null,
                longitude: null
            }]
        }

    }
    componentDidMount() {
        const { navigation } = this.props
        let longitude = navigation.getParam('longitude');
        let latitude = navigation.getParam('latitude')
        this.setState({
            latitude: latitude,
            longitude: longitude,
        })
        this.findDistance(longitude, latitude)
    }

    openDirection=()=> {
        const googleMapOpenUrl = ({ latitude, longitude }) => {
            const latLng = `${latitude},${longitude}`;
            return `google.navigation:q=${latLng}`;
        }
        Linking.openURL(googleMapOpenUrl({ latitude: this.state.latitude, longitude:this.state.longitude }));

    }

    render() {
        const { navigation } = this.props
        let name = navigation.getParam("name")
        let avatar_url = navigation.getParam('avatar_url');
        let subtitle = navigation.getParam('subtitle');
        let website = navigation.getParam('website');
        let longitude = navigation.getParam('longitude');
        let latitude = navigation.getParam('latitude')
        let phoneNumber = navigation.getParam('phoneNumber')
        let address = navigation.getParam('address')
        let drinkMenu = navigation.getParam('drinkMenu')
        let foodMenu = navigation.getParam('foodMenu')
        let hours = navigation.getParam('happyHour')
        if (avatar_url === null || avatar_url === undefined) {
            avatar_url = ''
        }
        return (
            <ScrollView>

                <View style={styles.container}>
                    {/* section 1 header image */}
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.featureImage}
                            source={{ uri: avatar_url }}
                        />
                    </View>

                    {/* section 2 : contact details : hotelname, address, website url, phone, map */}
                    <View style={styles.hotelDetails}>

                        {/* section 2.1 name, rating  address, web url */}
                        <View style={styles.hotelInfoAndWebsite}>

                            <View style={styles.nameAndRating}>
                                <Text style={styles.hotelName}>{name}</Text>
                                <View style={styles.Rating}>
                                    <Image style={styles.RatingStar} source={require("../assets/icons/hotel_details/starRating.png")} />
                                    <Text style={styles.RatingValue}>4.3</Text>
                                </View>
                            </View>

                            <Text style={styles.hotelAddress}>{address}</Text>
                            <TouchableHighlight underlayColor="transparent" onPress={() => { Linking.openURL(website) }}>
                                <Text style={styles.hotelWebsiteUrl}>{website}</Text>
                            </TouchableHighlight>

                        </View>

                        {/* section 2.2 call and map buttons */}
                        <View style={styles.contactButtons}>
                            <TouchableHighlight
                                underlayColor="transparent" onPress={() => { Linking.openURL('tel:' + phoneNumber) }}>
                                <View style={styles.callButton}>
                                    <Image style={styles.callIcon} source={require("../assets/icons/hotel_details/callIcon.png")} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                    {/* menu details */}

                    <View style={styles.menuDetails}>
                        <View style={styles.menuTable}>
                            <Text style={styles.menuHeading}>Happy Hour</Text>
                            <Text style={styles.menuData}>{hours}</Text>
                        </View>

                        <View style={styles.menuTable}>
                            <Text style={styles.menuHeading}>Drink Menu</Text>
                            <Text style={styles.menuData}>{drinkMenu}</Text>
                        </View>

                        <View style={styles.menuTable}>
                            <Text style={styles.menuHeading}>Food Menu</Text>
                            <Text style={styles.menuData}>{foodMenu}</Text>
                        </View>
                    </View>


                    {/* google map */}


                    <View style={styles.mapContainerMain}>

                        <View style={styles.mapContainer}>
                            <MapView
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={{
                                    latitude: Number(latitude),
                                    longitude: Number(longitude),
                                    longitudeDelta: 0.0121,
                                    latitudeDelta: 0.100

                                }}
                            >{
                                    this.state.latitude &&
                                    <Marker
                                        coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
                                        title={name}
                                    />
                                }{this.state.destinationOrigin && this.state.origin &&
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

                    <TouchableNativeFeedback onPress={()=>{this.openDirection()}}>
                        <Text style={styles.mapButton}>
                            <Image style={styles.mapIcon} source={require("../assets/icons/hotel_details/mapIcon.png")} />
                        </Text>
                    </TouchableNativeFeedback>

                    <View style={styles.distance}>
                        <Text>You are {this.state.distance} km away from {name} </Text>
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
}

const styles = StyleSheet.create({

    imageContainer: {
        width: "100%",
        height: 250,
        backgroundColor : "#fff",
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
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        width: "100%",
        height: "100%",
        resizeMode:"cover",

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
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
    },
    RatingStar: {
        width: 18,
        height: 20,
        resizeMode: "contain",
    },
    RatingValue: {
        color: "black",
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
        fontSize: 16,
        color: "#fff",
        backgroundColor: "#008080",
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


    mapContainerMain:{
        position:"relative",
        borderWidth:5,
        borderColor: "white",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"auto",

        marginHorizontal:"5%",
        borderRadius:5,
    },


    mapButton: {
        backgroundColor: 'white',
        zIndex: +100,
        borderRadius: 50,

        position:"absolute",
        bottom:60,
        right:35,

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
        zIndex:-1,

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
    distance:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginVertical : 10,
    }
})

