import { Link } from 'react-router-dom';
import style from './style.module.scss';
import clsx from 'clsx';
import React from 'react';
import { List } from 'antd';

class LinkListItem extends React.Component {
    constructor({ to }) {
        super();
        this.to = to;
    }
    static Icon = class extends React.Component {
        render() {
            return (<span className={clsx(style.icon, style.iconMain)}>
                {this.props.children}
            </span>)
        }
    }
    static Text = class extends React.Component {
        render() {
            return (<span className={clsx(style.text)}>{this.props.children}</span>);
        }
    }
    static Content = class extends React.Component {
        render() {
            return (<span className={clsx(style.content)}>{this.props.children}</span>);
        }
    }
    render() {
        return (<List.Item className={clsx(style.item, this.props.className)}>
            <Link to={this.props.to} className={clsx(style.link)}>
                {this.props.children}
                {this.props.children.length < 3 && <span className={clsx(style.icon)}>
                    <i className="fi fi-rr-angle-small-right"></i>
                </span>}
            </Link>
        </List.Item>)
    }
}
export default LinkListItem;