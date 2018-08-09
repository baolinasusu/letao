$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 渲染页面
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function( info ){
        console.log( info );
        $('tbody').html(template('firsttmp',info));

        // 分页标签
        $('#pagination').bootstrapPaginator({
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

  // 点击添加分类,显示模态框
  $('#addBtn').click(function(){
      $('#addModal').modal('show');
    })
  //  表单校验
  $('#form').bootstrapValidator({
      // 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryName:{
          validators:{
            notEmpty:{
              message:"一级分类不能为空"
            }
          }
        }
      }
  })

  // 检验成功,添加渲染实现
  $('#form').on('success.form.bv',function(e){
    // 取消表单默认提交行为
    e.preventDefault();
    // ajax发送提交
     $.ajax({
       type:'post',
       url:"/category/addTopCategory",
       data:$('#form').serialize(),
       dataType:"json",
       success:function(info){
         console.log(info);
         if(info.success){
           $('#addModal').modal('hide');
           currentPage = 1;
           render();
           $('#form').data('bootstrapValidator').resetForm(true);
         }
       }
     })
  })
    
 
  
})