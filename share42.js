/* share42.com | 22.08.2016 | (c) Dimox */
(function($){
	$(function(){
		$('div.share42init').each(function(idx){
			var el = $(this), u = el.attr('data-url'), t = el.attr('data-title'), i = el.attr('data-image'), d = el.attr('data-description'), f = el.attr('data-path'), fn = el.attr('data-icons-file'), z = el.attr("data-zero-counter"), v = parseInt(el.attr("data-visible")) || false;
			if (!u)u = location.href;
			if (!fn)fn = 'icons.png';
			if (!z)z = 0;
			function dlcs_count(url){
				var shares;
				$.getJSON('//feeds.delicious.com/v2/json/urlinfo/data?callback=?&url=' + url, function(data){
					shares = data[0] ? data[0].total_posts : 0;
					if (shares > 0 || z == 1)el.find('a[data-count="dlcs"]').after('<span class="share42-counter">' + shares + '</span>')
				})
			}

			dlcs_count(u);
			function fb_count(url){
				var shares;
				$.getJSON('//graph.facebook.com/?fields=share&id=' + url, function(data){
					shares = (data.share?data.share.share_count:0) || 0;
					if (shares > 0 || z == 1)el.find('a[data-count="fb"]').after('<span class="share42-counter">' + shares + '</span>')
				})
			}

			fb_count(u);
			function lnkd_count(url){
				var shares;
				$.getJSON('//www.linkedin.com/countserv/count/share?callback=?&url=' + url, function(data){
					shares = data.count;
					if (shares > 0 || z == 1)el.find('a[data-count="lnkd"]').after('<span class="share42-counter">' + shares + '</span>')
				})
			}

			lnkd_count(u);
			function mail_count(url){
				var shares;
				$.getJSON('//connect.mail.ru/share_count?callback=1&func=?&url_list=' + url, function(data){
					shares = data.hasOwnProperty(url) ? data[url].shares : 0;
					if (shares > 0 || z == 1)el.find('a[data-count="mail"]').after('<span class="share42-counter">' + shares + '</span>')
				})
			}

			mail_count(u);
			function odkl_count(url){
				$.getScript('//ok.ru/dk?st.cmd=extLike&uid=' + idx + '&ref=' + url);
				if (!window.ODKL)window.ODKL = {};
				window.ODKL.updateCount = function(idx, shares){
					if (shares > 0 || z == 1)$('div.share42init').eq(idx).find('a[data-count="odkl"]').after('<span class="share42-counter">' + shares + '</span>')
				}
			}

			odkl_count(u);
			function pin_count(url){
				var shares;
				$.getJSON('//api.pinterest.com/v1/urls/count.json?callback=?&url=' + url, function(data){
					shares = data.count;
					if (shares > 0 || z == 1)el.find('a[data-count="pin"]').after('<span class="share42-counter">' + shares + '</span>')
				})
			}

			pin_count(u);
			function vk_count(url){
				$.getScript('//vk.com/share.php?act=count&index=' + idx + '&url=' + url);
				if (!window.VK)window.VK = {};
				window.VK.Share = {
					count: function(idx, shares){
						if (shares > 0 || z == 1)$('div.share42init').eq(idx).find('a[data-count="vk"]').after('<span class="share42-counter">' + shares + '</span>')
					}
				}
			}

			vk_count(u);
			if (!f) {
				function path(name){
					var sc = document.getElementsByTagName('script'), sr = new RegExp('^(.*/|)(' + name + ')([#?]|$)');
					for (var p = 0, scL = sc.length; p < scL; p++) {
						var m = String(sc[p].src).match(sr);
						if (m) {
							if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\/\\])/))return m[1];
							if (m[1].indexOf("/") == 0)return m[1];
							b = document.getElementsByTagName('base');
							if (b[0] && b[0].href)return b[0].href + m[1]; else return document.location.pathname.match(/(.*[\/\\])/)[0] + m[1];
						}
					}
					return null;
				}

				f = path('share42.js');
			}
			if (!t)t = document.title;
			if (!d) {
				var meta = $('meta[name="description"]').attr('content');
				if (meta !== undefined)d = meta; else d = '';
			}
			u = encodeURIComponent(u);
			t = encodeURIComponent(t);
			t = t.replace(/\'/g, '%27');
			i = encodeURIComponent(i);
			d = encodeURIComponent(d);
			d = d.replace(/\'/g, '%27');
			WC = 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, toolbar=0, status=0, ';
			WCwh = ['width=550, height=440',
			      'width=600, height=400',
			      'width=710, height=660',
			      'width=550, height=500',
			      'width=600, height=300',
			      'width=600, height=440',
			      'width=450, height=440',
			      'width=550, height=400',
			      'width=650, height=400'
			];
			var vkImage = '';
			if (i != 'null' && i != '')vkImage = '&image=' + i;
			var s = ['"#" data-count="gplus" onclick="window.open(\'//plus.google.com/share?url=' + u + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Поделиться в Google+"', 
				'"#" data-count="fb" onclick="window.open(\'//www.facebook.com/sharer/sharer.php?u=' + u + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Поделиться в Facebook"', 
				'"#" data-count="vk" onclick="window.open(\'//vk.com/share.php?url=' + u + '&title=' + t + vkImage + '&description=' + d + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Поделиться В Контакте"', 
				'"//www.livejournal.com/update.bml?event=' + u + '&subject=' + t + '" title="Опубликовать в LiveJournal"', 
				'"#" data-count="lnkd" onclick="window.open(\'//www.linkedin.com/shareArticle?mini=true&url=' + u + '&title=' + t + '\', \'_blank\', \''+WC+WCwh[1]+'\');return false" title="Добавить в Linkedin"', 
				'"#" data-count="mail" onclick="window.open(\'//connect.mail.ru/share?url=' + u + '&title=' + t + '&description=' + d + '&imageurl=' + i + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Поделиться в Моем Мире@Mail.Ru"', 
				'"#" onclick="window.open(\'//www.blogger.com/blog_this.pyra?t&u=' + u + '&n=' + t + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Опубликовать в Blogger.com"', 
				'"//bobrdobr.ru/add.html?url=' + u + '&title=' + t + '&desc=' + d + '" title="Забобрить"', 
				'"#" data-count="dlcs" onclick="window.open(\'//delicious.com/save?url=' + u + '&title=' + t + '&note=' + d + '\', \'_blank\', \''+WC+WCwh[2]+'\');return false" title="Сохранить закладку в Delicious"', 
				'"//designbump.com/node/add/drigg/?url=' + u + '&title=' + t + '" title="Bump it!"', 
				'"//www.designfloat.com/submit.php?url=' + u + '" title="Float it!"', 
				'"//digg.com/submit?url=' + u + '" title="Добавить в Digg"', 
				'"//www.evernote.com/clip.action?url=' + u + '&title=' + t + '" title="Добавить в Evernote"', 
				'"//www.friendfeed.com/share?title=' + t + ' - ' + u + '" title="Добавить в FriendFeed"', 
				'"#" onclick="window.open(\'//www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=' + u + '&title=' + t + '&annotation=' + d + '\', \'_blank\', \''+WC+WCwh[3]+'\');return false" title="Сохранить закладку в Google"', 
				'"//identi.ca/notice/new?status_textarea=' + t + ' - ' + u + '" title="Добавить в Identi.ca"', 
				'"//www.juick.com/post?body=' + t + ' - ' + u + '" title="Добавить в Juick"', 
				'"//www.liveinternet.ru/journal_post.php?action=n_add&cnurl=' + u + '&cntitle=' + t + '" title="Опубликовать в LiveInternet"', 
				'"//memori.ru/link/?sm=1&u_data[url]=' + u + '&u_data[name]=' + t + '" title="Сохранить закладку в Memori.ru"', 
				'"//www.mister-wong.ru/index.php?action=addurl&bm_url=' + u + '&bm_description=' + t + '" title="Сохранить закладку в Мистер Вонг"', 
				'"#" onclick="window.open(\'//chime.in/chimebutton/compose/?utm_source=bookmarklet&utm_medium=compose&utm_campaign=chime&chime[url]' + u + '=&chime[title]=' + t + '&chime[body]=' + d + '\', \'_blank\', \''+WC+WCwh[5]+'\');return false" title="Добавить в Mixx"', 
				'"//share.yandex.ru/go.xml?service=moikrug&url=' + u + '&title=' + t + '&description=' + d + '" title="Поделиться в Мой Круг"', 
				'"//www.myspace.com/Modules/PostTo/Pages/?u=' + u + '&t=' + t + '&c=' + d + '" title="Добавить в MySpace"', 
				'"//www.newsvine.com/_tools/seed&save?u=' + u + '&h=' + t + '" title="Добавить в Newsvine"', 
				'"#" data-count="odkl" onclick="window.open(\'//ok.ru/dk?st.cmd=addShare&st._surl=' + u + '&title=' + t + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Добавить в Одноклассники"', 
				'"//pikabu.ru/add_story.php?story_url=' + u + '" title="Добавить в Pikabu"', 
				'"#" data-count="pin" onclick="window.open(\'//pinterest.com/pin/create/button/?url=' + u + '&media=' + i + '&description=' + t + '\', \'_blank\', \''+WC+WCwh[4]+'\');return false" title="Добавить в Pinterest"', 
				'"//postila.ru/publish/?url=' + u + '&agregator=share42" title="Добавить в Постилу"', 
				'"//reddit.com/submit?url=' + u + '&title=' + t + '" title="Добавить в Reddit"', 
				'"//rutwit.ru/tools/widgets/share/popup?url=' + u + '&title=' + t + '" title="Добавить в РуТвит"', 
				'"//www.stumbleupon.com/submit?url=' + u + '&title=' + t + '" title="Добавить в StumbleUpon"', 
				'"#" onclick="window.open(\'//surfingbird.ru/share?url=' + u + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Добавить в Surfingbird"', 
				'"//technorati.com/faves?add=' + u + '&title=' + t + '" title="Добавить в Technorati"', 
				'"#" onclick="window.open(\'//www.tumblr.com/share?v=3&u=' + u + '&t=' + t + '&s=' + d + '\', \'_blank\', \''+WC+WCwh[6]+'\');return false" title="Добавить в Tumblr"', 
				'"#" data-count="twi" onclick="window.open(\'//twitter.com/intent/tweet?text=' + t + '&url=' + u + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Добавить в Twitter"', 
				'"#" onclick="window.open(\'//webdiscover.ru/share.php?url=' + u + '\', \'_blank\', \''+WC+WCwh[0]+'\');return false" title="Опубликовать на WebDiscover.ru"', 
				'"#" onclick="window.open(\'//bookmarks.yahoo.com/toolbar/savebm?u=' + u + '&t=' + t + '&d=' + d + '\', \'_blank\', \''+WC+WCwh[7]+'\');return false" title="Добавить в Yahoo! Закладки"', 
				'"#" onclick="window.open(\'//yosmi.ru/index.php?do=share&url=' + u + '\', \'_blank\', \''+WC+WCwh[8]+'\');return false" title="Добавить в ёСМИ"', 
				'"#" onclick="return up()" title="Наверх"', 
				'"" onclick="return fav(this);" title="Сохранить в избранное браузера"', 
				'"#" onclick="print();return false" title="Распечатать"'];
			el.html(
				'<style>.share42-item{display:inline-block;margin:0 6px 0 0;height:24px;vertical-align:middle} .share42-item a{vertical-align:middle;display:block;width:24px;height:24px;margin:0;padding:0;outline:none;background:url(' + f + fn + ') no-repeat -10000px -10000px} .share42-counter{display:inline-block;vertical-align:middle;margin-left:9px;position:relative;background:#FFF;color:#666;} .share42-counter:before{content:"";position:absolute;top:0;left:-8px;width:8px;height:100%;} .share42-counter{height:24px;padding:0 7px 0 3px;font:12px/25px Arial,sans-serif;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAYCAYAAAAMAljuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIxJREFUeNrs2rENgCAQQNHDyBBWDMFULmFjnMGlYAgKoy01BR5xB6H4P7mE+l7JmRBCFerdrXN673dTNfbRt1KKpJQk57xNrKN/1lpxzrXnCshAKNoCyGABAggBAggBAggBAggBAggBQoAAQoAAQoAAQr/U/tW1B5BBMNqRg3bOMUY20r9LvjOg4xVgABtzIxFP3JZkAAAAAElFTkSuQmCC) 100% 0;} .share42-counter:before{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAYCAYAAADH2bwQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJlJREFUeNrEks0NwyAMhU0kdmi4MARTZYh0jS4FE3DiAjvA4dVUjZQ/p+qlfZKFrPcJPYMVANorhDDzMXGN1IF1ee/nGCNqrega6KjJWkta61dzBoyLKQEb/Rrg+WGM2RKr+ZFzxl6XJj6Z0kseQiq+gUop8hScXIQG5xx1U4ROvvv7kH8ASmvtEniklGiBlLD29/fa354CDAC6sL9OAqehCgAAAABJRU5ErkJggg==);} .share42-other{display: inline-block;line-height:20px;}.share42-other:before {cursor:default;content:\'+\';display:inline-block;height:24px;width:24px;vertical-align:middle;font-weight:bold;color:white;font-family:tahoma;font-size:26px;line-height:20px;border-radius:50%;background-color:#E86340;text-align:center;} .share42-other>span{transition:opacity 350ms;opacity:0;visibility:hidden;position:absolute;right:0;left:0;bottom:95%;border:1px solid gray;box-shadow:0px 1px 3px #999;padding:2px;z-index:-100;background:rgba(255,255,255,0.9);border-radius:4px;text-align:center;} .share42-other:hover>span{visibility:visible;z-index:100; opacity: 1}.share42-other > span::after{background:transparent;content:"";display:block;height:10px;position:absolute;width:100%;}</style>' +
				'<span id="share42"></span>'
			);
			for (j = 0; j < s.length; j++) {
				var elem = '<span class="share42-item"><a rel="nofollow" style="background-position:-' + 24 * j + 'px 0" href=' + s[j] + ' target="_blank"></a></span>';
				if (v && j > v) {
					var ot = $("> span > .share42-other",el); ot.length || 
					(ot = $("<span class='share42-other'><span></span></span>").appendTo($("> span",el)));
					$(">span",ot).append(elem);
				} else {
				$("> span",el).append(elem);
				}
			}
		})
	})
})(jQuery);
function fav(a){
	var title = document.title;
	var url = document.location;
	try {
		window.external.AddFavorite(url, title);
	} catch (e) {
		try {
			window.sidebar.addPanel(title, url, '');
		} catch (e) {
			if (typeof(opera) == 'object' || window.sidebar) {
				a.rel = 'sidebar';
				a.title = title;
				a.url = url;
				a.href = url;
				return true;
			} else {
				alert('Нажмите Ctrl-D, чтобы добавить страницу в закладки');
			}
		}
	}
	return false;
}
function up(){
	var j = jQuery.noConflict();
	j('body,html').animate({scrollTop: 0}, 500);
	return false;
}