---
title: Blog
layout: page
---
<div> {% for post in collections.blog | reverse %}
    <a href="{{ post.url }}" class="blogpost">
        <h3>{{ post.data.title }}</h3>
        <small>{{ post.date | date }}<span style="float:right;">{{ post.url }}</span></small>
    </a><br> {% endfor %}
</div>
