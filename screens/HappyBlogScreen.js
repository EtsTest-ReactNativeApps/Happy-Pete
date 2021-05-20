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

export default class HappyBlogScreen extends Component {

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../images/HappyStPeteLogolng-1536x231.png")}
                            style={{
                                width: 300,
                                height: 40,
                                resizeMode: "contain",
                            }}
                        />
                    </View>

                    <View style={styles.blogContainer}>
                        <View style={styles.blogImageContainer}>
                            <Image
                                source={require("../images/stephen-t-king-hx3NcvI6I_w-unsplash-768x512.jpg")}
                                style={styles.blogImage} />
                        </View>
                        <View style={styles.blogContent}>
                            <Text style={styles.blogHeading}>The Best Happy hour Margaritas in St Pete</Text>
                            <Text style={styles.blogDescription} numberOfLines={2} ellipsizeMode='tail'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper</Text>
                            <TouchableHighlight underlayColor="" onPress={() => this.props.navigation.navigate("Blog")}>
                                <Text style={styles.readMore}>READ MORE</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.blogContainer}>
                        <View style={styles.blogImageContainer}>
                            <Image
                                source={require("../images/licor-beirao-iDEECkducQw-unsplash-scaled.jpg")}
                                style={styles.blogImage} />
                        </View>
                        <View style={styles.blogContent}>
                            <Text style={styles.blogHeading}>The Best Happy hour Beers in St Pete</Text>
                            <Text style={styles.blogDescription} numberOfLines={2} ellipsizeMode='tail'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper</Text>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate("Blog")} underlayColor="">
                                <Text style={styles.readMore}>READ MORE</Text>

                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.blogContainer}>
                        <View style={styles.blogImageContainer}>
                            <Image
                                source={require("../images/palmTreeBG-768x85.jpg")}
                                style={styles.blogImage} />
                        </View>
                        <View style={styles.blogContent}>
                            <Text style={styles.blogHeading}>The Best Happy hour Beers in St Pete</Text>
                            <Text style={styles.blogDescription} numberOfLines={2} ellipsizeMode='tail'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper</Text>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate("Blog")} underlayColor="">
                                <Text style={styles.readMore}>READ MORE</Text>

                            </TouchableHighlight>                        
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
        justifyContent: "center",
        backgroundColor: '#f1f1f1'
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 15,
    },
    blogContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 350,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    blogImageContainer: {
        height: 200,
        width: 350,
    },
    blogContent: {
        padding: 20,
    },
    blogImage: {
        resizeMode: "cover",
        height: "100%",
        width: "100%",
        borderRadius: 10,
    },
    blogHeading: {
        fontSize: 21,
        fontWeight: "bold",
        lineHeight: 28,
        color: "#212121"
    },
    blogDescription: {
        marginTop: 10,
        lineHeight: 20,
        color: "#555",
    },
    readMore: {
        marginTop: 15,
        color: "#000",
    }





})
