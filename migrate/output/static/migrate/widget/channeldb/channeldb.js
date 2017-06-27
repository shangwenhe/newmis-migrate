define('migrate:widget/channeldb/channeldb.jes', function(require, exports, module) {

  /**
   * @file: channeldb.jes
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-05-04
   * @description: this is a <jes> file
   */
  /* eslint-disable */
  
  'use strict';
  
  var channeldb = function(data){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  __p+='';
  
  /**
   * @file: channeldb.tmpl
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-05-04
   * @description: this is a <tmpl> file
   */
  
  __p+='\n\n<ul class=\'list-group list-for-old-mis\'>\n    ';
   $.each(data, function(index, item){ 
  __p+='\n        ';
   $.each(item, function(key, value){ 
  __p+='\n        <li class=\'list-group-item\'>\n            '+
  ((__t=( key ))==null?'':__t)+
  ':\n            '+
  ((__t=( value ))==null?'':__t)+
  '\n        </li>\n        ';
  }) 
  __p+='\n        <li class=\'list-group-item\'>\n            <div class="btn-group">\n                <button type="button" \n                    id=\'submit\' \n                    class="btn btn-default" \n                    data-detail=\''+
  ((__t=( JSON.stringify(item)))==null?'':__t)+
  '\'\n                    >确认迁移</button>\n            </div>\n        </li>\n    ';
  }) 
  __p+='\n</ul>\n';
  return __p;
  };
  
  $('#channeldb').on('click', function () {
      var channeldbId = $('#channeldbId').val();
      if (!channeldbId) {
          alert('没有DBID');
          return;
      }
      var channeldbName = $('#channeldbName').val();
      if (!channeldbName) {
          alert('没有DBName');
          return;
      }
      $.ajax({
          url: '/migrate/api/channeldb',
          type: 'GET',
          data: {
              where: 'where id=\"' + channeldbId + '\" and db_database=\"' + channeldbName + '\"'
          },
          dataType: 'JSON',
          success: function success(data) {
              $('#channeldbList').html(channeldb(data));
              console.log(data);
          }
      });
  });
  $('#channeldbList').on('click', '#submit', function () {
  
      var detail = $(this).data('detail');
      $.ajax({
          url: '/migrate/api/channeldb',
          type: 'POST',
          data: {
              detail: JSON.stringify(detail)
          },
          dataType: 'JSON',
          success: function success(data) {}
      });
  });
  /* eslint-enable */

});
