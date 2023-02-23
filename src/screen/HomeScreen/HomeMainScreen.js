import { View, Text, Pressable, Image } from "react-native";
import PageLayout from "../../components/PageLayout";
import axios from "axios";
//icon
import grayCloseIcon from "../../../public/images/grayCloseIcon.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { requestSetSystemItem, systemAtom } from "../../recoil/recoil";
import { useEffect } from "react";
import WebView from "react-native-webview";
import Swiper from "react-native-swiper";
import { Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { RootNavigate } from "../../navigation/Navigations";
import * as WholeNavigation from "../../navigation/Navigations";

const HomeMainScreen = ({navigation,routes}) => {
    const setSystemItem = useSetRecoilState(requestSetSystemItem);
    const system = useRecoilValue(systemAtom);


    const handleNavigate = () => {
        WholeNavigation.getRootNavigation().reset({routes: [{name: 'Splash',params: {hi: 123}}]});


        //navigate
        // navigation.reset({routes: [{name: 'Splash',params: {hi: 123}}]});

        //reset
        // navigation.reset({routes: [{name: 'Test',params: {hi: 123}}]});

        //replace
        // navigation.replace("Test",{params: "test"});
        
    }


    return (
        <PageLayout>
            <PanGestureHandler 
                onGestureEvent={(e)=>{
                    console.log(e.nativeEvent.translationY);
                }} 
            >
                <Pressable onPress={handleNavigate}>
                <View><Text>aaa</Text></View>
                    </Pressable>
            </PanGestureHandler>
            {/* <View style={{flex: 1,borderWidth: 2, borderColor: "red"}}>
                <WebView source={{uri: "https://www.naver.com"}} style={{width: "100%", height: "100%"}} />
            </View>

            <View style={{height: 20}} ></View>
            <Swiper>
                <View style={{height: 20}} ></View>
            </Swiper> */}
            
        </PageLayout>
    );
}
export default HomeMainScreen;