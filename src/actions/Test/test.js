/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import Reflux from 'reflux';
import $ from 'jquery';
import CommonAction from '../Common/CommonAction';


let TestAction = Reflux.createActions([
    'getall',
    'getallsuccess',
    'addTest',
    'deleteTest'
]);

TestAction.getall.preEmit = function(){
    console.log("getall preEmit");
    return $.ajax({
        url:"/api/getlist",
        method:"GET",
        success:function(data){console.log(data);},
        error:function(){console.log("error")}
    });
}


export default TestAction;
