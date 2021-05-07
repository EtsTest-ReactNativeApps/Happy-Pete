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
import {Avatar, ListItem, SearchBar,Icon} from 'react-native-elements';
import Firebase from "../components/config";


export default class AllPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barLists: [],
            role:this.props.navigation.getParam("role")
        };
    }


    async componentDidMount() {
        const { navigation } = this.props;
        this.fetchAllDetails()
    }

    renderItem = ({item}) => (

        <ListItem bottomDivider button onPress={() => {
            {if(this.state.role==="Admin"){
                this.props.navigation.navigate("EditPlaces")
            }else{
                this.goToBarDetails(item.name)
            }}
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
            <View style={styles.container}>
                        <View>
                            {
                                this.state.bar &&
                                <FlatList
                                    data={this.state.barLists}
                                    keyExtractor={(a, b) => b.toString()}
                                    renderItem={(item) => this.renderItem(item)}
                                />
                            }
                        </View>
            </View>

        )
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
                this.setState({
                    barLists:bar
                })
            })
        })
    }

}

const styles = StyleSheet.create({
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
    noplaces:{
        marginTop:'3%',
        color:'red',
        fontSize:22,
        fontWeight:'500'
    }


})
