<!--
 @file: channeldb.tpl
 @author: shangwenhe@itv.baidu.com
 @date: 2017-05-04
 @description: this is a <tpl> file
 @require ./channeldb.js
 @require ./channeldb.less
-->

<div class='channeldb-wrap'>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="input-group input-group-lg">
                <span class="input-group-addon" id="sizing-addon1">迁移数据库的名字</span>
                <input type="text" class="form-control" placeholder="迁移数据库的名字"
                id='channeldbName'>
            </div>
            <div class="input-group input-group-lg">
                <span class="input-group-addon" id="sizing-addon1">迁移数据库的ID</span>
                <input type="text" class="form-control" placeholder="迁移数据库的ID"
                id='channeldbId'>
            </div>
            <div class="btn-group btn-group-lg" role="group" aria-label="...">
                <button type="button" class="btn btn-default" id='channeldb'>开始搜索</button>
            </div>
        </div>
    </div>
    <div id='channeldbList'>
    </div>
</div>
{% script %}
    require('./channeldb.jes');
{% endscript %}
