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
        let default_config = {
            unit:"px",
            container_width:500,
            container_height:200,
            border_width:5,
            left_width_percent:0.5,
            container:{
                
            },
            left_container:{
                
            },
            right_container:{
                
            }
            
        }
        
        this.config = $.extend({}, default_config, this.props.style);
        
        this.state = {
            width:this.config.width,
            height:this.config.height,
            distance:0
        }
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
    
    handleMouseDown(e){
        $("body").css("cursor","e-resize");
        var self = this;
        let clientX = e.clientX;
        let timer,
            left_width = parseInt(this.left_style.width),
            right_width = parseInt(this.right_style.width),
            right_pos_left = parseInt(this.right_style.left),
            liner_pos_left = parseInt(this.liner_style.left);
        $(window).bind("mousemove", function(e){
                timer = setTimeout(function(){
                    let move_dis = e.clientX - clientX;
                    clientX = e.clientX;
                    left_width += move_dis;
                    right_width -= move_dis;
                    right_pos_left += move_dis;
                    liner_pos_left += move_dis;
                    if(left_width >= self.left_min_width && right_width >= self.right_min_width){
                        self.left_style.width = left_width + self.unit;
                        self.right_style.width = right_width + self.unit;
                        self.right_style.left = right_pos_left + self.unit;
                        self.liner_style.left = liner_pos_left + self.unit;
                        console.log("aaa");
                        console.log(self.left_style);
                        self.render();
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
        let left_width_percent = parseInt(this.left_style.width) / parseInt(this.right_style.width);
        console.log(left_width_percent);
        let left_width = left_width_percent * (this.width - this.liner_width),
            right_width = this.width - this.liner_width - left_width,
            right_pos_left = left_width + this.liner_width,
            liner_pos_left = left_width;
        this.left_style.width = left_width + this.unit;
        this.right_style.width = right_width + this.unit;
        this.right_style.left = right_pos_left + this.unit;
        this.liner_style.left = liner_pos_left + this.unit;
        this.container_style.width = this.width + this.unit;
    }
    resize_height(){
        this.left_style.height = (this.height - this.border_width * 2) + this.unit;
        this.right_style.height = (this.height - this.border_width * 2) + this.unit;
        this.container_style.height = this.height + this.unit;
    }
    resize_container(){
        let resize_flag = false;
        if(this.props.style.width != this.width){
            this.width = this.props.style.width;
            this.resize_width();
            resize_flag = true;
        }
        if(this.props.style.height != this.height){
            this.height = this.props.style.height;
            this.resize_height();
            resize_flag = true;
        }
    }
    computer_style(){
        let style = this.props.style?this.props.style:{};
        this.unit = style.unit?style.unit:"px";
        this.left_width_percent = style.left_width_percent?style.left_width_percent:0.5;
        this.liner_width = style.liner_width?style.liner_width:5;
        this.border_width = style.border_width?style.border_width:0;
        this.liner_color = style.liner_color?style.liner_color:"#000";
        this.border_color = style.border_color?style.border_color:"#000";
        this.left_min_width = style.left_min_width?style.left_min_width:50;
        this.right_min_width = style.right_min_width?style.right_min_width:50;
        
        
        
        this.computer_show_style();
    }
    computer_show_style(){
        this.get_container_style();
        this.get_left_container_style();
        this.get_right_container_style();
        this.get_liner_style();
    }
    get_container_style(){
        this.container_style = {
            height:this.height + this.unit, 
            width:this.width + this.unit,
            border: this.border_width + this.unit + " solid " + this.border_color
        };
        console.log(this.container_style);
    }
    get_left_container_style(){
        this.left_style = {
            width: (this.width*this.left_width_percent - this.liner_width) + this.unit,
            height:(this.height - this.border_width*2) + this.unit,
            top:0,
            left:0
        };
    }
    get_right_container_style(){
        console.log("right" + (this.width*(1-this.left_width_percent) - this.border_width*2));
        this.right_style = {
            width: (this.width*(1-this.left_width_percent) - this.border_width*2) + this.unit ,
            height:(this.height - this.border_width*2) + this.unit,
            top:0,
            left:this.width*this.left_width_percent + this.unit
        };
    }
    get_liner_style(){
        this.liner_style = {
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
            <div className="LayoutColumn-container" style={this.container_style}>
                <div className="LayoutColumn-left-container f-left-container" style = {this.left_style}>{this.props.children[0]}</div>
                <div className="LayoutColumn-liner f-liner" style={this.liner_style} onMouseDown={this.handleMouseDown.bind(this)}></div>
                <div className="LayoutColumn-right-container f-right-container" style = {this.right_style}>{this.props.children[1]}</div>
            </div>
        );
    }

}

export default LayoutColumn;
