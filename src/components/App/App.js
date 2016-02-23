/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import btstyles from '../../css/bootstrap.min.css';
import bttstyles from '../../css/bootstrap-theme.min.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import Footer from '../Footer';

@withContext
@withStyles(styles)
@withStyles(btstyles)
@withStyles(bttstyles)
class App extends Component { 

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  render() {
    return !this.props.error ? (
      <div>
        <Header />
        {this.props.children}
        
        <Feedback />
        <Footer />
      </div>
    ) : this.props.children;
  }

}

export default App;
