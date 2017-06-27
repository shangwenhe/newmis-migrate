<!doctype html>
{% html lang="en" framework="migrate:static/js/mod.js" %}
    {% head %}
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="/static/favicon.ico">
        <title>{{ title }}</title>
        {% require "migrate:static/js/jquery-1.12.4.min.js" %}
        {% require "migrate:static/bootstrap-3.3.7-dist/js/bootstrap.min.js" %}

        {% require "migrate:static/bootstrap-3.3.7-dist/css/bootstrap.min.css" %}
        {% require "migrate:static/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css" %}

    {% endhead %}

    {% body %}
        <div id="header">
            {% widget "migrate:widget/header/header.tpl"%}
        </div>
        <div id="wrapper">
            <div id="middle">
                {% block content %}
                {% endblock %}
            </div>
        </div>

    {% require "migrate:page/layout.tpl" %}{% endbody %}

{% endhtml %}
