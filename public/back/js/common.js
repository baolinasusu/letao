// 登录拦截
if(location.href.indexOf("login.html")===-1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.error === 400){
          location.href = "login.html";
      }
      if(info.message){
        console.log("已登录");
      }
    }
  })
}


$(function(){
  // 进度条
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    setInterval(function(){
      NProgress.done();
    },1000)
   
  })
})

// 导航
$(function(){
  // 二级菜单
  $('.lt_aside .category').click(function(){
    $('.lt_aside .child').stop().slideToggle();
  })
//  菜单
  $('.icon-menu').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
  })
  // 退出
  $('.icon-logout').click(function(){
    $('#logoutModal').modal('show');
  })

  $('#logoutBtn').click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })
})