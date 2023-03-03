import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { View, Text, Animated, Pressable,StyleSheet } from "react-native";
import colors from "../../style/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import BottomSheet from '@gorhom/bottom-sheet';
import { PanGestureHandler } from "react-native-gesture-handler";

const HeaderDrawer = ({children}) => {

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

    
    
    const openBottomSheet = () => {
        setShowBottomSheet(false)
    }
    const closeBottomSheet = () => {
        setShowBottomSheet(false)
    }

    const handleClick = () => {

    }

    const handleSwipe = () => {

    }

    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);
  
    // callbacks
    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);

    return (
        <View  style={{width: '100%', display: "flex", flexDirecntion: "row", justifyContent: "center"}} >
            <Pressable onPress={()=>{openBottomSheet}} >
                <Text style={{color: colors.white, fontSize: 20}}>{"Swim"}</Text>
            </Pressable>
            {/* <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet> */}
            {/* <BottomSheet show={isBottomSheetOpen} height={290} onOuterClick={closeBottomSheet} >
                <View style={{width: "100%"}}>
                    <Text>
                        "Hi"
                    </Text>
                </View>
            </BottomSheet> */}
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });


export default HeaderDrawer