<!--
 @file: search.tpl
 @author: shangwenhe@itv.baidu.com
 @date: 2017-04-25
 @description: this is a <tpl> file
 @require ./search.js
 @require ./search.less
-->

<div class='search-wrap'>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="input-group input-group-lg">
                <span class="input-group-addon" id="sizing-addon1">迁移区块的ID</span>
                <input type="number" class="form-control" placeholder="迁移区块的ID" id='searchId'>
            </div>
            <div class="input-group input-group-lg">
                <span class="input-group-addon">
                    <input type="checkbox" id='hasChilde'>
                </span>
                <input type="text" class="form-control" aria-label="..." value="是否迁移其子区块" disabled>
            </div>
            {% widget 'migrate:widget/menu/menu.tpl' %}

            <div class="btn-group btn-group-lg" role="group" aria-label="...">
                <button type="button" class="btn btn-default" id='search'>开始搜索</button>
            </div>
        </div>
    </div>
    <div id='searchList'>
    </div>
</div>
{% script %}
    require('./search.jes')
{% endscript %}
