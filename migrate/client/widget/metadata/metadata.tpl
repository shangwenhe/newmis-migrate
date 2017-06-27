<!--
 @file: metadata.tpl
 @author: shangwenhe@itv.baidu.com
 @date: 2017-05-04
 @description: this is a <tpl> file
 @require ./metadata.js
 @require ./metadata.less
-->

<div class='metadata-wrap'>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="input-group input-group-lg">
                <span class="input-group-addon" id="sizing-addon1">迁移数据元的表名</span>
                <input type="text" class="form-control" placeholder="迁移数据元的表名"
                id='tableName'>
            </div>
            <div class="input-group input-group-lg">
                <span class="input-group-addon" id="sizing-addon1">新MIS中的描述</span>
                <input type="text" class="form-control" placeholder="新MIS中的描述"
                id='metadataName'>
            </div>
            <div class="btn-group btn-group-lg" role="group" aria-label="...">
                <button type="button" class="btn btn-default" id='metadata'>开始搜索</button>
            </div>
        </div>
    </div>
    <div id='metadataList'>
    </div>
</div>
{% script %}
    require('./metadata.jes');
{% endscript %}
