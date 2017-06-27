define('migrate:widget/metadata/metadata.jes', function(require, exports, module) {

  /**
   * @file: metadata.jes
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-05-04
   * @description: this is a <jes> file
   */
  /* eslint-disable */
  
  'use strict';
  
  var getmetadata = function(data){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  __p+='';
  
  /**
   * @file: metadata.tmpl
   * @author: shangwenhe@itv.baidu.com
   * @date: 2017-05-04
   * @description: this is a <tmpl> file
   */
  
  __p+='\n\n\n<ul class=\'list-group list-for-old-mis\'>\n    ';
   $.each(data, function(index, item){ 
  __p+='\n    <li class=\'list-group-item\'>\n        <div class="panel panel-default">\n            <!-- Default panel contents -->\n            <div class="panel-heading">元数据详细信息</div>\n            <div class="panel-body">\n                <p><span>id:</span>'+
  ((__t=( item.id ))==null?'':__t)+
  '</p>\n                <p><span>top_ch_spell:</span>'+
  ((__t=( item.top_ch_spell ))==null?'':__t)+
  '</p>\n                <p><span>name:</span>'+
  ((__t=( item.name ))==null?'':__t)+
  '</p>\n                <p><span>spell:</span>'+
  ((__t=( item.spell ))==null?'':__t)+
  '</p>\n                <p><span>data_spell:</span>'+
  ((__t=( item.data_spell ))==null?'':__t)+
  '</p>\n                <p><span>db_id:</span>'+
  ((__t=( item.db_id ))==null?'':__t)+
  '</p>\n                <p><span>type:</span>'+
  ((__t=( item.type ))==null?'':__t)+
  '</p>\n                <p><span>status:</span>'+
  ((__t=( item.status ))==null?'':__t)+
  '</p>\n                <p><span>strategy_spell:</span>'+
  ((__t=( item.strategy_spell ))==null?'':__t)+
  '</p>\n            </div>\n            <!-- List group -->\n\n            <ul class="list-group metadata-detail-info">\n                <li class="list-group-item"><b>display_depency</b></li>\n                ';
   $.each(item.display_depency.edit,function(key, value){ 
  __p+='\n                <li class="list-group-item">'+
  ((__t=( key ))==null?'':__t)+
  ' </li>\n                <li class=\'list-group-item flied\'>\n                    <span>dateformat:'+
  ((__t=( value.dateformat ))==null?'':__t)+
  '</span>\n                    <span>desc:'+
  ((__t=( value.desc ))==null?'':__t)+
  '</span>\n                    <span>display:'+
  ((__t=( value.display ))==null?'':__t)+
  '</span>\n                    <span>field:'+
  ((__t=( value.field ))==null?'':__t)+
  '</span>\n                    <span>height:'+
  ((__t=( value.height ))==null?'':__t)+
  '</span>\n                    <span>name:'+
  ((__t=( value.name ))==null?'':__t)+
  '</span>\n                    <span>size:'+
  ((__t=( value.size ))==null?'':__t)+
  '</span>\n                    <span>tagName:'+
  ((__t=( value.tagName ))==null?'':__t)+
  '</span>\n                    <span>width:'+
  ((__t=( value.width ))==null?'':__t)+
  '</span>\n                </li>\n                ';
  })
  __p+='\n            </ul>\n            <ul class="list-group metadata-detail-info">\n                <li class="list-group-item"><b>manager_depency</b></li>\n                ';
   $.each(item.manager_depency, function(key, value){ 
  __p+='\n                <li class=\'list-group-item flied-detail\'>\n                    <span><b>'+
  ((__t=( key ))==null?'':__t)+
  '</b> &nbsp; &nbsp; '+
  ((__t=( value.join('&nbsp;') ))==null?'':__t)+
  '</span>\n                </li>\n                ';
  })
  __p+='\n            </ul>\n            <div class="btn-group migrate-button">\n                <button type="button"\n                    class="btn btn-default btn-submit" \n                    data-detail=\''+
  ((__t=( JSON.stringify(item)))==null?'':__t)+
  '\' >确认迁移</button>\n            </div>\n        </div>\n    </li>\n    ';
  }) 
  __p+='\n</ul>\n\n';
  return __p;
  };
  
  $('#metadata').on('click', function () {
      var tableName = $('#tableName').val();
      if (!tableName) {
          alert('tableName empty');
          return;
      }
  
      $.ajax({
          url: '/migrate/api/metadata',
          type: 'GET',
          data: {
              where: 'where name=\'' + tableName + '\' and top_ch_spell=\'video_publish\' and status=\'A\''
          },
          dataType: 'JSON',
          success: function success(data) {
              $('#metadataList').html(getmetadata(data));
          },
          error: function error() {}
      });
  });
  $('#metadataList').on('click', '.btn-submit', function () {
      var detail = $(this).data('detail');
  
      var metadataName = $('#metadataName').val();
      $.ajax({
          url: '/migrate/api/metadata',
          type: 'post',
          data: { detail: JSON.stringify(detail), desc: metadataName },
          dataType: 'JSON',
          success: function success(data) {
              if (data.errno === 100040) {
                  console.log(data.info.db_database, data.info.id);
                  alert(data.msg);
                  return;
              }
              alert(data.table_name + '迁移成功');
          },
          error: function error() {}
      });
  });
  /* eslint-enable */

});
