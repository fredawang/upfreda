/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import btstyles from '../../css/bootstrap.min.css';
import bttstyles from '../../css/bootstrap-theme.min.css';
import styles from './ArticleItem.css';
import withStyles from '../../decorators/withStyles';
import withContext from '../../decorators/withContext';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import Reflux from 'reflux';

@withStyles(btstyles)
@withStyles(bttstyles)
@withStyles(styles)
class ArticleItem extends Component {
   
    static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
    constructor(props){
        super(props);
        console.log("ArticleItem:constructor");
        this.article = this.props.article;
        this.index = this.props.index;
    }
    
    onStatusChange(list) {
        console.log("ArticleItem:onStatusChange");
        this.setState({list: list});
    }
    componentDidMount() {
        console.log("ArticleItem:didMount");
    }

    handleAddClick(){
        console.log("ArticleItem:handleclick:click!");
        
    }

    render() {
        console.log("ArticleItem:render");
        return (
          <div className="ArticleItem" data-article_id={this.article_id}>
            <a className="ArticleItem-title" href="/article/item?article_id={this.article_id}">{this.index}、{this.article.title}</a>
          </div>
        );
    }

}

export default ArticleItem;
