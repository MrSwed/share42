#Share42 like buttons
Original http://share42.com/

This is an refactor of 24px **horisontal** variant


##Possible parameters
Parameter|Description|Example of usage
--------|--------|---------
data-url|link to a page|<code>&lt;div class="share42init" data-url="http://site.name/page-title/"&gt;</code>
data-title|title of a page|<code>&lt;div class="share42init" data-title="Заголовок страницы"&gt;</code>
data-image|link to an image|<code>&lt;div class="share42init" data-image="http://site.name/image.jpg"&gt;</code>
data-description|description of a page|<code>&lt;div class="share42init" data-description="Описание страницы"&gt;</code>
data-path|path to a folder containing icons.png file|<code>&lt;div class="share42init" data-path="http://site.name/share42/"&gt;</code>
data-icon-file|name of the file with icons|<code>&lt;div class="share42init" data-icons-file="my-icons.png"&gt;</code>
data-zer-counter|1 - show the zero counter, 0 - don't show the zero counter|<code>&lt;div class="share42init" data-zero-counter="1"&gt;</code>
**data-visible**|Number of visible elements|<code>&lt;div class="share42init" data-visible="8"&gt;</code>

###Code for your website (just before or just after the main text of the page):
```
<div class="share42init"></div>
<script type="text/javascript" src="share42.js"></script> 
```