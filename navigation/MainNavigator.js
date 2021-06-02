import React, { Component } from "react";
import {
  createAppContainer,
} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer"
import {createStackNavigator} from "react-navigation-stack";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import BlogScreen from "../screens/BlogScreen"
import SideMenu from "../sidemenu";
import FeaturedMap from "../screens/FeaturedMap";
import MapDataUpload from "../screens/MapDataUpload";
import DrinkScreen from "../screens/DrinkScreen";
import BarDetailsScreen from "../screens/BarDetailsScreen";
import BarMapScreen from "../screens/BarMapScreen";
import LandingScreen from "../screens/LandingScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import FirebaseConfig from "../components/config";
import CategoryList from "../screens/CategoryListScreen";
import AdminSideMenu from "../AdminSideMenu";
import AdminScreen from "../screens/AdminScreen";
import AddAdminScreen from "../screens/AddAdmin";
import CreateBlog from "../screens/CreateBlog";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AllPlaces from "../screens/AllPlaces";
import Welcome from "../screens/LandingScreen";
import HappyBlogScreen from "../screens/HappyBlogScreen";
class NavigationDrawerStructure extends Component {

  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };


  render() {

    return (
      <View style={{ flexDirection: "row", marginLeft:5, }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require("../images/drawer.png")}
            style={{ width: 25, height: 25, marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  /*Welcome: {
    screen: Welcome,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",
    }),
  },*/
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  FeaturedMap: {
    screen: FeaturedMap,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",
    }),
  },
  MapDataUpload: {
    screen: MapDataUpload,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  DrinkScreen: {
    screen: DrinkScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  BarDetailsScreen: {
    screen: BarDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  BarMapScreen: {
    screen: BarMapScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft:null,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  Register: {
    screen: RegistrationScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  CategoryList: {
    screen: CategoryList,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),

  },
  Admin: {
    screen: AdminScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Text style={styles.headerRight}>Happy St. Pete</Text>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  AddAdmin: {
    screen: AddAdminScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  CreateBlog: {
    screen: CreateBlog,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  AllPlaces: {
    screen: AllPlaces,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },
  HappyBlog: {
    screen: HappyBlogScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight:<View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },

  Blog: {
    screen: BlogScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <View><Image source={require("../images/flagLogo.png")} style={styles.logo} /></View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#fff",

    }),
  },


});


const Drawer = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavScreen1: { screen: FirstActivity_StackNavigator },

  },
  {
    contentComponent: AdminSideMenu,
    drawerPosition: "left",
    drawerWidth: Dimensions.get("window").width - 120,
  }
);

export default createAppContainer(Drawer);
const styles = StyleSheet.create({
 headerRight:{
   marginRight:30,
   fontWeight:'bold',
   fontSize:25,
   color:'#000'
 },
 logo:{
   width:200,
   resizeMode:"contain",
   marginRight:30,
 },

})
