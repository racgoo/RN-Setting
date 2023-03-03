import { View, Text, Pressable, Image,TextInput } from "react-native";
import { useState, useRef, useEffect } from "react";

import PageLayout from "../../components/PageLayout";
import axios from "axios";

//icon
import grayCloseIcon from "../../../public/images/grayCloseIcon.png";
import downBlackArrow from "../../../public/images/downBlackArrow.png";
import upBlackArrow from "../../../public/images/upBlackArrow.png";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { requestSetSystemItem, systemAtom } from "../../recoil/recoil";


import WebView from "react-native-webview";

import Swiper from "react-native-swiper";
import { Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import * as WholeNavigation from "../../navigation/Navigations";


import colors from "../../style/colors";



const topDrawerMinHeight = 20;
const topDrawerMaxHeight = 60;

const HomeMainScreen = ({navigation,routes}) => {
    const setSystemItem = useSetRecoilState(requestSetSystemItem);
    const system = useRecoilValue(systemAtom);
    const webviewRef = useRef();

    const [topDrawerHeight,setTopDrawerHeight]=useState(topDrawerMinHeight);
    const animationtopDrawerHeight = useRef(new Animated.Value(topDrawerMinHeight)).current;


    //browser navigation state
    const [uri,setUri] = useState("https://www.google.com");
    const [tmpUri,setTmpUri] = useState(uri);
    

    useEffect(()=>{
        // console.log(topDrawerHeight)
        Animated.timing(animationtopDrawerHeight, {
            toValue: topDrawerHeight,
            useNativeDriver: false,
            duration: 120
        }).start();

    },[topDrawerHeight])

    const [topDrawerHeightOffset,setTopDrawerHeightOffset]=useState(0);

    
    
    const handleNavigate = () => {
        WholeNavigation.getRootNavigation().reset({routes: [{name: 'Splash',params: {hi: 123}}]});
  

        //navigate
        // navigation.reset({routes: [{name: 'Splash',params: {hi: 123}}]});

        //reset
        // navigation.reset({routes: [{name: 'Test',params: {hi: 123}}]});

        //replace
        // navigation.replace("Test",{params: "test"});
        
    }

    const injectionJavaScript = `
    // script 
    //   window.ReactNativeWebView.postMessage('injected javascript works!');
      true; // note: this is required, or you'll sometimes get silent failures   
`;

    useEffect(()=>{
        setTimeout(()=>{
            webviewRef.current.injectJavaScript(injectionJavaScript);
        },1);
    },[webviewRef])

    onBrowserMessage = (event) => { 
        console.log(event.nativeEvent.data); 
    };

    onNavigationStateChange = (webViewState) => {
        setUri(webViewState.url);
        setTmpUri(webViewState.url);
    }

    return (
        <PageLayout>
            {/* <View style={{backgroundColor: "red"}} ><Text>aaa</Text></View> */}
            <View style={{position: "relative"}} >
                <PanGestureHandler 
                    minPointers={1}
                    maxPointers={1}
                    onHandlerStateChange={(e)=>{
                        if(e.nativeEvent.numberOfPointers===0){
                            setTopDrawerHeightOffset(0);
                        }
                    }}
                    onGestureEvent={(e)=>{
                        // console.log(e)
                            let translationY = e.nativeEvent.translationY;
                            let result = translationY-topDrawerHeightOffset;
                            setTopDrawerHeightOffset(translationY);
                            if(result<0){
                                if(topDrawerHeight>topDrawerMinHeight){
                                    if(topDrawerHeight+result<topDrawerMinHeight){
                                        setTopDrawerHeight(topDrawerMinHeight);    
                                    }else{
                                        setTopDrawerHeight(topDrawerHeight+result);
                                    }
                                }
                            }else if(result>0){
                                if(topDrawerHeight<topDrawerMaxHeight){
                                    if(topDrawerHeight+result>topDrawerMaxHeight){
                                        setTopDrawerHeight(topDrawerMaxHeight);    
                                    }else{
                                        setTopDrawerHeight(topDrawerHeight+result);
                                    }
                                }
                            }
                    }} 
                >

                    <Animated.View style={[{height: animationtopDrawerHeight,width: "100%", backgroundColor: colors.lightBlack,display: "flex",justifyContent: "flex-end", position: "relative"}]} >

                        <View style={{height: topDrawerMaxHeight-topDrawerMinHeight, width: "100%",backgroundColor: "#FFFFFF"}} >
                            <TextInput
                                style={{borderWidth: 1, borderRadius: 4, borderColor: colors.mainColor, color: colors.lightBlack,padding: 4}}
                                onChangeText={(text)=>{setTmpUri(text)}}
                                value={tmpUri}
                                placeholder="useless placeholder"
                                keyboardType="url"
                                onSubmitEditing={(e)=>{
                                    setUri(tmpUri);
                                }}
                                returnKeyType="go"
                            />
                        </View>


                        <View style={{position: "relative",height: 20, alignItems: "center",bottom: 0,zIndex: 10}} >
                            <Pressable 
                                hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }} 
                                onPress={(e)=>{
                                    topDrawerHeight===topDrawerMaxHeight ?
                                        setTopDrawerHeight(topDrawerMinHeight)
                                    :
                                        setTopDrawerHeight(topDrawerMaxHeight)
                                }} >
                                {
                                    topDrawerHeight===topDrawerMaxHeight
                                    ?
                                        <Image source={upBlackArrow} style={{width: 18,height: 18,marginTop: 2}} />
                                    :
                                        <Image source={downBlackArrow} style={{width: 18,height: 18,marginTop: 2}} />
                                }
                                
                            </Pressable>
                        </View>

                    </Animated.View >


                </PanGestureHandler>
            </View>
            
            <View style={{flex: 1}}>
                <WebView 
                    ref={webviewRef} 
                    source={{uri: uri}} 
                    style={{width: "100%", height: "100%"}}  
                    onMessage ={onBrowserMessage} 
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onNavigationStateChange={onNavigationStateChange}
                    // allowsFullscreenVideo={true} 
                    // allowsBackForwardNavigationGestures={true}
                />
            </View>

            {/* <View style={{height: 20}} ></View>
            <Swiper>
                <View style={{height: 20}} ></View>
            </Swiper> */}
            
        </PageLayout>
    );
}
export default HomeMainScreen;