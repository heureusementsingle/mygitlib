function createXHR(){
	if (typeof XMLHttpRequest!='undefiend') {
		return new XMLHttpRequest();
	}else if (typeof ActiveXObject!='undefiend') {
		if (typeof arguments.callee.activeXString!='string') {
			var versions=['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
			var len=0;
			for(var i=0,len=versions.length;i<len;i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString=versions[i];
					break;
				}catch(e){
					//
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	}else{
		throw new error('No XHR object available.');
	}
}