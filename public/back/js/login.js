$(function(){
  // 表单校验
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
        }
      },
      password:{
        validators:{
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
          min: 6,
          max: 12,
          message: '用户名长度必须在6到12之间'
          },
        }
      }
    }
  })
  // 登录请求
  
})