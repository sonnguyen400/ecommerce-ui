import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import style from './style.module.scss';
function SelectCustoms({ children, onChange, ...props }) {
    const ref = useRef();
    useEffect(() => {
        var options = ref.current.querySelectorAll(`.${style.option}`);
        if (!hasSelected(options) && options.length > 0) options[0].setAttribute("data-selected", true);
        updateSelected(options);
        for (let option of options) {
            option.addEventListener("click", setValue)
        }
        return () => {
            for (let option of options) {
                option.removeEventListener("click", setValue)
            }
        }
    }, [children])
    function updateSelected(options) {
        for (let option of options) {
            if (option.getAttribute("data-selected") === "true") {
                ref.current.querySelector(`.${style.content}`).innerHTML = option.innerHTML;
                ref.current.setAttribute("data-value", option.getAttribute("data-value"));

            }
        }
    }


    function setValue(e) {
        var element = e.target;
        while (!element.classList.contains(style.option)) {
            element = element.parentElement
        }
        var options = ref.current.querySelectorAll(`.${style.option}`);
        for (let option of options) {
            option.removeAttribute("data-selected");
        }
        element.setAttribute("data-selected", true);
        updateSelected(options);
        var value = element.getAttribute('data-value');
        if (onChange) {
            onChange(value)
        }
        toggle();
    }
    function toggle(e) {
        var menu = ref.current.querySelector(`.${style.menuOption}`);
        var state = menu.style.display;
        if (state === 'none') menu.style.display = "block";
        else menu.style.display = "none";
    }
    function hasSelected(options) {
        for (let option of options) {
            if (option.getAttribute("data-selected") === "true") return true;
        }
        return false;
    }
    return <div ref={ref} {...props} className={style.dropdown} tabIndex={0}>
        <div className={style.selectContent} onClick={toggle}>
            <div className={style.content}></div>
            <i className="fi fi-rr-caret-down"></i>
        </div>
        <div className={style.menuOption} style={{ display: 'none' }}>
            {children}
        </div>
    </div>;
}

export default memo(SelectCustoms);