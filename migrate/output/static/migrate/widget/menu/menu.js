define('migrate:widget/menu/menu.jes', function(require, exports, module) {

  /**
   * @file: menu.jes
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-05-02
   * @description: this is a <jes> file
   */
  /* eslint-disable */
  
  'use strict';
  
  var menulist = function(data){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  __p+='';
  
  /**
   * @file: menu.list.tmpl
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-05-02
   * @description: this is a <tmpl> file
   */
  
  __p+='\n<ul class=\'list-group dropdown-menu\' >\n    ';
   (function listloop(gap, list){ 
  __p+='\n        ';
   $.each( list,function(index,item){ 
  __p+='\n        <li class=\'list-group-item gap'+
  ((__t=( gap ))==null?'':__t)+
  '\' data-detail=\''+
  ((__t=( JSON.stringify({
              conds_query:item.conds_query,
              create_time:item.create_time,
              desc:item.desc,
              id:item.id,
              is_deleted:item.is_deleted,
              last_modified:item.last_modified,
              link:item.link,
              name:item.name,
              oid:item.oid,
              parent_id:item.parent_id,
              show_type:item.show_type,
              status:item.status
          }) ))==null?'':__t)+
  '\' \n        ';
   if(item.is_deleted == true){ 
  __p+='style=\'display:none;\'';
  }
  __p+='>\n        <label for=\''+
  ((__t=( item.id ))==null?'':__t)+
  '\'>\n            '+
  ((__t=( item.name))==null?'':__t)+
  ' \n            &nbsp; &nbsp;\n            '+
  ((__t=( item.metadata_id))==null?'':__t)+
  ' \n            &nbsp; &nbsp;\n            '+
  ((__t=( item.id ))==null?'':__t)+
  ' \n            &nbsp; &nbsp;\n            '+
  ((__t=( item.parent_id ))==null?'':__t)+
  ' \n            <span class="input-group-addon">\n                <input type="radio" name=\'migrateParentID\' id=\''+
  ((__t=( item.id ))==null?'':__t)+
  '\' data-parentId=\''+
  ((__t=( item.parent_id ))==null?'':__t)+
  '\' >\n            </span>\n            ';
   listloop( gap+1 , item.children)
  __p+='\n        </label>\n        </li>\n        ';
   }) 
  __p+='\n    ';
   })(0, data) 
  __p+=' \n</ul>\n\n\n\n';
  return __p;
  };
  
  $.ajax({
      url: 'http://imis.xiaodutv.com/api/setting/menu',
      type: 'GET',
      dataType: 'JSON',
      success: function success(info) {
          $('.menu-list').replaceWith(menulist(info.data));
      },
      error: function error(err) {}
  });
  
  $('.menu-wrap').on('click', '.list-group li', function (e) {
      var detail = $(this).data('detail');
      var button = $(this).parents('.menu-wrap').find('.btn-default');
      button.html(detail.name + '<span class="caret"></span>');
      button.data({ detail: detail });
  });
  
  /* eslint-enable */

});
