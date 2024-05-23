import { memo, useContext } from "react";
import Switch from "../../components/swich-button";
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
    return <Switch onChange={onChange} checked={globalState.darkmode.value} />;
}

export default memo(DarkModeToggle);
