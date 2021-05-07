import React, { Component } from        "react";
import {getDistance} from 'geolib';
import {
    StyleSheet,
    View,
    ScrollView,
    Linking, Text
} from "react-native";
import * as geolib from 'geolib';
import MapViewDirections from 'react-native-maps-directions';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import openMap from 'react-native-open-maps';
import { createOpenLink } from 'react-native-open-maps';

import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import Firebase from "../components/config";
const GOOGLE_MAPS_APIKEY ='AIzaSyCDn-KsRdw9W6AKogCtyF7CsCw5Ptg6efA'
export default class BarDetailsScreen extends Component{
    constructor(props) {
        super(props);
        this.state={
            distance:null,
            longitude:null,
            latitude:null,
            address:null,
            phoneNumber:null,
            destinationOrigin:[{
                latitude: this.props.navigation.getParam("latitude"),
                longitude: this.props.navigation.getParam("longitude")
            }
            ],
            origin:[{
                latitude:null,
                longitude:null
            }]
        }

    }
    componentDidMount() {
        const {navigation} = this.props
        let longitude=navigation.getParam('longitude');
        let latitude = navigation.getParam('latitude')
        this.setState({
            latitude:latitude,
            longitude:longitude,
        })
        this.findDistance(longitude,latitude)
    }

    render() {
        const {navigation} = this.props
        let name = navigation.getParam("name")
        let avatar_url=navigation.getParam('avatar_url');
        let subtitle = navigation.getParam('subtitle');
        let website=navigation.getParam('website');
        let longitude=navigation.getParam('longitude');
        let latitude = navigation.getParam('latitude')
        let phoneNumber=navigation.getParam('phoneNumber')
        let address=navigation.getParam('address')
        let drinkMenu=navigation.getParam('drinkMenu')
        let foodMenu =navigation.getParam('foodMenu')
        let hours=navigation.getParam('happyHour')
        return(
            <ScrollView>

                <Card>
                    <CardImage
                        source={{uri: avatar_url}}
                        title={name}
                    />
                    <CardTitle
                        subtitle={drinkMenu + foodMenu}
                    />
                    <View style={styles.fixMenu}>
                        <CardContent text ="Happy Hour"/>
                        <CardContent text={hours} />
                    </View>
                    <View style={styles.fixMenu}>
                        <CardContent text ="Address"/>
                        <CardContent text={address} />
                    </View>

                    <View style={styles.fixMenu}>
                    <CardContent text="Drink menu"
                        style={styles.drinks}
                    />
                    <CardContent text={drinkMenu}
                    />
                    </View>
                    <View style={styles.fixMenu}>
                        <CardContent text="Food Menu"/>
                        <CardContent text={foodMenu}/>
                    </View>

                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => {Linking.openURL(website)}}
                            title="Website"
                            color="#FEB557"
                        />
                        <CardButton
                            onPress={() => {Linking.openURL('tel:'+phoneNumber)}}
                            title="Call"
                            color="#FEB557"
                        />
                        <CardButton
                            onPress={() => {this.openDirection()}}
                            title="Get Directions"
                            color="#FEB557"
                        />
                    </CardAction>
                </Card>
                <View style={styles.mapContainer}>
                    <MapView
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude:Number(latitude),
                            longitude:Number(longitude),
                            longitudeDelta:0.0121,
                            latitudeDelta:0.100

                        }}
                    >{
                        this.state.latitude &&
                        <Marker
                            coordinate={{latitude: parseFloat(latitude), longitude :parseFloat(longitude)}}
                            title={name}
                        />
                    }{this.state.destinationOrigin && this.state.origin &&
                        <MapViewDirections
                            origin={this.state.origin}
                            destination={this.state.destinationOrigin[0]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />}
                    </MapView>

                </View>
                <View>
                    <Text>You are {this.state.distance} km away from {name} </Text></View>
            </ScrollView>

        )
    }

    openDirection() {
        openMap({ latitude:this.state.latitude, longitude: this.state.longitude });
    }

    findDistance(longitude, latitude) {
        navigator.geolocation = require('@react-native-community/geolocation');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                   let dis= geolib.getDistance(position.coords, {
                        latitude: latitude,
                        longitude: longitude,
                    })
                this.setState({
                    distance:dis/1000,
                    origin:[{
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
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
    mapContainer:{

        justifyContent:"flex-end",
        alignItems: 'center',
        borderRadius:15,
        borderColor:'orange',
        borderWidth:2,
        overflow:'hidden',
        height: 200,
        width: "99%",

    },
    drinks:{
        color:'red'
    },
    fixMenu:{
        justifyContent:'center',
        flexDirection:'row'
    }
})

