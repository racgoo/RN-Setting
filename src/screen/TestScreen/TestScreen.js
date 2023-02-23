import { View, Text, Pressable } from "react-native";
import { getInnerTabNavigation, getTabNavigation, navigationIterator } from "../../navigation/Navigations";
import sleep from "../../modules/sleep/sleep";
const TestScreen = ({route,navigation}) => {
    const handleNavigate = () => {

        //이건 좀 이상하긴 한데 일단 중첩 라우팅에서 연속적으로 라우팅 시키는 방식
        // Tab네비게이션의 Home으로 들어가고 Home 에서 Test 스택으로 이동
        navigationIterator([
            [getTabNavigation,"reset",{routes: [{name: 'Home',params: {hi: 123}}]}],
            [getInnerTabNavigation,"reset",{routes: [{name: 'Test',params: {hi: 123}}]}]
        ]);
        
        // setTimeout(()=>{

        //     getInnerTabNavigation().reset({routes: [{name: 'Test',params: {hi: 123}}]});
        // },1000)
        // setTimeout(()=>{navigation.reset({routes: [{name: 'Test',params: {hi: 123}}]});},100);
    }
    return (
        <Pressable onPress={handleNavigate} >
            <Text>HOEM</Text>
        </Pressable>
    );
}
export default TestScreen;