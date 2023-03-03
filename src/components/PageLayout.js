import { SafeAreaView, ScrollView, StatusBar, View } from "react-native"
import colors from "../style/colors";
const PageLayout = ({children,layoutStyle={},safeAreaStyle={}}) => {
    return (
        <SafeAreaView   style={safeAreaStyle} >
            <StatusBar barStyle={'dark-content'} />
            <View style={{width: "100%", height: "100%",display: "flex",backgroundColor: colors.black}}  contentInsetAdjustmentBehavior="automatic" >
                {children}
            </View>
        </SafeAreaView>
    )
}
export default PageLayout;