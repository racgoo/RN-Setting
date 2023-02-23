import App from "./App";
import { RecoilRoot } from "recoil";

const AppWrapper = () => {
    return <RecoilRoot>
            <App />
        </RecoilRoot>
}
export default AppWrapper;