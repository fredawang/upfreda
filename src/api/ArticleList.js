import { join } from 'path';
import { Router } from 'express';
import bodyParser from 'body-parser';
import jade from 'jade';
import fm from 'front-matter';
import fs from '../utils/fs';
import mongodb from 'mongodb';


const getArticleListRouter = new Router();
getArticleListRouter.use(bodyParser.json()); // support json encoded bodies
getArticleListRouter.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
getArticleListRouter.route("/")
    .get(function(req, res){
        console.log("getArticleListRouter:get/");
        let article_list = [];
        let MongoClient = new mongodb.MongoClient();
        MongoClient.connect("mongodb://localhost:27017/Blog", function(err, db){
            var collection = db.collection("ArticleList");
            collection.find().toArray(function(err,doc){
                res.json(doc); 
            });
        });
    })
    .post(function(req, res){
        console.log("getArticleListRouter:post/");
        console.log(req.body);
        let article_list = [];
        let MongoClient = new mongodb.MongoClient();
        MongoClient.connect("mongodb://localhost:27017/Blog", function(err, db){
            var collection = db.collection("ArticleList");
            collection.insertOne(req.body, function(err,r){
                if(r.insertedCount == 1){
                    res.json({"resCode":200});
                } else {
                    res.json({"resCode":500,"resReason":"unkown"});
                }
            })
        });
    })
    .put(function(req, res){
        console.log("getArticleListRouter:put/");
        console.log(req.body);
        let newContent = req.body;
        newContent.title = "articel title 1";
        console.log(newContent);
        let article_list = [];
        let MongoClient = new mongodb.MongoClient();
        MongoClient.connect("mongodb://localhost:27017/Blog", function(err, db){
            var collection = db.collection("ArticleList");
            collection.updateOne({"title":"title"},{$set:newContent}, function(err,r){
                if(r.ok == 1){
                    res.json({"resCode":200});
                } else {
                    res.json({"resCode":500,"resReason":"unkown"});
                }
            })
        });
    })
    .delete(function(req, res){
        console.log("getArticleListRouter:delete/");
        console.log(req.body);
        let article_list = [];
        let MongoClient = new mongodb.MongoClient();
        MongoClient.connect("mongodb://localhost:27017/Blog", function(err, db){
            var collection = db.collection("ArticleList");
            collection.deleteMany(req.body, function(err,r){
                
                if(r.ok == 1){
                    res.json({"resCode":200});
                } else {
                    res.json({"resCode":500,"resReason":"unkown"});
                }
            })
        });
    });

export default getArticleListRouter;