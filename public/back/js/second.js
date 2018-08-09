$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 渲染
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        $('tbody').html(template('secondtmp',info));
  
        // 分页标签
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total / info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  // 点击添加分类,模态框显示
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
  })
  // 模态框表单校验
  // $('#form').bootstrapValidator({
  //   // 指定校验时的图标显示，默认是bootstrap风格
  //   feedbackIcons: {
  //     valid: 'glyphicon glyphicon-ok',
  //     invalid: 'glyphicon glyphicon-remove',
  //     validating: 'glyphicon glyphicon-refresh'
  //   },
  //   fields:{

  //   }
  // })
 
})