import React, { Component } from        "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Linking
} from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import FeaturedMap from "./FeaturedMap";
import BarMapScreen from "./BarMapScreen";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";

export default class BarDetailsScreen extends Component{
    render() {
        const {navigation} = this.props
        let name = navigation.getParam("name")
        let avatar_url=navigation.getParam('avatar_url');
        let subtitle = navigation.getParam('subtitle');
        let website=navigation.getParam('website');
        let longitude=navigation.getParam('longitude');
        let latitude = navigation.getParam('latitude')

        return(
            <ScrollView>

                <Card>
                    <CardImage
                        source={{uri: avatar_url}}
                        title={name}
                    />
                    <CardTitle
                        subtitle={subtitle}
                    />
                    {/*<CardContent text="Clifton, Western Cape" />*/}
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => {Linking.openURL(website)}}
                            title="Website"
                            color="#FEB557"
                        />
                    </CardAction>
                </Card>
                <View style={styles.mapContainer}>
                    <MapView
                        showsUserLocation={true}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude:27.773056,
                            longitude: -82.639999,
                            latitudeDelta: 0.100,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: latitude, longitude:longitude }}
                            title={name}
                            description={"180 Central Ave St. Petersburg FL 33701 United States"}
                        />
                    </MapView>

                </View>
            </ScrollView>

        )
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
        height: 500,
        width: "117%",


    }
})

