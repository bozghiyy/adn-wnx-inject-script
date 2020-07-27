ad3p = {
	version: '0.0.8',
	start: function () {
		if (window.location.href.split('/')[3] == 'blog') return console.log('ad3p: quit, blog page;');
		var target = document.getElementById('articleContent') || document.getElementById('article_detail'), p3, pCount = 0, delay;
		if (!target) {
			if (delay) return console.log('ad3p: target not found;');
			else {
				delay = true;
				console.log('ad3p: wait content;');
				setTimeout("ad3p.start()", 1111);
			}
		}
		for (var i = 0; i < target.childNodes.length; i++)
			if (target.childNodes[i].tagName == 'P') {
				pCount++;
				if (pCount > 2 && !p3) p3 = target.childNodes[i];
			}
		if (pCount > 3) ad3p.drawUnit(p3);
		else {
			console.log('ad3p: article not contain enough paragraphs;');
			var src = target.innerHTML, i = 0, oi = 0, pCount = 0, sP = 0, bC = 0;
			while (i = src.indexOf("<br", ++i)) {
				if (i == -1) break;
				if (oi + 7 > i) pCount++;
				if (pCount > 2 && !sP) sP = bC;
				oi = i;
				bC++;
			}
			if (pCount > 3) ad3p.drawUnit(document.getElementsByTagName('BR')[sP]);
			else console.log('ad3p: article text not contain enough breaks couples;');
		}
	},

	drawUnit: function (target) {
		var tag = 'article_intext', unit = document.createElement("DIV");
		unit.id = tag;
		target.parentNode.insertBefore(unit, target.nextSibling);
		unit.setAttribute('style', '');
		unit.style.textAlign = 'center';
		unit.style.margin = '30px 0';

		googletag.cmd.push(function () {
			googletag.defineSlot('/339474670/Wenxuecity/wnx_inarticle_1', [300, 250], tag).addService(googletag.pubads());
			googletag.pubads().enableSingleRequest();
			googletag.enableServices();
		});
		googletag.cmd.push(function () { googletag.display(tag); });
	}
}

setTimeout("ad3p.start()", 333);
