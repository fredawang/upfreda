/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import btstyles from '../../css/bootstrap.min.css';
import bttstyles from '../../css/bootstrap-theme.min.css';
import withStyles from '../../decorators/withStyles';
import withContext from '../../decorators/withContext';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import testAction from '../../actions/Test/test';
import testStore from "../../stores/Test/testStore"
import Reflux from 'reflux';
import List from '../List';

@withStyles(btstyles)
@withStyles(bttstyles)
class TestPage extends Component {
   
    static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
    constructor(props){
        super(props);
        
        this.state={
            list:testStore.list
        };
        console.log("constructor");
        this.unsubscribe = testStore.listen(this.onStatusChange.bind(this));
    }
    
    onStatusChange(list) {
        console.log("dd");
        this.setState({list: list});
    }
    componentDidMount() {
        console.log("didMount");
        
        this.unsubscribe = testStore.listen(this.onStatusChange.bind(this));
        this.unsubscribe();
        testAction.getall();
    }

    handleAddClick(){
        console.log("handleclick:click!");
        testAction.addTest(true);
    }
    
    handleDeleteClick(){
        console.log("handledeleteclick:click!");
        testAction.deleteTest(true);
    }
  render() {
    const title = 'Log In';
    this.context.onSetTitle(title);
    console.log("render");
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
            <List name="aaa" items={this.state.list} />
            <ButtonToolbar>
                <Button bsStyle="primary" data-id={this.state.list} bsSize="large" onClick={this.handleAddClick}>Add Button</Button>
                <Button bsSize="large" onClick={this.handleDeleteClick}>Delete Button</Button>
            </ButtonToolbar>
        </div>
      </div>
    );
  }

}

export default TestPage;
