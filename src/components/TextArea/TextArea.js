/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './TextArea.css';

@withStyles(styles)
class TextArea extends Component {


  render() {
    return (
      <div className="TextArea">
          <textarea {...this.props} className="TextArea-input" ref="input" key="input"/>
      </div>
    );
  }

}

export default TextArea;
