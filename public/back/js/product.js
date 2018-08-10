$(function(){
  var currentPage = 1;
  var pageSize = 5;
  
  // 存储图片名字和地址 
  var picArr = []; 

  render();
  function render(){
    // 渲染
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        $('tbody').html(template('productTmp',info));

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

  // 点击添加商品,显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
  })
  // 动态渲染一级分类
  $.ajax({
    type:"get",
    url:"/category/querySecondCategoryPaging",
    data:{
      page:1,
      pageSize:100
    },
    dataType:"json",
    success:function(info){
      // console.log(info);
      $('.dropdown-menu').html(template('dropdownTmp',info));
    }
  })
  // 点击一级分类a赋值显示并传送Id 委托事件
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    // console.log(id);
    // 获取成功,手动更改成功状态
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  // 上传文件
  $('#fileupload').fileupload({
    dataType:"json",
    done:function (e, data) {
      // console.log(data.result);
      picArr.unshift(data.result);

      var picUrl = data.result.picAddr;
      $('#imgBox').prepend('<img src=" '+ picUrl +' " width="100" alt="">');

      if( picArr.length > 3){
          picArr.pop();
          $('#imgBox img:last-of-type').remove();
      }
      // 上传3张成功,手动更改成功校验状态
      $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
    }
   
  })

  // 表单校验
  $('#form').bootstrapValidator({
    // 指定不校验的类型
    excluded: [],
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      brandId:{
        validators: {
           //不能为空
        notEmpty: {
          message: '请选择二级分类'
        },
        }
      },
      proName:{
        validators: {
           //不能为空
        notEmpty: {
          message: '请输入商品名称'
        },
        }
      },
      proDesc:{
        validators: {
           //不能为空
        notEmpty: {
          message: '请输入商品描述'
        },
        }
      },
      num:{
        validators: {
           //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式,必须是非零开头的数字'
          }
        }
      },
      size:{
        validators: {
           //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式,必须是32-40'
          }
        }
      },
      oldPrice:{
        validators: {
           //不能为空
        notEmpty: {
          message: '请输入商品原价'
        },
        }
      },
      price:{
        validators: {
           //不能为空
        notEmpty: {
          message: '请输入商品现价'
        },
        }
      },
      picStatus:{
        validators: {
           //不能为空
        notEmpty: {
          message: '请上传3张图片'
        },
        }
      },
    }




  })

  // 校验成功事件,禁止表单默认提交,ajax请求
  $('#form').on('success.form.bv',function(e){
     e.preventDefault();
      var paramsStr = $('#form').serialize();
      // 拼接图片信息
      // &picAddr1=xx&picName1=xx
      paramsStr += "&picAddr1="+ picArr[0].picAddr + "&picName1="+ picArr[0].picName ;
      paramsStr += "&picAddr2="+ picArr[1].picAddr + "&picName2="+ picArr[1].picName ;
      paramsStr += "&picAddr3="+ picArr[2].picAddr + "&picName3="+ picArr[2].picName ;

     $.ajax({
       type:"post",
       url:"/product/addProduct",
       data:paramsStr,
       dataType:'json',
       success:function( info ){
          // console.log( info );
          console.log(paramsStr);
          if( info.success ){
            $('#addModal').modal('hide');
            current = 1;
            render();
            $('#form').data('bootstrapValidator').resetForm();
            $('#dropdownText').text('请选择二级分类');
            $('#imgBox img').remove();
            picArr = [];
          }
       }
     })
  })






})