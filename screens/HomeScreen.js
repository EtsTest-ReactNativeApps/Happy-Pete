import React, { Component } from        "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Button,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    ImageBackground, FlatList,Dimensions
} from "react-native";
import { Fontisto } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import {Avatar, ListItem, SearchBar,Icon} from 'react-native-elements';
import FeaturedMap from "./FeaturedMap";
import Firebase from "../components/config";
import DrinkScreen from "./DrinkScreen";

const list = [
    {
        id:1,
        name: 'The Lure',
        avatar_url: 'http://thelurestpete.com/wp-content/uploads/2016/01/the-lure-white1-med.png',
        subtitle: 'Sushi. Drinks, Billards',
        website:'http://thelurestpete.com/',
        longitude: 28.06967,
        latitude: -82.27464
    },
    {
        id:2,
        name: 'The Oyster Bar',
        avatar_url: 'https://oysterbarstpete.com/wp-content/uploads/2020/10/Rows-Only.png',
        subtitle: '$2 Beers, $12 Mojitos',
        website:'https://oysterbarstpete.com/',
        longitude: 27.77161,
        latitude: -82.63661
    },
    {
        id:3,
        name: 'The Datz',
        avatar_url: 'https://datztampa.com/wp-content/uploads/2019/05/datzlogo.png',
        subtitle: 'American Food, Breakfast & Brunch, Drinks',
        webiste:'https://datztampa.com/stpete/menu/',
        longitude: 28.19313,
        latitude: -82.765710
    },
    {
        id:4,
        name:'The Thirsty First',
        avatar_url: 'https://static.wixstatic.com/media/5920b0_e08d322e1132416d871432c9d320e637.png/v1/fill/w_269,h_219,al_c,q_85,usm_0.66_1.00_0.01/5920b0_e08d322e1132416d871432c9d320e637.webp',
        subtitle: 'Happy Hour 11 AM - 7 PM, Monday - Friday',
        website:'https://www.thirstyfirstlounge.com/',
        longitude:28.27281,
        latitude:-83.27564
    }
]

export default class HomeScreen extends Component{
    state = {
        search: '',
        drinkData:''
    };

async componentDidMount() {
    this.updateAsync();
    try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            await Updates.fetchUpdateAsync();

            await Updates.reloadAsync();
        }
    } catch (e) {
        // handle or log error
    }
}renderItem = ({ item }) => (

        <ListItem bottomDivider button onPress={()=>{this.goToBarDetails(item.id)}}>
            <Avatar source={{uri: item.avatar_url}} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>

    )

    render(){
        return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.Home}>
                <View style={styles.fixToText}>
                    <TouchableHighlight
                        style={[styles.buttonContainer,styles.btnLeft, styles.clickButton]}
                        onPress={() => this.props.navigation.navigate("Restaurant")}
                    >
                        <React.Fragment>
                            <Ionicons name="restaurant" size={24} color="black" />
                            <Text style={styles.clickText}>Restaurant</Text>
                        </React.Fragment>

                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.clickButton]}
                        onPress={() => this.props.navigation.navigate("Cocktails")}
                    >
                        <React.Fragment>
                            <FontAwesome5 name="cocktail" size={24} color="black" />
                        <Text style={[styles.clickText]}>Cocktails</Text>
                        </React.Fragment>
                    </TouchableHighlight>
                </View>
                <View style={styles.fixToText}>
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.clickButton]}
                        onPress={() => this.props.navigation.navigate("Food")}
                    ><React.Fragment>
                        <Ionicons name="fast-food" size={24} color="black" />
                        <Text style={[styles.clickText,styles.marginIcon]}>Food</Text>
                    </React.Fragment>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.clickButton]}
                        onPress={() => this.props.navigation.navigate("Beer")}
                    >
                        <React.Fragment>
                        <FontAwesome5 name="beer" size={24} color="black" />
                        <Text style={[styles.clickText,styles.marginIcon]}>Beer</Text>
                        </React.Fragment>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.mapView}>
                <Text style={styles.mapText}>Featured Places</Text>
                <FeaturedMap/>
            </View>
            <View>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={list}
                    renderItem={this.renderItem}
                />
            </View>
        </ScrollView>

    )
    }

        updateAsync=async()=>{
            try {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    alert("A new update is available.")

                }
            } catch (e) {
                // handle or log error
            }
        }
        update = async()=>{
            this.setState({
                updateAlert:false,

            })
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();

        }


    /*fetchBardetails() {
        Firebase.database
    }*/
    fetchDrink() {
        Firebase.database().ref("/places").orderByChild('category').equalTo('Drink')
            .once("value").then(snapshot=>{
                let data = snapshot.val();
                this.props.navigation.navigate("DrinkScreen",{
                    drinkData:data
                })
        })
    }
    fetchFood() {
        Firebase.database().ref("/places").orderByChild('category').equalTo('Food')
            .once("value").then(snapshot=>{
            let data = snapshot.val();
            alert(data)
        })
    }
    fetchBeer() {
        Firebase.database().ref("/places").orderByChild('category').equalTo('Beer')
            .once("value").then(snapshot=>{
            let data = snapshot.val();
            alert(data)
        })
    }


    goToBarDetails(id) {
        for(let i =0;i<list.length;i++){
            if(list[i].id===id){
                this.props.navigation.navigate("BarDetailsScreen",{
                    name:list[i].name,
                    subtitle:list[i].subtitle,
                    avatar_url:list[i].avatar_url,
                    id:list[i].id,
                    website:list[i].website,
                    longitude:list[i].longitude,
                    latitude:list[i].latitude
                })
            }
        }

    }
}

