import { View, Text, Pressable, Image } from "react-native";
import PageLayout from "../../components/PageLayout";
import axios from "axios";
//icon
import grayCloseIcon from "../../../public/images/grayCloseIcon.png";

const HomeScreen = (props) => {
    console.log(props)
    const handleNavigate = () => {
        alert("hi");
        //navigate
        // navigation.reset({routes: [{name: 'Splash',params: {hi: 123}}]});


        //reset
        // navigation.reset({routes: [{name: 'Test',params: {hi: 123}}]});

        //replace
        // navigation.replace("Test",{params: "test"});
        
    }


    return (
        <PageLayout>

            <Pressable onPress={handleNavigate} >
                <Image source={grayCloseIcon} style={{width: 18,height: 18}} />
                <Text style={{fontSize: 20}} >한글입니다</Text>
            </Pressable>

        </PageLayout>
    );
}
export default HomeScreen;