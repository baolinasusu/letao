$(function(){
  // 表单初始化校验
  $('#form').bootstrapValidator({

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
              min: 2,
              max: 6,
              message: '用户名长度必须在2到6之间'
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty: {
            message: '密码不能为空!'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          callback:{
            message:"密码错误!"
          }
        }
      }
    }
  })
  // 登录请求
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);

        if(info.success) {
          location.href = "index.html"
        }

        if(info.error === 1000){
          $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
          $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }
      }
    })
  })
  // 重置
  $('[type="reset"]').click(function(){
    $('#form').data("bootstrapValidator").resetForm();
  })
})


