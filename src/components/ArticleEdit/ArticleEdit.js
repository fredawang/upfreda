/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import btstyles from '../../css/bootstrap.min.css';
import bttstyles from '../../css/bootstrap-theme.min.css';

import withStyles from '../../decorators/withStyles';
import withContext from '../../decorators/withContext';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import ArticleAction from '../../actions/Article/ArticleAction';
import ArticleStore from "../../stores/Article/ArticleStore"
import Reflux from 'reflux';
import List from '../List';

@withStyles(btstyles)
@withStyles(bttstyles)

class ArticleEdit extends Component {
   
    static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log("ArticleEdit:didMount");
    }

    handleSaveClick(){
        console.log("handleclick:click!");
        ArticleAction.creatArticle(true);
    }
    
    handleCancelClick(){
        console.log("handledeleteclick:click!");
    }
  render() {
    const title = '文章列表';
    this.context.onSetTitle(title);
    console.log("ArticleEdit:render");
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
            
            <ButtonToolbar>
                <Button bsStyle="primary"  bsSize="large" onClick={this.handleAddClick}>保存</Button>
                <Button bsSize="large" onClick={this.handleDeleteClick}>放弃</Button>
            </ButtonToolbar>
        </div>
      </div>
    );
  }

}

export default ArticleEdit;
