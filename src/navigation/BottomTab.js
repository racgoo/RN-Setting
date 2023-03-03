//react
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AsyncStorage,
  TouchableOpacity,
  Pressable,
  Button,
  Image,
  NativeModules,
  Platform,
  LogBox,
} from 'react-native';

import { StackActions, TabActions } from '@react-navigation/native';
console.disableYellowBox = true;

//api
import * as api from "../controller/api";

//color sheet
import colors from '../style/colors';

//layout
import config from "../style/config";

//compoment
import HeaderDrawer from "../components/HeaderDrawer/HeaderDrawer";

//navigation
import { NavigationContainer, useNavigation,useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { WebView } from 'react-native-webview';


//Layout
import PageLayout from '../components/PageLayout';
import { getStatusBarHeight } from 'react-native-safearea-height';



//Screen
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import HomeScreen2 from '../screen/HomeScreen2/HomeScreen2';
import HomeScreen3 from '../screen/HomeScreen3/HomeScreen3';
import HomeScreen4 from '../screen/HomeScreen4/HomeScreen4';
import TestScreen from '../screen/TestScreen/TestScreen';
import LoginScreen from '../screen/LoginScreen/LoginScreen';
import HomeMainScreen from "../screen/HomeScreen/HomeMainScreen";
import SplashScreen from '../screen/SplashScreen/SplashScreen';

//font
import { setCustomText } from 'react-native-global-props';

//images
import leftBlackArrow from "../../public/images/leftBlackArrow.png";
// import leftBlackArrow from "./public/images/leftBlackArrow.png";


//recoil
import { requestSetSystemItem, systemAtom } from '../recoil/recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';

// const tabClickHandler = (event,navigation,path) => {
//     event.preventDefault();
//     navigation.reset({routes: [{name: path,params: {hi: 123}}]});
// }

import * as WholeNavigation from './Navigations';

const tabBarListeners = (props) => ({
    tabPress: (event) => {
        event.preventDefault();
        // const action = TabActions.jumpTo(event.target.split("-")[0]);
        // props.navigation.dispatch(action);
        // console.log("HiHIHi")
        props.navigation.reset({routes: [{name: event.target.split("-")[0]}]});
    }
});

const stackListeners = (props) => ({
    tabPress: (event) => {
        props.navigation.reset({routes: [{name: event.target,params: event.route.params}]});
    }
});

// RootStack: {
//                 navigation,
//                 route
//             },


const HomeStack = ({navigation,routes}) => {   
    const HomeStack = createNativeStackNavigator();

    return (
      <NavigationContainer ref={WholeNavigation.InnerTabNavigationRef} independent={true} >
        <HomeStack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}} screenListeners={stackListeners} >
          <HomeStack.Screen
            name="Main"
            component={HomeMainScreen}
          />
          <HomeStack.Screen
            name="Test"
            component={TestScreen}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  };

  const MyAppStack = () => {
    const MyAppStack = createNativeStackNavigator();

    return (
      <NavigationContainer ref={WholeNavigation.InnerTabNavigationRef} independent={true} >
        <MyAppStack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}} >
          <MyAppStack.Screen
            name="Main"
            component={TestScreen}
          />
        </MyAppStack.Navigator>
      </NavigationContainer>
    );
  };

  const UserStack = () => {
    const UserStack = createNativeStackNavigator();
  
    return (
      <NavigationContainer ref={WholeNavigation.InnerTabNavigationRef} independent={true} >
        <UserStack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}} >
          <UserStack.Screen
            name="Main"
            component={TestScreen}
          />
        </UserStack.Navigator>
      </NavigationContainer>
    );
  };

  const SettingStack = () => {
    const SettingStack = createNativeStackNavigator();

    return (
      <NavigationContainer ref={WholeNavigation.InnerTabNavigationRef} independent={true} >
        <SettingStack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}} >
          <SettingStack.Screen
            name="Main"
            component={TestScreen}
          />
        </SettingStack.Navigator>
      </NavigationContainer>
    );
  };

  
  const BottomTab= ({navigation, route}) => {
    const Tab = createBottomTabNavigator();

    const generateDefaultHeaderOption = (props) => {
        const statusBarHeight = getStatusBarHeight(true);
        return {
            ...props,
            tabBarLabelStyle: {fontSize: 16},
    
            tabBarLabel: ({ focused }) => (
                <Text style={
                    focused
                      ? { color: colors.white }
                        : { color: "gray" }
                } >
                    {props.title}
                </Text>
            ),
            tabBarIcon: ({focused}) => 
                {
                    return (
                        <View style={{width: "100%",display: "flex", flexDirection: "row" ,  justifyContent: "center"}} >
                            <Text 
                                style={
                                    focused
                                    ? { color: colors.white }
                                    : { color: "gray" }
                                }
                            >
                                {props.title}
                            </Text>
                        </View>
                    )
                }
            ,
            tabBarStyle: {
                ...props?.tabBarStyle,
                height: config.GNB.height,
                paddingBottom: 20,
                fontSize: 40,
                backgroundColor: colors.mainColor,
                borderTopWidth: 0
                // display: "none"
            },
    
            // headerTitle: ({children}) => <View  style={{width: '100%', display: "flex", flexDirecntion: "row", justifyContent: "center"}} ><Text style={{color: colors.white}}>{children}</Text></View>,
            headerTitle: ({children}) => <HeaderDrawer />,
            headerTitleAlign: "left",
            headerStyle: { 
              backgroundColor: colors.mainColor,
              maxHeiht: config.header.height+statusBarHeight,
              height: config.header.height+statusBarHeight,
              borderBottomWidth: 0,
              borderWidth: 0,
              shadowColor: "transparent"
            },
            style: {backgroundColor: ""},
        }   
    } 

    return (
      <NavigationContainer ref={WholeNavigation.TabNavigationRef} independent={true} >
        <Tab.Navigator initialRouteName="Home" backBehavior="none"   >
              <Tab.Screen name={"Home"}  component={HomeStack} options={(optionsProps)=>({...generateDefaultHeaderOption({...optionsProps,title: "Home",unmountOnBlur: true})})}  /> 
              <Tab.Screen name={"MyApp"} component={MyAppStack} options={(optionsProps)=>({...generateDefaultHeaderOption({...optionsProps,title: "MyApp",unmountOnBlur: true})})} /> 
              <Tab.Screen name={"User"} component={UserStack} options={(optionsProps)=>({...generateDefaultHeaderOption({...optionsProps,title: "User",unmountOnBlur: true})})} /> 
              <Tab.Screen name={"Setting"} component={SettingStack} options={(optionsProps)=>({...generateDefaultHeaderOption({...optionsProps,title: "Setting",unmountOnBlur: true})})} />       
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

export default BottomTab;