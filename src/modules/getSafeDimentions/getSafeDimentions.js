import { Dimensions } from "react-native";
import { getStatusBarHeight } from 'react-native-safearea-height';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
const getSafeDimentions = () => {
    const status = getStatusBarHeight(true);
    const Height = () => {
        if (isIphoneX()) {
        
            return Dimensions.get("window").height - status -          getBottomSpace();
        } else {
        
            return Dimensions.get("window").height - status;
        }
    };
    return {safeHeight: Height(), safeWidth: Dimensions.get("window").width};
}

export default getSafeDimentions;