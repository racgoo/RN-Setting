import * as React from 'react';

export const RootNavigationRef = React.createRef();
export const TabNavigationRef = React.createRef();
export const InnerTabNavigationRef = React.createRef();

export const getRootNavigation = () => {
    return RootNavigationRef.current;
} 

export const getTabNavigation = () => {
    return TabNavigationRef.current;
} 

export const getInnerTabNavigation = () => {
    return InnerTabNavigationRef.current;
} 


//queue item ==> [navigationCall function,navigation function,parameters]
//queue example [[navigation.reset,params]]
export const navigationIterator = (queue) => {
    queue.forEach(
        (routingInfo,index)=>{
            setTimeout(()=>{
                routingInfo[0]()[routingInfo[1]](routingInfo[2]);
            },index*100);
        }
    )
}
