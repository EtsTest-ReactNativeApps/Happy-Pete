import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Alert,
    TouchableOpacity,
    TextInput,
    TouchableHighlight
} from "react-native";
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps'

export default class HomeScreen extends Component{
    render(){
        return(
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
                        coordinate={{ latitude: 28.19313, longitude: -82.765710 }}
                        title={"The datz"}
                        description={"180 Central Ave St. Petersburg FL 33701 United States"}
                    />
                    <Marker
                        coordinate={{ latitude: 27.77161, longitude: -82.63661 }}
                        title={"The Oyester bar"}
                        description={"249 Central Ave St. Petersburg FL 33701 United States"}
                    />
                </MapView>

            </View>
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
        height: 200,
        width: "117%",


    }
})
