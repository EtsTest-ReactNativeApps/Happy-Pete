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

export default class BarMapScreen extends Component{
    render(){
        const {navigation} = this.props;
        let longitude = navigation.getParam('longitude');
        let latitude = navigation.getParam('latitude');
        return(
            <View style={styles.mapContainer}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude:this.props.latitude,
                        longitude: this.props.longitude,
                        latitudeDelta: 0.100,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: this.props.latitude, longitude:this.props.longitude }}
                        title={this.props.name}
                        description={"180 Central Ave St. Petersburg FL 33701 United States"}
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