const styles = StyleSheet.create({
    Swiper:{
        height:500,
        width:500
    },
    fixTotext: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
  container: {

  },
    bestText:{
      marginTop:"5%",
      color:'black',
      fontSize:40,
      fontWeight :'bold',
      marginLeft:'5%'
    },
    randomText:{
      marginLeft: '5%',
      marginRight: '10%'
    },
    readMore:{
      color:'red',
      fontWeight:'500',
      marginLeft:'10%'

    },
    fixImg:{
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
        width: 300,
        textAlign: "center",
        marginLeft: 15

    },
    btn:{
      borderRadius:5,
      marginTop: 10,
      marginLeft:30,
      backgroundColor: "red",
      height: 30,
      width: "75%",
      alignContent:"center"
    },
    btnText:{
      fontSize:20,
      fontWeight:'bold',
      color:"#fff"
    },
    locationTxt:{

    },
    mapcontainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        display:'none',
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 300,
    },
    cardsText: {
        fontSize: 22,
    },
    Home: {
        justifyContent: "center",
        alignContent: "center",
        marginTop: "5%"
    },
    separator: {
        marginVertical: "3%",
        borderBottomColor: "#737373",

    },
    paragraph: {
        margin: 1.5,
        textAlign: "center",
        fontWeight: "700",
        paddingLeft: 12,
        color: "#008b8b",
        marginTop:"5%"
    },
    welcomeUser: {
        textAlign: "center",
        fontSize: 18,
        paddingTop: 30,
        fontWeight: "600",
        color: "#09C5F7"
    },
    buttonContainer: {
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
        width: wp('43%'),
        borderRadius: 15,
        marginRight: 15,
        marginLeft: "2%"
    },
    clickButton: {
        backgroundColor: "#09C5F7"
    },
    clickText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800"
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
        width: 300,
        textAlign: "center",
        marginLeft: 15
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },
    foodImage:{
        height:165,
        width:220
    },
    mapView:{
        marginRight:'15%'
    },
    mapText:{
        fontWeight:'bold',
        fontSize:25,
        color:'red',
        marginLeft:'35%'
    },
    fav:{
        marginRight:"20%",
    },
    fixMargin:{
        marginBottom: "12%"
    },
    cardStyle:{
        borderRadius:25
    },


})
