{% extends 'migrate:page/layout.tpl' %}

{% block content %}
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
         <div id="pages-container">
            {% widget "migrate:widget/search/search.tpl"%}
         </div>
        
        </div>
        <div class="col-md-1"></div>
    </div>
{% require "migrate:page/index.tpl" %}{% endblock %}
