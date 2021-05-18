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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const stephen_t_king_img = require("../images/stephen-t-king-hx3NcvI6I_w-unsplash-768x512.jpg")

export default class BlogScreen extends Component {

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.blogContainer}>
                        <View style={styles.blogImageContainer}>
                            <Image
                                source={require("../images/stephen-t-king-hx3NcvI6I_w-unsplash-768x512.jpg")}
                                style={styles.blogImage} />
                        </View>

                        <View style={styles.blogContent}>

                            <View style={styles.blogAddDetails}>
                                <Text style={styles.blogTimestamp}>May 18, 2021</Text>
                                <Text style={styles.blogContentDivider}>|</Text>
                                <Text style={styles.blogCategory}>Drinks</Text>
                            </View>

                            <Text style={styles.blogHeading}>The Best Happy hour Margaritas in St Pete</Text>
                            <Text style={styles.blogParagraph} >Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper</Text>
                            <Text style={styles.blogParagraph}>                            
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla modi, amet nam voluptatem, tenetur dolorum necessitatibus odit maiores velit architecto quaerat ullam id? Qui atque illum dolor incidunt numquam sed, consectetur magni eum tempora enim voluptatibus eius aliquid autem illo nesciunt debitis.
                            </Text>

                            <View style={styles.bloggerContainer}>
                                <View style={styles.bloggerDpContainer}>
                                    <Image
                                    source={require("../images/author.png")}
                                    style={styles.bloggerDp} />
                                </View>
                                <View style={styles.bloggerDetails}>
                                    <Text style={styles.bloggerName}>Kyle Prinsloo</Text>
                                    <Text style={styles.bloggerJob}>Developer</Text>
                                </View>
                            </View>
                            
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: '#fff',
        width:wp(100),
        marginTop : -15,
    },

    blogContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 15,
        marginBottom:15, 
    },

    blogImageContainer: {
        height: 250,
        width: wp(100),
    },

    blogImage: {
        resizeMode: "cover",
        height: "100%",
        width: "100%",
        borderRadius: 10,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
    },
    
    blogContent: {
        padding: 20,
    },
    blogAddDetails:{
        display:"flex",
        flexDirection:"row",
       
    },
    blogContentDivider:{
        marginHorizontal:10,
        fontWeight:"bold",
        color:"#a7a7a7",
    },
    blogTimestamp:{
        fontWeight:"bold",
        color:"#a7a7a7",
    },
    blogCategory:{
        color:"#a7a7a7",
        fontWeight:"bold",
    },

    blogHeading: {
        fontSize: 28,
        fontWeight: "bold",
        lineHeight: 38,
        color: "#000",
        marginTop:10,
    },
    blogParagraph: {
        fontSize : 18,
        marginTop: 15,
        lineHeight: 30,
        color: "#555",
    },
    bloggerContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        marginTop:40,
    },
    bloggerDpContainer:{
        width: 50,
        height:50,

    },
    bloggerDp:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
        borderRadius:50,
    },
    bloggerDetails:{
        marginLeft:10,
    },
    bloggerName:{
        fontSize:18,
        fontWeight:"bold",
        marginBottom:5,
    },
    bloggerJob:{},

})
