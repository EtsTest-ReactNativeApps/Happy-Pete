import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions,TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
const list = [
    {
        name: 'The Lure',
        avatar_url: 'http://thelurestpete.com/wp-content/uploads/2016/01/the-lure-white1-med.png',
        subtitle: 'Sushi. Drinks, Billards'
    },
    {
        name: 'The Oyster Bar',
        avatar_url: 'https://oysterbarstpete.com/wp-content/uploads/2020/10/Rows-Only.png',
        subtitle: '$2 Beers, $12 Mojitos'
    },
    {
        name: 'The Datz',
        avatar_url: 'https://datztampa.com/wp-content/uploads/2019/05/datzlogo.png',
        subtitle: 'American Food, Breakfast & Brunch, Drinks'
    },
]

export default class App extends React.Component {
        state={
            data:[]
        }
    keyExtractor = (item, index) => index.toString()

    componentDidMount() {
        const { navigation } = this.props;
        const drinkData = navigation.getParam("drinkData")
        this.setState({
            data:drinkData
        })
    }

    renderItem = ({ item }) => (
        <ListItem bottomDivider>
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
            <FlatList
                keyExtractor={this.keyExtractor}
                data={list}
                renderItem={this.renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop:60
    },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
    }
});
