import Reflux from 'reflux';
import TestAction from "../../actions/Test/test";

Reflux.StoreMethods .commonStore = function(){console.log(arguments);}
let TestStore = Reflux.createStore({
    list:['list'],
    init:function(){
        this.val = "testStore";
        this.listenTo(TestAction.addTest, 'addItem');
        this.listenTo(TestAction.deleteTest, 'deleteItem');
        this.listenTo(TestAction.getallsuccess, 'getall');
    },
    getall:function(model){
        console.log("getall success");
        this.list = ["list0"];
    },
    addItem:function(model){
        console.log("teststore:addItem1");
        let list = this.list;
        list.push("list" + this.list.length);
        this.updatelist(list);
    },
    deleteItem:function(model){
        console.log("deleteItem"); 
        let list = this.list.slice(0, this.list.length - 1);
        this.updatelist(list);
    },
    updatelist:function(list){
        this.list = list;
        console.log("trigger:");
        console.log(this.list);
        this.trigger(this.list);
    }
});

export default TestStore;