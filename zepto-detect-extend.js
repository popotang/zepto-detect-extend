/**
 * 扩展浏览器和操作系统判断
 */
;
(function($) {
	function detect(ua) {

		var MQQBrowser = ua.match(/MQQBrowser\/(\d+\.\d+)/i),
			WeChat = ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/),
			MacOS = ua.match(/Mac\sOS\sX\s(\d+\.\d+)/),
			WinOS = ua.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),
			MiuiBrowser = ua.match(/MiuiBrowser\/(\d+\.\d+)/i),
			UC = ua.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/) || ua.match(/\sUC\s/),
			IEMobile = ua.match(/IEMobile(\/|\s+)(\d+\.\d+)/),
			ipod = ua.match(/(ipod\sOS)\s([\d_]+)/);



		// 扩展ie判断
		if (window.ActiveXObject) {
			var vie = 6;
			(window.XMLHttpRequest || (ua.indexOf('MSIE 7.0') > -1)) && (vie = 7);
			(window.XDomainRequest || (ua.indexOf('Trident/4.0') > -1)) && (vie = 8);
			(ua.indexOf('Trident/5.0') > -1) && (vie = 9);
			(ua.indexOf('Trident/6.0') > -1) && (vie = 10);
			this.browser.ie = true, this.browser.version = vie;
		}

		if (ipod) os.ios = os.ipod = true, os.version = ipod[2].replace(/_/g, '.');
		//windows 系统
		if (WinOS) this.os.windows = true, this.os.version = WinOS[2];
		//Mac系统
		if (MacOS) this.os.Mac = true, this.os.version = MacOS[1];
		//乐Pad
		if (ua.indexOf("lepad_hls") > 0) this.os.LePad = true;

		//补充一些国内主流的手机浏览器
		//手机QQ浏览器
		if (MQQBrowser) this.browser.MQQ = true, this.browser.version = MQQBrowser[1];
		//微信
		if (WeChat) this.browser.WeChat = true, this.browser.version = WeChat[1];
		//MIUI自带浏览器
		if (MiuiBrowser) this.browser.MIUI = true, this.browser.version = MiuiBrowser[1];
		//UC浏览器
		if (UC) this.browser.UC = true, this.browser.version = UC[1] || NaN;
		//IEMobile
		if (IEMobile) this.browser.IEMobile = true, this.browser.version = IEMobile[2];

		if (this.os.windows) {
			if (typeof navigator.platform != "undefined" && navigator.platform.toLowerCase() == "win64") {
				this.os.win64 = true;
			} else {
				this.os.win64 = false;
			}
		}

		//当前系统是否支持触屏触摸
		this.os.hasTouch = ('ontouchstart' in window);
	}
	detect.call($, navigator.userAgent);
})(Zepto);

