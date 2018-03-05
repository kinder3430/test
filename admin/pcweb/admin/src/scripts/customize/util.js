module.exports = {
	base: GV.actionRoot || '',
	prefix: GV.prefix || false,
	redir : GV.redir || false,
	//base: '/doctor/',
	/**
	 * 获取URL参数
	 * @example getUrlParam();
	 */
	getUrlParam: function(){
		var URLParams = {},
			locSearch =  location.search,
			aParams = !!locSearch.slice(1)? locSearch.substr(1).split('&') : [];
		for(var i=0;i<aParams.length;i++){
			var aParam = aParams[i].split('=');
			URLParams[aParam[0]] = aParam[1];
		}
		return URLParams;
	},
	/**
	 * 获取接口路径
	 * @example getInterface("action", {}, "http://127.0.0.1/");
	 * @param {String} action 接口的名称
	 * @param {Object} params 拓展参数
	 * @param {String} root 接口的目录路径
	 */
	getInterface: function(action, params, root) {
		var str = "",
			baseUrl = root || this.base;

		if (params && typeof params == "object") {
			for (var key in params) {
				str += key + "=" + params[key] + "&";
			}
			str = str.substring(0, str.length - 1);
		}
		if (this.redir){
			str = str? '?'+str : '';
			return this.redir + action + str;
		}
		else
		{
			str = str? '?'+str : '';
			return baseUrl + action + str;
		}
	}
};