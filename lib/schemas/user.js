/**
 * Created by Administrator on 2015/5/11.
 */

'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var GEN_SALT_LV = 10;
var UserSchema = new mongoose.Schema({
   name:{
       unique:true,
       type:String
   },
    email:{
        type:String,
        default:'暂无邮箱！'
    },
    password:{
        type:String
    },

    // 0 Normal
    // 1 Vip
    // 2 SupperVip
    // 10 admin

    role:{
        type:Number,
        default:0
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }

});

UserSchema.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(GEN_SALT_LV,function(err,salt){
        if (err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });


});

UserSchema.methods = {
    comparePassword:function(_password,cb){
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if (err) return cb(err);
            cb(null,isMatch);
        })
    }
};

UserSchema.static({
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById:function(_id,cb){
        return this
            .find({id:_id})
            .exec(cb);
    }
});

module.exports = UserSchema;
