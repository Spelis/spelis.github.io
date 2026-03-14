---
title: Blog
layout: page
nav: 20
---
<!-- Some interesting posts. :) -->
<!---->
<!-- ## Posts -->
<ul> {% for post in collections.blog | reverse %}
    <li>
        <a href="{{ post.url }}">{{ post.data.title }}</a>
        <small>{{ post.date | date }}</small>
    </li> {% endfor %}
</ul>
