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
    ImageBackground,
    FlatList,
    Dimensions,
    Alert,
} from "react-native";
import {ListItem} from "react-native-elements";

export default class CategoryList extends Component{
    constructor(props) {
        super(props);
        this.state={
            list:this.props.navigation.getParam("data")
        }
    }
    goToBarDetails(title) {

        let listDetails = this.state.list;
        console.log("Category list screen"+listDetails)
        for (let i  in listDetails) {
            let titleDb = listDetails[i].title
            if (titleDb === title) {
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

    renderItem = ({item}) => (

        <ListItem bottomDivider button onPress={() => {
            this.goToBarDetails(item.title)
        }}>
            {/*<Avatar source={{uri: item.avatar_url}} />*/}
            <ListItem.Content >
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>

    )

    render() {
        const {navigation}=this.props;
        let list = navigation.getParam("data")
        return(
            <View>
                <FlatList data={list}
                          keyExtractor={(a, b) => b.toString()}
                          renderItem={(item) => this.renderItem(item)}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    ListItem:{
        backgroundColor : "purple",
    }
});
