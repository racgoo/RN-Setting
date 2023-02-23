import {atom,selector} from "recoil";
import * as api from "../controller/api";

export const userAtom = atom({
    key: 'userAtom',
    default: {
        
    }
});

export const systemAtom = atom({
    key: 'systemAtom',
    default: {
        platform: "",
        RootStackNavigator: null,
        TabNavigator: null,
        InnerTabStackNavigator: null,
    }
});

export const requestSetSystemItem = selector({
    key: "requestSetSystemItem",
    get: ({ get })=> get(systemAtom),
    set: ({ set,get },systemItemObect) => {
        let system = get(systemAtom);
        set(systemAtom,{...system,...systemItemObect});
    }
});


