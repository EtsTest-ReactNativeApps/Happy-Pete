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
    ImageBackground, FlatList, Dimensions, Alert,

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
import * as geolib from "geolib";


export default class HomeScreen extends Component {
    state = {
        search: '',
        drinkData: '',
        barLists: [],
        bar:[],
        role:this.props.navigation.getParam("role")
    };

    async componentDidMount() {
        const { navigation } = this.props;
            this.fetchAllDetails()
            this.getNearestPlace()
    }


    renderItem = ({item}) => (

        <ListItem bottomDivider button onPress={() => {
            this.goToBarDetails(item.name)
        }}>
            {/*<Avatar source={{uri: item.avatar_url}} />*/}
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>

    )

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.Home}>
                    <View style={styles.fixToText}>
                        <TouchableHighlight
                                       style={[styles.buttonContainer, styles.btnLeft, styles.clickButton]}
                            onPress={() => this.fetchRestaurant()}
                        >
                            <React.Fragment>
                                <Ionicons name="restaurant" size={24} color="black"/>
                                <Text style={styles.clickText}>Wine</Text>
                            </React.Fragment>

                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={"none"}
                            style={[styles.buttonContainer, styles.clickButton]}
                            onPress={() => this.fetchDrink()}
                        >
                            <React.Fragment>
                                <FontAwesome5 name="cocktail" size={24} color="black"/>
                                <Text style={[styles.clickText]}>Cocktails</Text>
                            </React.Fragment>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.fixToText}>
                        <TouchableHighlight
                            style={[styles.buttonContainer, styles.clickButton]}
                            onPress={() => this.fetchFood()}
                        ><React.Fragment>
                            <Ionicons name="fast-food" size={24} color="black"/>
                            <Text style={[styles.clickText, styles.marginIcon]}>Food</Text>
                        </React.Fragment>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.buttonContainer, styles.clickButton]}
                            onPress={() => this.fetchBeer()}
                        >
                            <React.Fragment>
                                <FontAwesome5 name="beer" size={24} color="black"/>
                                <Text style={[styles.clickText, styles.marginIcon]}>Beer</Text>
                            </React.Fragment>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.mapView}>
                    <Text style={styles.mapText}>Featured Places</Text>
                    <FeaturedMap children={this.state.barLists}/>
                </View>
                {this.state.bar===null || this.state.bar===[]?(
                <View>
                    {
                        this.state.bar &&
                        <FlatList
                            data={this.state.bar}
                            keyExtractor={(a, b) => b.toString()}
                            renderItem={(item) => this.renderItem(item)}
                        />

                    }
                    <TouchableHighlight
                        style={styles.viewAll}
                        onPress={() => this.props.navigation.navigate("AllPlaces",{
                            role:this.state.role
                        })}
                    >
                            <Text style={styles.clickText}>View All</Text>
                    </TouchableHighlight>
                </View>
                    ):
                    <View><Text style={styles.noplaces}>No nearest places or Bar found for your location</Text>
                        <TouchableHighlight
                            style={styles.viewAll}
                            onPress={() => this.props.navigation.navigate("AllPlaces",{
                                role:this.state.role
                            })}
                        >
                            <Text style={styles.clickText}>View All</Text>
                        </TouchableHighlight>
                    </View>
                }
            </ScrollView>

        )
    }

    updateAsync = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                alert("A new update is available.")

            }
        } catch (e) {
            // handle or log error
        }
    }
    update = async () => {
        this.setState({
            updateAlert: false,

        })
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();


    }

    fetchRestaurant() {
        let resData =[]
        Firebase.database().ref("/places").orderByChild('category').equalTo('Restaurant')
            .once("value").then(snapshot => {
            snapshot.forEach((child) => {
                resData.push({
                    title: child.val().name,
                    address: child.val().address,
                    key: child.key,
                    website: child.val().website,
                    longitude: child.val().longitude,
                    latitude: child.val().latitude,
                    phoneNumber: child.val().phoneNumber,
                    foodMenu: child.val().foodMenu,
                    drinkMenu: child.val().drinkMenu,
                    happyHour: child.val().happyHour,
                    category:child.val().category
                })
            })
            this.props.navigation.navigate("CategoryList",{
                data:resData
            })
        })
    }
    fetchDrink() {
        let drinkData =[]
        Firebase.database().ref("/places").orderByChild('category').equalTo('Cocktails')
            .once("value").then(snapshot => {
            snapshot.forEach((child) => {
                drinkData.push({
                    title: child.val().name,
                    address: child.val().address,
                    key: child.key,
                    website: child.val().website,
                    longitude: child.val().longitude,
                    latitude: child.val().latitude,
                    phoneNumber: child.val().phoneNumber,
                    foodMenu: child.val().foodMenu,
                    drinkMenu: child.val().drinkMenu,
                    happyHour: child.val().happyHour,
                    category:child.val().category
                })
            })
            this.props.navigation.navigate("CategoryList",{
                data:drinkData
            })
        })
    }

    fetchFood() {
        let foodData =[]
        Firebase.database().ref("/places").orderByChild('category').equalTo('Food')
            .once("value").then(snapshot => {
            snapshot.forEach((child) => {
                foodData.push({
                    title: child.val().name,
                    address: child.val().address,
                    key: child.key,
                    category:child.val().category,
                    website: child.val().website,
                    longitude: child.val().longitude,
                    latitude: child.val().latitude,
                    phoneNumber: child.val().phoneNumber,
                    foodMenu: child.val().foodMenu,
                    drinkMenu: child.val().drinkMenu,
                    happyHour: child.val().happyHour
                })
            })
            this.props.navigation.navigate("CategoryList",{
                data:foodData
            })


        })
    }

    fetchBeer() {
       let beerData=[]
        Firebase.database().ref("/places").orderByChild('category').equalTo('Beer')
            .once("value").then(snapshot => {
            snapshot.forEach((child) => {
                beerData.push({
                    title: child.val().name,
                    address: child.val().address,
                    key: child.key,
                    website: child.val().website,
                    longitude: child.val().longitude,
                    latitude: child.val().latitude,
                    phoneNumber: child.val().phoneNumber,
                    foodMenu: child.val().foodMenu,
                    drinkMenu: child.val().drinkMenu,
                    happyHour: child.val().happyHour,
                    category:child.val().category
                })
            })
            this.props.navigation.navigate("CategoryList",{
                data:beerData
            })

        })
    }


    goToBarDetails(name) {
        let listDetails = this.state.bar;
        for (let i  in listDetails) {
            let title = listDetails[i].name
            if (title === name) {
                this.props.navigation.navigate("BarDetailsScreen", {
                    name: listDetails[i].name,
                    // avatar_url:list[i].avatar_url,
                    website: listDetails[i].website,
                    longitude: listDetails[i].longitude,
                    latitude: listDetails[i].latitude,
                    phoneNumber: listDetails[i].phoneNumber,
                    address: listDetails[i].address,
                    drinkMenu: listDetails[i].drinkMenu,
                    foodMenu: listDetails[i].foodMenu,
                    happyHour: listDetails[i].happyHour
                })

            }
        }
    }


    fetchAllDetails() {
        let bar=[]
        Firebase.database().ref("/places")
            .once("value").then(snapshot=>{
            snapshot.forEach((child)=>{
                    bar.push({
                        name: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        website:child.val().website,
                        longitude:child.val().longitude,
                        latitude:child.val().latitude,
                        phoneNumber:child.val().phoneNumber,
                        foodMenu :child.val().foodMenu,
                        drinkMenu:child.val().drinkMenu,
                        happyHour: child.val().happyHour
                    })
                this.getNearestPlace(bar)
            })
        })
    }

    getNearestPlace(barList) {
        navigator.geolocation = require('@react-native-community/geolocation');
        navigator.geolocation.getCurrentPosition(
            position => {
                let bar=[]
                for(let i in barList ){
                    let dis= geolib.getDistance(position.coords, {
                        latitude: barList[i].latitude,
                        longitude: barList[i].longitude,
                    })
                    let disKM= dis/1000;

                    if(disKM<=50){
                        bar.push({
                            name: barList[i].title,
                            // avatar_url:list[i].avatar_url,
                            website: barList[i].website,
                            longitude: barList[i].longitude,
                            latitude: barList[i].latitude,
                            phoneNumber: barList[i].phoneNumber,
                            address: barList[i].address,
                            drinkMenu: barList[i].drinkMenu,
                            foodMenu: barList[i].foodMenu,
                            happyHour: barList[i].happyHour
                        })
                    }
                }
                this.setState({
                    bar:bar
                });
            },
            error => {
                Alert.alert(error.message.toString());
            },

        );

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
    height:hp('100%')
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
    noplaces:{
        marginTop:'3%',
        color:'red',
        fontSize:22,
        fontWeight:'500'
    },
    viewAll:{
        color:'#fff',
        backgroundColor: "#00b5ec",
        height:hp('7%'),
        width:'25%',
        borderRadius:20,
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'35%',
        marginTop:'5%'
    }


})
