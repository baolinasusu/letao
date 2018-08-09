$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 页面渲染
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
        // console.log(info);
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
  // 模态框一级菜单渲染
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        $('.dropdown-menu').html(template('dropdowntmp',info));
      }
    })
  // 事件委托,一级菜单下所有a绑定点击事件
  $('.dropdown-menu').on('click','a',function(){
    // 赋值显示
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    // 获取选中id
    var id = $(this).data('id');
    // 设置给input
    $('[name="categoryId"]').val(id);
    // 将隐藏域校验状态, 重置成校验成功状态 updateStatus
    // updateStatus(字段名, 校验状态, 校验规则)
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })
  
  // 文件上传思路
  // 1.引包
  // 2.准备结构 name data-url
  // 3.初始化配置

  // 初始化文件上传配置
  $('#fileupload').fileupload({
    dataType:"json",
    done:function (e, data) {
      // 获得图片地址
      var imgUrl = data.result.picAddr;
      console.log(imgUrl);
      // 赋值给img,让其显示
      $('#imgBox img').attr('src',imgUrl);
      // 设置给Input,让表单获取
      $('[name="brandLogo"]').val(imgUrl);
      // 重置隐藏域的校验状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');

    }
  })

  // 表单校验
  $('#form').bootstrapValidator({

    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //   我们需要对隐藏域进行校验, 所以不需要将隐藏域 排除到 校验范围外
    excluded: [],

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName:{
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo:{
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  })

  //  检验成功,阻止默认表单提交,ajax发送
  $('#form').on('success.form.bv',function(e){
      e.preventDefault();
      $.ajax({
        type:"post",
        url:"/category/addSecondCategory",
        data:$('#form').serialize(),
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.success){
            $('#addModal').modal('hide');
            currentPage = 1;
            render();
            // 重置
            $('#form').data('bootstrapValidator').resetForm(true);
            $('#dropdownText').text('请选择一级分类');
            $('#imgBox img').attr('src','./images/none.png');
          }
        }
      })


  })
})