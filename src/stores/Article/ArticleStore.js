import Reflux from 'reflux';
import $ from 'jquery';
import ArticleAction from "../../actions/Article/ArticleAction";

Reflux.StoreMethods .commonStore = function(){console.log(arguments);}
let ArticleStore = Reflux.createStore({
    list:[],
    init:function(){
        this.val = "ArticleStore";
        this.listenTo(ArticleAction.getArticleList, 'getArticleList');
        this.listenTo(ArticleAction.creatArticle, 'creatArticle');
        this.listenTo(ArticleAction.deleteArticle, 'deleteArticle');
        this.listenTo(ArticleAction.updateArticle, 'updateArticle');
    },
    getArticleList:function(model){
        let self = this;
        console.log("ArticleStore:getArticleList");
        $.ajax({
            url:"/api/ArticleList",
            method:"GET",
            success:function(data){
                self.list = data;
                console.log(self.list);
                self.updateArticleList(self.list);
            },
            error:function(){
                console.log("error")
            }
        });
    },
    creatArticle:function(model){
        let self = this;
        console.log("ArticleStore:creatArticle");
        var data = {"title":"title", "content":"content", "creatTime":1400000000};
        $.ajax({
            url:"/api/ArticleList",
            method:"POST",
            data:data,
            success:function(res){
                console.log(self.list);
                if(res.resCode == 200){
                    self.list.push(data);
                }
                console.log(self.list);
                self.updateArticleList(self.list);
            },
            error:function(){
                console.log("error")
            }
        });
    },
    deleteArticle:function(model){
        let self = this;
        console.log("ArticleStore:creatArticle");
        var data = {"title":"title", "content":"content", "creatTime":1400000000};
        $.ajax({
            url:"/api/ArticleList",
            method:"DELETE",
            data:data,
            success:function(res){
                console.log(self.list);
                if(res.resCode == 200){
                    self.list.push(data);
                }
                console.log(self.list);
                self.updateArticleList(self.list);
            },
            error:function(){
                console.log("error")
            }
        });
        this.updateArticleList(list);
    },
    updateArticle:function(model){
        let self = this;
        console.log("ArticleStore:creatArticle");
        var data = {"title":"title", "content":"content", "creatTime":1400000000};
        $.ajax({
            url:"/api/ArticleList",
            method:"PUT",
            data:data,
            success:function(res){
                console.log(self.list);
                if(res.resCode == 200){
                    self.list.push(data);
                }
                console.log(self.list);
                self.updateArticleList(self.list);
            },
            error:function(){
                console.log("error")
            }
        });
        this.updateArticleList(list);
    },
    updateArticleList:function(list){
        this.list = list;
        this.trigger(this.list);
    }
});

export default ArticleStore;