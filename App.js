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
  YellowBox,

} from 'react-native';
import { StackActions } from '@react-navigation/native';

console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning: ...']);

//api
import * as api from "./src/controller/api";

//color sheet
import colors from "./src/style/colors";

//navigation

import RootStack from './src/navigation/RootStack';



//Layout
import PageLayout from './src/components/PageLayout';
import { getStatusBarHeight } from 'react-native-safearea-height';


//Screen
import HomeScreen from "./src/screen/HomeScreen/HomeScreen";
import HomeScreen2 from "./src/screen/HomeScreen2/HomeScreen2";
import HomeScreen3 from "./src/screen/HomeScreen3/HomeScreen3";
import HomeScreen4 from "./src/screen/HomeScreen4/HomeScreen4";
import TestScreen from "./src/screen/TestScreen/TestScreen";
import SplashScreen from './src/screen/SplashScreen/SplashScreen';
import LoginScreen from "./src/screen/LoginScreen/LoginScreen";

//font
import { setCustomText } from 'react-native-global-props';

//images
import leftBlackArrow from "./public/images/leftBlackArrow.png";


//recoil
import { requestSetSystemItem, systemAtom } from './src/recoil/recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';

//navigation tip

        //navigate
        // navigation.navigate("Test",{params: "test"});

        //reset
        // navigation.reset({routes: [{name: 'Test',params: {hi: 123}}]});

        //replace
        // navigation.replace("Test",{params: "test"});
//useFousEffect -> 이거 ㅈ댐  

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  const [system,setSystem]=useRecoilState(systemAtom);
  const setSystemItem = useSetRecoilState(requestSetSystemItem);

  const statusBarHeight = getStatusBarHeight(true);

  setCustomText({ style: { fontFamily: "Pretendard"}});
  
  useEffect(()=>{
    setSystemItem({platform: Platform.OS});
  },[])

  
  

  const resetTabHistory = ({ navigation, route }) => ({
      tabPress: (e) => {
        const state = navigation.getState();
    
        if (state) {
          // Grab all the tabs that are NOT the one we just pressed
          const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);
    
          nonTargetTabs.forEach((tab) => {
            // Find the tab we want to reset and grab the key of the nested stack
            const tabName = tab?.name;
            const stackKey = tab?.state?.key;
    
            // if (stackKey && tabName === TAB_TO_RESET) {
              // Pass the stack key that we want to reset and use popToTop to reset it
              navigation.dispatch({
                ...StackActions.popToTop(),
                target: stackKey,
              });
            // }
          });
        }
      }
    })
  

  

  
  // useEffect(() => {
  //   navigation.setOptions({title: `상세 정보 - ${route.params.id}`});
  // }, [navigation, route.params.id]);


  



  return (
    <RootStack>

    </RootStack>
  );
};

export default App;
