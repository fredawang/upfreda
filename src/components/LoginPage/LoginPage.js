/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.css';
import btstyles from '../../css/bootstrap.min.css';
import bttstyles from '../../css/bootstrap-theme.min.css';
import withStyles from '../../decorators/withStyles';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import LoginAction from '../../actions/Login/LoginAction';
import LoginStore from "../../stores/Login/LoginStore";
import $ from 'jquery';


@withStyles(styles)
@withStyles(btstyles)
@withStyles(bttstyles)
class LoginPage extends Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };
    
    handleLoginClick(a){
        let result = LoginAction.login($("#user").val(), $("#password").val(), function(result){
            if(result.resCode == 200){
                console.log("200");
                window.location.href="/articleList";
            } else {
                alert(result.resReason);
            }
        });
    }
    
    handleCancelClick(){
        console.log("handleclick:click!");
        /*LoginAction.logout(function(){
            $("#user").val("");
            $(".password").val("");
        });*/
    }
    
    render() {
        const title = 'Log In';
        this.context.onSetTitle(title);
        return (
          <div className="LoginPage">
            <div className="LoginPage-container">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="user" className="col-sm-4 control-label">User</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" id="user" placeholder="user"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-4 control-label">passowrd</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" id="password" placeholder="password"/>
                        </div>
                    </div>
                    <ButtonToolbar className="text-center">
                        <Button bsStyle="primary" bsSize="large" className="btn login" onClick={this.handleLoginClick}>登录</Button>
                        <Button bsSize="large" className="btn cancel" onClick={this.handleCancelClick}>重置</Button>
                    </ButtonToolbar>
                </form>
            </div>
          </div>
        );
    }

}

export default LoginPage;
