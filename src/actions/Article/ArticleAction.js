import Reflux from 'reflux';
import $ from 'jquery';
import CommonAction from '../Common/CommonAction';


let ArticleAction = Reflux.createActions([
    'getArticleList',
    'creatArticle',
    'deleteArticle',
    'updateArticle'
]);

/*ArticleAction.getArticleList.preEmit = function(){
    console.log("ArticleAction: getall preEmit");
    return $.ajax({
        url:"/api/getArticleList",
        method:"GET",
        success:function(data){
            console.log(data);
        },
        error:function(){
            console.log("error")
        }
    });
}*/


export default ArticleAction;
