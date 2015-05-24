/**
 * Created by baron on 15-5-11.
 */

var User = require('./router/user');
var Dev = require('./router/dev');


module.exports = function(app){

    //涉及用户超做
    app.post('/dosignup',User.dosignup);
    app.get('/userlist',User.signRequired,User.userlist);
    app.get('/signin',User.signin);
    app.post('/dosignin',User.dosignin);
    app.get('/logout',User.logout);

    //开发doc

    app.get('/dev',Dev.dev);

    //验证码
    app.get('/designCode',User.designCode)
    app.post('/checkoutCode',User.checkoutCode)

};
