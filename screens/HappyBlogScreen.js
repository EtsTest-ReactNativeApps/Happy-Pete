import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Alert,
    TouchableHighlight,
    ImageBackground, Image
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
const stephen_t_king_img = require("../images/stephen-t-king-hx3NcvI6I_w-unsplash-768x512.jpg")

export default class HappyBlogScreen extends Component{

    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={require("../images/HappyStPeteLogolng-1536x231.png")}
                        style={{
                            width: 360,
                            height: 50,
                            marginLeft:'5%'
                        }}
                    />
                    <Image
                        source={require("../images/stephen-t-king-hx3NcvI6I_w-unsplash-768x512.jpg")}
                        style={{
                            width: 330,
                            height: 120,
                            marginTop:'10%',
                            marginLeft:'8%'
                        }}
                    />
                    <View>
                        <Text style={styles.bestText}>The Best Happy hour Margaritas in St Pete</Text>
                        <Text style={styles.randomText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper</Text>
                        <Text style={styles.readMore}>READ MORE</Text>
                    </View>

                    <Image
                        source={require("../images/licor-beirao-iDEECkducQw-unsplash-scaled.jpg")}
                        style={{
                            width: 330,
                            height: 120,
                            marginTop:'10%',
                            marginLeft:'8%'
                        }}
                    />
                    <View>
                        <Text style={styles.bestText}>The Best Happy hour Beers in St Pete</Text>
                        <Text style={styles.randomText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper</Text>
                        <Text style={styles.readMore}>READ MORE</Text>
                    </View>

                    <Image
                        source={require("../images/palmTreeBG-768x85.jpg")}
                        style={{
                            width: 360,
                            height: 50,
                            marginLeft:'5%'
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff'
    },
    bestText:{
        color:'red',
        fontSize:26,
        marginRight:15,
        marginLeft:'10%'
    },
    randomText:{
        marginLeft: '10%',
        marginRight: '15%'
    },
    readMore:{
        color:'red',
        fontWeight:'500',
        marginLeft:'10%'

    }


})
