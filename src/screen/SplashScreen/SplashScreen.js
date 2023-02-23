import { View, Text, Pressable, Image,TouchableOpacity,useWindowDimensions } from "react-native";
import PageLayout from "../../components/PageLayout";
import axios from "axios";
import { useEffect } from "react";
import { requestSetSystemItem } from "../../recoil/recoil";
import { useSetRecoilState } from "recoil";
//icon



const SplashScreen = ({ navigation,routes }) => {
  const setSystemItem = useSetRecoilState(requestSetSystemItem);
  useEffect(()=>{
    //RootStack Navigator 등록
    setSystemItem({RootStackNavigator: {navigation,routes}});
  },[])
  useEffect(()=>{
    setTimeout(()=>{navigation.reset({routes: [{name: 'BottomTab',params: {hi: 123}}]});},100);
  },[])
  
    return (
        <PageLayout safeAreaStyle={{backgroundColor: "#FFFFFF"}} layoutStyle={{backgroundColor: "#FFFFFF"}} > 
          <View style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Text>Splash</Text>
          </View>
        </PageLayout>
    );
}
export default SplashScreen;