/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import btstyles from '../../css/bootstrap.min.css';
import bttstyles from '../../css/bootstrap-theme.min.css';
import styles from './ArticleEdit.css';

import withStyles from '../../decorators/withStyles';
import withContext from '../../decorators/withContext';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import ArticleAction from '../../actions/Article/ArticleAction';
import ArticleStore from "../../stores/Article/ArticleStore"
import Reflux from 'reflux';
import LayoutColumn from '../LayoutColumn';
import TextArea from '../TextArea'; 
import $ from 'jquery';

@withStyles(btstyles)
@withStyles(bttstyles)
@withStyles(styles)
class ArticleEdit extends Component {
   
    static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
    constructor(props){
        super(props);
        this.state={
            LayoutColumn_style:{
                unit:"px",
                width:1500,
                height:200,
                left_width_percent:0.5,
                border_width:5,
                border_color:"#aaa",
                liner_width:5,
                liner_color:"#ccc",
                left_min_width:300,
                right_min_width:300
            }
        };
    }

    componentDidMount() {
        console.log("ArticleEdit:didMount");
        let pre_width = this.state.LayoutColumn_style.width,
            window_width = $(window).width();
        let width = window_width<pre_width?window_width:pre_width;
        let style = this.state.LayoutColumn_style;
        style["width"] = width;
        this.setState({LayoutColumn_style:style});
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
    console.log("ArticleEdit:render")

    return (
      <div className="ArticleEidtPage">
        <div className="ArticleEidtPage-container">
            <LayoutColumn style={this.state.LayoutColumn_style}>
                <TextArea className="f-edit-textarea"></TextArea>
                <div className="f-preview-area"></div>
            </LayoutColumn>
            <ButtonToolbar className="ArticleEditPage-toolbar">
                <Button bsStyle="primary"  bsSize="large" onClick={this.handleAddClick}>保存</Button>
                <Button bsSize="large" onClick={this.handleDeleteClick}>放弃</Button>
            </ButtonToolbar>
        </div>
      </div>
    );
  }

}

export default ArticleEdit;
