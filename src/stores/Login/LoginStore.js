import Reflux from 'reflux';
import $ from 'jquery';
import LoginAction from "../../actions/Login/LoginAction";
import hex_sha1 from '../../utils/sha1';
import Cookie from '../../Cookie';

Reflux.StoreMethods .commonStore = function(){console.log(arguments);}
let LoginStore = Reflux.createStore({
    list:[],
    init:function(){
        this.val = "LoginStore";
        this.listenTo(LoginAction.login, 'login');
        this.listenTo(LoginAction.logout, 'logout');
    },
    login:function(user, password, callback){
        let result = {"resCode":200, "resReason":""};
        let sha = hex_sha1(user + password);
        if(sha == "803041ce3ecc9710d2f83cdee25f149ff8860eac"){
            Cookie.setCookie(user);
        } else {
            result.resCode = 500;
            result.resReason = "用户名密码不正确";
        }
        callback(result);
    },
    logout:function(callback){
        Cookie.deleteCookie();
        callback();
    }
});

export default LoginStore;