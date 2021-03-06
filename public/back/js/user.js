$(function(){

  var currentPage = 1;  // 当前页
  var pageSize = 5;  // 每页多少条

  var currentId;
  var isDelete;
  
  // 渲染页面
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        // 渲染页面
        $('tbody').html(template('tmp',info));

        // 分页初始化
         $('#paginator').bootstrapPaginator({
            // 配置 bootstrap 版本
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages:Math.ceil(info.total/info.size),
          // 设置当前页
          currentPage:info.page,
          // 当页码被点击时调用的回调函数
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
         })
      }
    })
  }
  // 点击启用禁用按钮, 显示模态框, 通过事件委托绑定事件 
  $('tbody').on('click','.btn',function(){
    // 显示模态框
    $('#userModal').modal('show');
    // 获取用户 id
    currentId = $(this).parent().data('id');
    // 禁用按钮, 说明需要将该用户置成禁用状态, 传 0
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  })
  // 点击确认按钮, 发送ajax请求, 修改对应用户状态, 需要两个参数(用户id, isDelete用户改成的状态)
   $('#submitBtn').click(function(){
    console.log( "用户id:" + currentId );
    console.log( "用户状态变成:" + isDelete );
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:currentId,
          isDelete:isDelete
        },
        dataType:"json",
        success:function(info){
          console.log(info);
          $('#userModal').modal('hide');
          if(info.success){
            render();
          }
        }
      })
   })


})