import React, { memo } from "react";
import style from './style.module.scss';

class SelectCustom extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.setValue = this.setValue.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onBlur = this.toggle.bind(this);
    }
    static Option = class extends React.Component {
        render() {
            return <div data-value={this.props['data-value']} className={style.option}>{this.props.children}</div>
        }
    }
    setValue(e) {
        var element = e.target;
        while (!element.classList.contains(style.option)) {
            element = element.parentElement
        }
        this.ref.current.setAttribute("data-value", element.getAttribute('data-value'));
        this.ref.current.querySelector(`.${style.content}`).innerHTML = element.innerHTML;
        if (this.props.onChange) {
            this.props.onChange(e.target.getAttribute('data-value'));
        }
        this.ref.current.querySelector(`.${style.menuOption}`).style.display = "none";
    }
    toggle(e) {
        var menu = this.ref.current.querySelector(`.${style.menuOption}`);
        var state = menu.style.display;
        if (state === 'none') menu.style.display = "block";
        else menu.style.display = "none";
    }
    onBlur() {
        this.ref.current.querySelector(`.${style.menuOption}`).display = "none";
    }
    componentDidMount() {
        this.ref.current.querySelector(`.${style.selectContent}`).addEventListener("click", this.toggle);
        this.ref.current.addEventListener("blur", this.onBlur)
    }
    componentWillUnmount() {
        var options = this.ref.current.querySelectorAll(`.${style.option}`);
        for (var option of options) {
            option.removeEventListener('click', this.setValue);
        }
        this.ref.current.removeEventListener("blur", this.onBlur)
        this.ref.current.querySelector(`.${style.selectContent}`).removeEventListener("click", this.toggle);
    }
    componentDidUpdate() {
        var options = this.ref.current.querySelectorAll(`.${style.option}`);
        if (options.length > 0) {
            this.ref.current.querySelector(`.${style.content}`).innerHTML = options[0].innerHTML;
            this.ref.current.setAttribute("data-value", options[0].getAttribute("data-value"));
        }
        for (let option of options) {
            option.removeEventListener('click', this.setValue);
        }
        for (let option of options) {
            option.addEventListener('click', this.setValue);
        }
    }
    render() {
        return <div ref={this.ref} key={this.key} className={style.dropdown} tabIndex={0}>
            <div className={style.selectContent}>
                <div className={style.content}></div>
                <i className="fi fi-rr-caret-down"></i>
            </div>
            <div className={style.menuOption} style={{ display: 'none' }}>
                {this.props.children}
            </div>
        </div>
    }
}
export default SelectCustom;