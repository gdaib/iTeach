/**
 * Created by baron on 15-5-12.
 */
$(function(){
    $('#signup').click(function(){

        $('#name').val() || $('#password').val() || alert('请输入正确的用户名，密码');

        $('#name').val() && $('#password').val() && $.ajax({
            method:'post',
            url:'/dosignin',
            data:{
                name:$('#name').val(),
                password:$('#password').val(),
                code:$('#code').val()
            },
            success:function(data){
                if(data.retcode==0){
                    location.href='/userlist';
                }
            },
            error:function(error){
                console.log(error)
            }
        });



    });
    $('#code').blur(function(){
        $.ajax({
            method:'post',
            url:'/checkoutCode',
            data:{
                name:$('#name').val(),
                password:$('#password').val()
            },
            success:function(data){
                console.log(data)
            },
            error:function(error){
                console.log(error)
            }
        });
    })
})