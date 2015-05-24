/**
 * Created by baron on 15-5-12.
 */
$(function(){
    $('#signup').click(function(){

        $('#name').val() || $('#password').val() || $('#email').val() || alert('请输入正确的用户名，密码，邮箱')

        $('#name').val() && $('#password').val() && $('#email').val() && $.ajax({
            method:'post',
            url:'/dosignup',
            data:{
                name:$('#name').val(),
                password:$('#password').val(),
                email:$('#email').val()
            },
            success:function(data){

            },
            error:function(error){
                console.log(error)
            }
        });



    });
})