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

class ArticleList extends Component {
   
    static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
    constructor(props){
        super(props);
        
        this.state={
            list:ArticleStore.list
        };
        console.log("ArticleList:constructor");
        this.unsubscribe = ArticleStore.listen(this.onStatusChange.bind(this));
    }
    
    onStatusChange(list) {
        console.log("ArticleList:onStatusChange");
        this.setState({list: list});
    }
    componentDidMount() {
        console.log("ArticleList:didMount");
        
        //this.unsubscribe = ArticleStore.listen(this.onStatusChange.bind(this));
        ArticleAction.getArticleList();
        //this.unsubscribe();
        
        console.log("ArticleList:" + this.state.list);
    }

    handleAddClick(){
        console.log("handleclick:click!");
        ArticleAction.creatArticle(true);
    }
    
    handleDeleteClick(){
        console.log("handledeleteclick:click!");
        ArticleAction.deleteArticle(true);
        //ArticleAction.updateArticle(true);
    }
  render() {
    const title = '文章列表';
    this.context.onSetTitle(title);
    console.log("ArticleList:render");
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
            <List className="list-container"  items={this.state.list} />
            <ButtonToolbar>
                <Button bsStyle="primary" data-id={this.state.list} bsSize="large" onClick={this.handleAddClick}>Add Button</Button>
                <Button bsSize="large" onClick={this.handleDeleteClick}>Delete Button</Button>
            </ButtonToolbar>
        </div>
      </div>
    );
  }

}

export default ArticleList;
