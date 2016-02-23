/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */


class cookie {
    setCookie(name){
        let hours = 1;
        let exp = new Date();
        exp.setTime(exp.getTime() + hours*60*60*1000);
        document.cookie = "name="+ escape (name) + ";expires=" + exp.toGMTString();
    }
    getCookie(){
        let arr,reg=new RegExp("(^| )name=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    deleteCookie(){
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval=getCookie();
        if(cval!=null)
            document.cookie= "name="+cval+";expires="+exp.toGMTString();
    }
}
let Cookie = new cookie();
export default Cookie;
