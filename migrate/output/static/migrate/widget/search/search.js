define('migrate:widget/search/search.jes', function(require, exports, module) {

  /**
   * @file: search.jes
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-04-25
   * @description: this is a <jes> file
   */
  /* eslint-disable */
  
  'use strict';
  
  var searchlist = function(data){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  __p+='';
  
  /**
   * @file: search.list.tmpl
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-04-25
   * @description: this is a <tmpl> file
   */
  
  __p+='\n<ul class=\'list-group list-for-old-mis\' data-detail=\''+
  ((__t=( JSON.stringify(data) ))==null?'':__t)+
  '\'>\n    \n        <li class=\'list-group-item\'>\n        <label for=\'selectall\'>\n            全选全选\n            <span class="input-group-addon">\n                <input type="checkbox" id=\'selectall\' >\n            </span>\n        </label>\n        </li>\n    ';
   (function listloop(gap, list){ 
  __p+='\n        ';
   $.each( list,function(index,item){ 
  __p+='\n        <li class=\'list-group-item gap'+
  ((__t=( gap ))==null?'':__t)+
  '\' ';
   if(item.is_display == 0){ 
  __p+='style=\'display:none;\'';
  }
  __p+='>\n        <label for=\''+
  ((__t=( item.id ))==null?'':__t)+
  '\'>\n            '+
  ((__t=( item.priv_name))==null?'':__t)+
  ' \n            &nbsp; &nbsp;\n            '+
  ((__t=( item.priv_spell))==null?'':__t)+
  ' \n            &nbsp; &nbsp;\n            '+
  ((__t=( item.id ))==null?'':__t)+
  ' \n            &nbsp; &nbsp;\n            '+
  ((__t=( item.parent_id ))==null?'':__t)+
  ' \n            <span class="input-group-addon">\n                <input type="checkbox" id=\''+
  ((__t=( item.id ))==null?'':__t)+
  '\' data-parentId=\''+
  ((__t=( item.parent_id ))==null?'':__t)+
  '\' >\n            </span>\n            ';
   listloop( gap+1 , item.children)
  __p+='\n        </label>\n        </li>\n        ';
   }) 
  __p+='\n    ';
   })(0, data) 
  __p+=' \n    <li class=\'list-group-item\'>\n        <div class="btn-group">\n            <button type="button" id=\'submit\' class="btn btn-default">确认迁移</button>\n        </div>\n    </li>\n</ul>\n\n';
  return __p;
  };
  $('#search').on('click', function () {
      var id = $('#searchId').val();
      var hasChilde = $('#hasChilde:checked').length;
  
      $.ajax({
          url: '/migrate/searchprivilege',
          type: 'GET',
          data: {
              id: id,
              hasChilde: hasChilde
          },
          dataType: 'JSON',
          success: function success(data) {
              console.log(data);
              $('#searchList').html(searchlist(data));
          }
      });
  });
  
  $('#searchList').on('change', 'input[type=checkbox]', function () {
      var checked = $(this).is(':checked');
      // 向上选择
      if (checked) {
          var parentid = $(this).attr('data-parentId');
          $('#' + parentid).prop('checked', true).change();
      } else {}
      // 向下选择
      if (checked) {} else {
          var id = $(this).attr('id');
          $('input[data-parentId=' + id + ']').prop('checked', false).change();
      }
  });
  
  $('#searchList').on('click', '#submit', function () {
      var info = [];
      var checked = $('#searchList').find('input:checked').each(function (index, item) {
          info.push(parseInt($(item).attr('id')));
      });
  
      var parentNode = $('.menu-wrap .dropdown-toggle').data('detail');
  
      if (info.length == 0) {
          alert('请选择需要迁移的数据');
          return;
      }
      var detail = JSON.parse($('.list-for-old-mis').attr('data-detail'));
  
      (function loop(data) {
          $.each(data, function (index, item) {
              if (item && info.indexOf(item.id) > -1) {
                  item['selected'] = true;
                  loop(item.children);
              } else {
                  data.splice(index, 1);
                  loop(data);
                  return false;
              }
          });
      })(detail);
  
      $.ajax({
          url: '/migrate/block',
          type: 'POST',
          data: {
              blocks: JSON.stringify(detail),
              parentNode: JSON.stringify(parentNode)
          },
          success: function success(data) {
              console.log(data);
          }
      });
  });
  
  $('#searchList').on('change', '#selectall', function () {
      $('li input[type=checkbox]').prop('checked', true);
  });
  
  /* eslint-enable */

});
