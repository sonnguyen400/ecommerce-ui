import { memo, useContext } from "react";
import { Switch } from "antd";
import { GlobalContext } from "../../context";

function DarkModeToggle() {
    const globalState = useContext(GlobalContext);
    function onChange(e) {
        if (e.target.checked) {
            globalState.darkmode.set(true);
        } else {
            globalState.darkmode.set(false);
        }
    }
    return <Switch defaultChecked={globalState.darkmode.value} onChange={() => globalState.darkmode.set(value => !value)} />;
}

export default memo(DarkModeToggle);
