/**
 * Created by baron on 15-5-12.
 */

'use strict';

var User = require('../models/user');
var ccap = require('ccap');
var text = null;

exports.dosignup = function(req,res,next){

    var user = req.body;
    var _user = new User(user);
    if(user.name && user.password){
        _user.save(function(err,user){
            if(err) return next(err);
            res.send({
                retcode:0,
                name:user.name
            })
        });
    }else{
        res.send({
            retcode:0,
            msg:'请输入用户名和密码！'
        })
    }


};

exports.userlist = function(req,res,next){


    var _users = null;
     User.fetch(function(err,users){
        if(err) next(err);
         _users = users;
         res.render('userlist',{
             retcode:0,
             users:_users
         })
    });

};

exports.signin = function(req,res,next){

    res.render('signin',{
        title:'用户登录页'
    });

};

exports.logout = function(req,res,error){
    delete req.session.user;
    res.redirect('/signin')

};

exports.designCode = function(req,res,error){
    var captcha = ccap({
        width: 240, //配置验证码图片的width,default is 256
        height: 40, //配置验证码图片的 height,default is 60
        offset: 25, //验证码 文本间距,default is 40
        quality: 200, //图片质量,default is 50
        fontsize: 40 //字符字体大小,default is 57

    });

    var ary = captcha.get();//ary[0] is captcha's text,ary[1] is captcha picture buffer.

     text = ary[0];

    var buffer = ary[1];

    console.log(text);
    res.end(buffer)

};

exports.checkoutCode = function(req,res,error){
    res.json({
        retCode:0,
        msg:text
    })
};

exports.dosignin = function(req,res,next){

    var name = req.body.name;
    var password = req.body.password;
    var code = req.body.code;
    if(code.toLowerCase()==text.toLowerCase()){
        User.findOne({name:name},function(err,user){
            if(err){return err;}
            if(user){
                user.comparePassword(password,function(err,isMatch){

                    isMatch ? (req.session.user = user ,
                    res.json({
                        retcode:0,
                        msg:'登录success'
                    })):res.json({
                        retcode:3,
                        msg:'密码错误'
                    })
                });
            }else{
                res.send({
                    retcode:2,
                    msg:'用户名不存在！'
                })
            }
        })
    }else{
        res.json({
            retcode:1,
            msg:'验证码不正确，请重新输入！'
        })
    }
};

exports.signRequired = function(req,res,next){
    var user = req.session.user;
    console.log(req.session)
    if(!user){
        res.redirect('/signin');
    }
    next();
};