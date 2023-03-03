import { View, Text, Pressable, Image } from "react-native";
import PageLayout from "../../components/PageLayout";
import axios from "axios";
//icon
import grayCloseIcon from "../../../public/images/grayCloseIcon.png";

const HomeScreen = ({ navigation }) => {
    const handleNavigate = () => {

        //navigate
        navigation.navigate("Test",{params: "test"});


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