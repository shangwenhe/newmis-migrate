<!--
 @file: menu.tpl
 @author: shangwenhe@itv.baidu.com
 @date: 2017-05-02
 @description: this is a <tpl> file
 @require ./menu.js
 @require migrate:widget/menu/menu.less
-->

<div class='menu-wrap'>
    <!-- Single button -->
    <div class="btn-group btn-group-lg">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">选择迁移到的节点<span class="caret"></span>
        </button>
        <ul class="menu-list"></ul>
    </div>
</div>
{% script %}
    require('migrate:widget/menu/menu.jes');
{% endscript %}
