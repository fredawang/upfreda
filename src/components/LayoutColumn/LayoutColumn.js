/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import btstyles from '../../css/bootstrap.min.css';
import bttstyles from '../../css/bootstrap-theme.min.css';
import styles from './LayoutColumn.css';
import withStyles from '../../decorators/withStyles';
import withContext from '../../decorators/withContext';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import Reflux from 'reflux';
import $ from 'jquery';

@withStyles(btstyles)
@withStyles(bttstyles)
@withStyles(styles)
class LayoutColumn extends Component {
   
    static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
    constructor(props){
        super(props);
        console.log("LayoutColumn:constructor");
        this.article = this.props.article;
        this.index = this.props.index;
        this.width = this.props.style.width;
        this.height = this.props.style.height;
        this.computer_style();
    }
    
    
    onStatusChange(list) {
        console.log("LayoutColumn:onStatusChange");
        this.setState({list: list});
    }
    componentDidMount() {
        console.log("LayoutColumn:didMount");
    }

    handleAddClick(){
        console.log("LayoutColumn:handleclick:click!");
        
    }
    moveLiner(distance){
        console.log("move liner");
    }
    handleMouseDown(e){
        $("body").css("cursor","e-resize");
        var self = this;
        let clientX = e.clientX;
        let timer,
            left_width = parseInt(this.state.left_style.width),
            right_width = parseInt(this.state.right_style.width),
            right_pos_left = parseInt(this.state.right_style.left),
            liner_pos_left = parseInt(this.state.liner_style.left);
        $(window).bind("mousemove", function(e){
                timer = setTimeout(function(){
                    let move_dis = e.clientX - clientX;
                    clientX = e.clientX;
                    left_width += move_dis;
                    right_width -= move_dis;
                    right_pos_left += move_dis;
                    liner_pos_left += move_dis;
                    console.log(left_width);
                    if(left_width >= self.left_min_width && right_width >= self.right_min_width){
                        console.log("setState")
                        self.setState(function(preState){
                            let state = preState;
                            state.left_style.width = left_width;
                            state.right_style.width = right_width;
                            state.right_style.left = right_pos_left;
                            state.liner_style.left = liner_pos_left;
                            return state;
                        });
                    }
                    
                }, 1000/6);
                
        });
        $(window).bind("mouseup", function(e){
            clearTimeout(timer);
            $("body").css("cursor","default");
            $(window).unbind("mousemove");
            $(window).unbind("mouseup");
        });
    }
    resize_width(){
        self = this;
        let left_width_percent = parseInt(this.state.left_style.width) / parseInt(this.state.right_style.width);
        let left_width = left_width_percent * (this.width - this.props.liner_width),
            right_width = this.width - this.props.liner_width - left_width,
            right_pos_left = left_width + this.props.liner_width,
            liner_pos_left = left_width;
        self.setState(function(preState){
            let state = preState;
            state.left_style.width = left_width + self.props.unit;
            state.right_style.width = right_width + self.props.unit;
            state.right_style.left = right_pos_left + self.props.unit;
            state.liner_style.width = liner_pos_left + self.props.unit;
            state.container_style.width = self.width + self.unit;
            return state;
        });
    }
    resize_height(){
        self = this;
        self.setState(function(preState){
            let state = preState;
            state.left_style.height = (self.height - self.props.border_width * 2) + self.props.unit;
            state.right_style.height = (self.height - self.props.border_width * 2) + self.props.unit;
            state.container_style.height = self.height + self.unit;
            return state;
        });
    }
    resize_container(){
        if(this.props.width != this.width){
            this.width = this.props.width;
            this.resize_width();
        }
        if(this.props.height != this.height){
            this.height = this.props.height;
            this.resize_height();
        }
    }
    computer_style(){
        let style = this.props.style?this.props.style:{};
        this.unit = style.unit?style.unit:"px";
        this.width = style.width?style.width:500;
        this.left_width_percent = style.left_width_percent?style.left_width_percent:0.5;
        this.height = style.height?style.height:200;
        this.liner_width = style.liner_width?style.liner_width:5;
        this.border_width = style.border_width?style.border_width:0;
        this.liner_color = style.liner_color?style.liner_color:"#000";
        this.border_color = style.border_color?style.border_color:"#000";
        this.left_min_width = style.left_min_width?style.left_min_width:50;
        this.right_min_width = style.right_min_width?style.right_min_width:50;
        
        this.get_container_style();
        this.get_left_container_style();
        this.get_right_container_style();
        this.get_liner_style();
    }
    
    get_container_style(){
        this.state.container_style = {
            height:this.height + this.unit, 
            width:this.width + this.unit,
            border: this.border_width + this.unit + " solid " + this.border_color
        }
    }
    get_left_container_style(){
        this.state.left_style = {
            width: (this.width*this.left_width_percent - this.liner_width) + this.unit,
            height:(this.height - this.border_width*2) + this.unit,
            top:0,
            left:0
        };
    }
    get_right_container_style(){
        this.state.right_style = {
            width: (this.width*this.left_width_percent - this.border_width*2) + this.unit ,
            height:(this.height - this.border_width*2) + this.unit,
            top:0,
            left:this.width*this.left_width_percent + this.unit
        };
    }
    get_liner_style(){
        this.state.liner_style = {
            width: this.liner_width + this.unit ,
            height:(this.height - this.border_width*2) + this.unit,
            top:0,
            left:(this.width*this.left_width_percent - this.liner_width) + this.unit,
            "background":this.liner_color
        };
    }
    render() {
        this.resize_container();
        return (
            <div className="LayoutColumn-container" style={this.state.container_style}>
                <div className="LayoutColumn-left-container f-left-container" style = {this.state.left_style}>{this.props.children[0]}</div>
                <div className="LayoutColumn-liner f-liner" style={this.state.liner_style} onMouseDown={this.handleMouseDown.bind(this)}></div>
                <div className="LayoutColumn-right-container f-right-container" style = {this.state.right_style}>{this.props.children[1]}</div>
            </div>
        );
    }

}

export default LayoutColumn;
