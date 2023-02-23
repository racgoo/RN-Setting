
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SplashScreen from '../screen/SplashScreen/SplashScreen';
import TestScreen from '../screen/TestScreen/TestScreen';
import LoginScreen from '../screen/LoginScreen/LoginScreen';
import { RootNavigationRef } from './Navigations';

const RootStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer ref={RootNavigationRef}  independent={true} >
          <Stack.Navigator   initialRouteName='Splash' screenOptions={{headerShown: false}} >
          <Stack.Screen name={"Splash"}  component={SplashScreen}  /> 
          <Stack.Screen name={"BottomTab"} component={BottomTab}  options={(optionsProps)=>optionsProps}  />
          <Stack.Screen name={"Test"}  component={TestScreen}  /> 
          <Stack.Screen name={"Login"}  component={LoginScreen} /> 
        </Stack.Navigator>      
    </NavigationContainer>
    )
}
export default RootStack;