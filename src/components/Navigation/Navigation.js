/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/articleList" onClick={Link.handleClick}>文章</a>
        <a className="Navigation-link" href="/practiceList" onClick={Link.handleClick}>实例</a>
        <a className="Navigation-link" href="/login" onClick={Link.handleClick}>登录</a>
        <a className="Navigation-link" href="/register" onClick={Link.handleClick}>退出</a>
      </div>
    );
  }

}

export default Navigation;
