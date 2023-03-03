import { View, Text, Pressable, Image,TouchableOpacity,useWindowDimensions,Modal,SafeAreaView } from "react-native";
import PageLayout from "../../components/PageLayout";
import axios from "axios";
//icon
import grayCloseIcon from "../../../public/images/grayCloseIcon.png";


import Carousel from "react-native-snap-carousel";
import { useEffect, useRef, useState } from "react";

import getSafeDimentions from "../../modules/getSafeDimentions/getSafeDimentions";
import getDimentions from "../../modules/getDimentions/getDimentions";
import blackCloseIcon from "../../../public/images/blackCloseIcon.png";
import WebView from "react-native-webview";
import { useRecoilValue } from "recoil";
import { systemAtom } from "../../recoil/recoil";

const LoginScreen = ({ navigation }) => {
    const system = useRecoilValue(systemAtom);
    const {safeHeight, safeWidth} = getSafeDimentions();
    const {height, width} = getDimentions();
    

    const [isKakaoLoginLoading,setIsKakaoLoginLoading]=useState(false);
    const [kakaoAuthCode,setKakaoAuthCode]=useState(null);


    useEffect(()=>{
      if(kakaoAuthCode){
        //로그인 처리 하고
        navigation.reset({routes: [{name: 'TabNavigation',params: {hi: 123}}]});
      }
    },[kakaoAuthCode])

    const kakaoLogin = () => {
        // https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=63bd446234f6e93a7c007b87c3ae8761&redirect_uri=http://localhost:4444
    }

    const handleOpenKakaoLoginWebView = () => {
      setIsKakaoLoginLoading(true);
    }

    const handleCloseKakaoLoginWebView = () => {
      setIsKakaoLoginLoading(false);
    }

    const carousel = useRef();
    const handleNavigate = () => {

        //navigate
        // navigation.navigate("Test",{params: "test"});


        //reset
        navigation.reset({routes: [{name: 'Test',params: {hi: 123}}]});

        //replace
        // navigation.replace("Test",{params: "test"});
        
    }

    

    const [activeIndex, setActivateIndex] = useState(0); 
    const [carouselState, setCarouselState] = useState([
          {
            title: 'Item 1',
            text: 'Text 1',
          },
          {
            title: 'Item 2',
            text: 'Text 2',
          },
          {
            title: 'Item 3',
            text: 'Text 3',
          },
          {
            title: 'Item 4',
            text: 'Text 4',
          },
          {
            title: 'Item 5',
            text: 'Text 5',
          },
        ],
      );
  
    const _onPressCarousel = (index) => {
      // here handle carousel press
      this.carouselRef.current.snapToItem(index);
    };
  
    const _renderItem = ({ item, index }) => {
      return (
        <View
        //   onPress={() => {
        //     _onPressCarousel(index);
        //   }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 0,
            height: safeHeight,
            padding: 50,
          }}>
          <Text style={{ fontSize: 30 }}>{item.title}</Text>
          <Text>{item.text}</Text>
        </View>
      );
    };

    return (
        <PageLayout safeAreaStyle={{backgroundColor: "#FFFFFF"}} layoutStyle={{backgroundColor: "#FFFFFF"}} > 
            <View style={{width: "100%",height: "100%",display: 'flex', justifyContent: "center", alignItems: "center",position: "relative"}} >
                <View style={{zIndex: -1,position: "absolute",width: "100%", height: "100%"}} >
                    <Carousel
                        loop
                        layout={'default'}
                        ref={this.carouselRef}
                        data={carouselState}
                        sliderHeight={safeHeight}
                        sliderWidth={safeWidth}
                        itemWidth={safeWidth}
                        renderItem={_renderItem}
                        // useScrollView
                        onSnapToItem={(index) => setActivateIndex(index)}
                        activeSlideAlignment="center"
                        activeAnimationType="spring"
                        style={{height: "100%"}}
                    />    
                </View>
                
                {/* <View style={{width: "100%", height: "100%",justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={handleNavigate} >
                        <Text style={{fontSize: 20}} >Splash</Text>
                    </Pressable>
                </View> */}
                <View style={{zIndex: 1,position: "absolute",bottom: 20,paddingHorizontal: 20, width: "100%"}}>
                    {/* <Pressable  onPress={handleOpenKakaoLoginWebView}>     */}
                    <Pressable  onPress={()=>{system.RootStackNavigator.navigation.reset({routes: [{name: 'BottomTab',params: {screen: "MyApp",hi: 123}}]});}}>    
                        <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "red", padding: 12,borderRadius: 10}}>
                            <Text>
                                시작하기
                            </Text>
                        </View>
                    </Pressable>
                    <View style={{height: 20}}></View>
                </View>
            </View>
            {
              isKakaoLoginLoading &&
              <Modal
                animationType="slide"
                transparent={true}
                visible={isKakaoLoginLoading}
                onRequestClose={handleCloseKakaoLoginWebView}
              >
                <View style={{zIndex: 1,position: "absolute", width: "100%",height: "100%",backgroundColor: "#FFFFFF"}}>
                  <SafeAreaView>
                    <View style={{width: "100%", height: "100%",display: "flex", position: "relative"}}>
                      <Pressable onPress={handleCloseKakaoLoginWebView} >
                        <Image source={blackCloseIcon} style={{width: 20, height: 20,marginHorizontal: 10,marginVertical: 10}}/>
                      </Pressable>
                      <WebView
                         onLoadProgress={({ nativeEvent }) => {
                            if(nativeEvent?.url){
                              if(nativeEvent.url.indexOf("http://localhost:4444/?code=")!==-1){
                                setKakaoAuthCode(nativeEvent.url.split("code=")[1]);
                                handleCloseKakaoLoginWebView();
                              }else if(nativeEvent.url.indexOf("error_description")!==-1){
                                handleCloseKakaoLoginWebView();
                              }
                            }
                       }}
                        source={{ uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=63bd446234f6e93a7c007b87c3ae8761&redirect_uri=http://localhost:4444' }}
                      />
                    </View>
                  </SafeAreaView>
                </View>
              </Modal>
            }
        </PageLayout>
    );
}
export default LoginScreen;





