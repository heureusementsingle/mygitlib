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
		//管理员登录
		var reInput=document.getElementsByClassName('reInput');//登录文本框
		var shadow=document.getElementById('shadow');//仿模态化窗口
		var register=document.getElementById('register');//登录界面
		var tbody=document.getElementsByTagName('tbody')[0];
		var Datas=document.getElementById('Datas');//表单
		var login=document.getElementById('DEL');//登录按钮
		var inputs=document.getElementsByClassName('fin');//表单输入文本框
		var allSelect=document.getElementById('allSelect');//全选
		var naver=document.getElementById('naver');//a 标签
		var submit=document.getElementById('addBook');//添加数据
		var reload=document.getElementById('reload');//更新按钮
		var bg=document.getElementById('bg');//图书的模态化窗口
		var floatDiv=document.getElementById('floatDiv');//多删按钮div
		var choose=document.getElementsByClassName('choose');//所有行的checkbox
		var order=document.getElementById('order');
		var gxs=document.getElementsByClassName('gx');//更新标签
		var cancels=document.getElementsByClassName('cancel');//删除标签
		var addData=document.getElementById('addData');//添加数据按钮
		//叉掉表单
		naver.onclick=function(e){
	  		var aim = e||window.event;
	  		Datas.style.display='none';
			bg.style.display='none';
			aim.preventDefault();
	  	}
	  	//添加数据按钮
	  	addData.onclick=function(){
	  		Datas.style.display='block';
			bg.style.display='block';
			var dataSubmitListener=function (e){
				bg.style.display='none';
				var aim = e||window.event;
				var xhr=createXHR();
				xhr.open('post','http://localhost:2403/books',true);
				xhr.setRequestHeader('Content-Type','application/json');
				xhr.onreadystatechange=function(){
					if (xhr.readyState==4) {
						if (xhr.status>=200&&xhr.status<300||xhr.status==304) {
							getAll();//同时调用getAll()添加表格信息
						}
					}
				}
				var o={};
				for(var i=0;i<inputs.length;i++){
					o[inputs[i].name]=inputs[i].value;
				}
				xhr.send(JSON.stringify(o));
				Datas.style.display='none';
				aim.preventDefault();
			}
			submit.addEventListener('click',dataSubmitListener);
	  	}
	  	//将表单数据送入服务器
	  	
		//获取服务器数据填入表格
		function getAll(){
			shadow.style.display='none';
			register.style.display='none';
			var xhr0=createXHR();
			xhr0.open('get','http://localhost:2403/books');
			xhr0.send(null);
			xhr0.onreadystatechange=function(){
				if (xhr0.readyState==4) {
					if (xhr0.status>=200&&xhr0.status<300||xhr0.status==304) {
						var data=JSON.parse(xhr0.responseText);
						tbody.innerHTML='';
						//console.log(xhr.responseText);//是信息数组
						for(var i=0;i<data.length;i++){
							(function(b){
								var tr=document.createElement('tr');
								tr.index=data[b].id;//方便删除和更新
								tbody.appendChild(tr);
								for(var j=0;j<6;j++){
									var td=document.createElement('td');
									tr.appendChild(td);
								}
								var select=document.createElement('input');
								select.type='checkbox';
								select.className='choose';
								var img=document.createElement('img');
								img.src=data[b].pic;
								img.style.width='50px';
								img.style.height='80px';
								var gx=document.createElement('a');
								gx.innerHTML='更新';
								gx.className='gx';
								gx.index=tr.index;
								var cancel=document.createElement('a');
								cancel.innerHTML='删除';
								cancel.className='cancel';
								gxs=document.getElementsByClassName('gx');
								gx.href='#';
								tr.childNodes[0].appendChild(select);
								tr.childNodes[1].appendChild(img);
								tr.childNodes[2].innerHTML=data[b].bookname;
								tr.childNodes[3].innerHTML=data[b].author;
								tr.childNodes[4].innerHTML=data[b].price;
								tr.childNodes[5].appendChild(gx);
								tr.childNodes[5].appendChild(cancel);
							}(i))

							//全选
							var flags=false;
							allSelect.onclick=function(){
								flags=true;
								if (flags) {
									for(var k=0;k<choose.length;k++){
										choose[k].checked=allSelect.checked;
										floatDiv.style.display='block';
									}
									clearInterval(Interval);
									flags=false;
								}
							}
							for(var ie=0;ie<choose.length;ie++){
								choose[ie].onclick=function(){
									var count=0;
									for(var j=0;j<choose.length;j++){
										if (choose[j].checked) {
											count++;
											if (count>1) {
												floatDiv.style.display='block';
												floatDiv.childNodes[0].onclick=function(e){
											  		var aim=e||window.e;
											  		var xhr=createXHR();
											  		xhr.open('get','http://localhost:2403/books',true);
											  		xhr.send(null);
											  		xhr.onreadystatechange=function(){
											  			if (xhr.readyState==4) {
											  				if (xhr.status>=200&&xhr.status<300||xhr.status==304) {
											  					var data_infor=JSON.parse(xhr.responseText);
											  					var flag=false;
											  					for(var k=0;k<choose.length;k++){
											  						if (choose[k].checked) {
											  							flag=true;
											  							break;
											  						}
											  					}if (flag==false&&i==checks.length) {
											  						alert('您还未选择项目，不能删除！');
											  					}else if (confirm('是否要删除？')&&flag) {
											  						deleteData();
											  					}	
											  				}
											  			}
											  		}
											  		aim.preventDefault();
											  	}
											  	count=0;
												break;
											}else{
												floatDiv.style.display='none';
											}
										}
									}
								}
							}
							floatDiv.childNodes[3].onclick=function(e){
							  	var aim=e||window.e;
							  	floatDiv.style.display='none';
							  	for(var i=0;i<choose.length;i++){
							  		choose[i].checked=false;
							  	}	
							}
							for(var o=0;o<gxs.length;o++){
								(function(f){
									//更新数据
									gxs[f].onmouseover=function(){
										gxs[f].style.background='#fc7215';
										gxs[f].style.color='white';
									}
									gxs[f].onmouseout=function(){
										gxs[f].style.background='white';
										gxs[f].style.color='black';
									}
									gxs[f].onclick=function(){
								  		Datas.style.display='block';
										bg.style.display='block';
										var xhr2=createXHR();
										url0='http://localhost:2403/books/'+gxs[f].index;
										xhr2.open('get',url0,true);
										xhr2.send(null);
										xhr2.onreadystatechange=function(){
											if (xhr2.readyState==4) {
												if (xhr2.status>=200&&xhr2.status<300||xhr2.status==304) {
									  				var daTa=JSON.parse(xhr2.responseText);
									  				var k=0;
									  				for(var p in daTa)
									  				{
									  					if (k<inputs.length) {
									  						inputs[k++].value=daTa[p];
									  					}
									  				}
									  			}
									  		}
									  	}
									}
									//删除数据
									cancels[f].onmouseover=function(){
										cancels[f].style.background='#ffd974';
									}
									cancels[f].onmouseout=function(){
										cancels[f].style.background='white';
									}
									cancels[f].onclick=function(e){
								  		var aim=e||window.e;
								  		if (confirm('您确定删除吗？')) {
								  			var tr_f=choose[f].parentNode.parentNode;
											tbody.removeChild(tr_f);
											var id=tr_f.index;
											//找到数据库中与之匹配的数据删掉
											var xhr1=createXHR();
											var url='http://localhost:2403/books/'+id;
											xhr1.open('delete',url,true);
											xhr1.send(null);
								  		}
								  		aim.preventDefault();
								  	}
								}(o));
							}
						}
					}
				}
			}
		}
		//多选删除
		function deleteData(){
	  		for(var i=0;i<choose.length;i++){
	  			if (choose[i].checked) {
	  			//得到这一行
		  			var tr_f=choose[i].parentNode.parentNode;
				  	tbody.removeChild(tr_f);
				  	var id=tr_f.index;
				  	//找到数据库中与之匹配的数据删掉
				  	var xhr1=createXHR();
				  	var url='http://localhost:2403/books/'+id;
				  	xhr1.open('delete',url,true);
				  	//xhr1.setRequestHeader('Content-Type','application/json');
				  	//xhr1.send(JSON.stringify({id:data_infor[j].id}));
				  	xhr1.send(null);
				  	i--;
		  		}
	  		}
	  	}
		//更新后重新加载
		reload.onclick=function(e){
			Datas.style.display='none';
			bg.style.display='none';
			var xhr3=createXHR();
			xhr3.open('put',url0);
			xhr3.setRequestHeader('Content-Type','application/json');
			var ol={};
			for(var i=0;i<inputs.length;i++){
				ol[inputs[i].name]=inputs[i].value;
			}
			xhr3.send(JSON.stringify(ol));	
			xhr3.onreadystatechange=function(){
				if (xhr3.readyState==4) {
					if (xhr3.status>=200&&xhr3.status<300||xhr3.status==304) {
						getAll();//同时调用getAll()添加表格信息
					}
				}
			}
			e.preventDefault();
		}
		//判断用户是不是合法
		login.onclick =function(){
			var xhr = createXHR();
			xhr.open("post","http://localhost:2403/users/login");
			xhr.onreadystatechange=function(){
		 		if (xhr.readyState==4) {
		 			if (xhr.status>=200&&xhr.status<300||xhr.status==304) {
		 				//显示图书信息表单
		 				var data=JSON.parse(xhr.responseText);
		 				var xhr1=createXHR();
		 				xhr1.open('get',"http://localhost:2403/users")
		 				xhr1.send(null);
		 				xhr1.onreadystatechange=function(){
					 		if (xhr1.readyState==4) {
					 			if (xhr1.status>=200&&xhr1.status<300||xhr1.status==304) {
					 				var Data=JSON.parse(xhr1.responseText);
					 				for(var i=0;i<Data.length;i++){
					 					if (Data[i].id===data.uid) {
					 						var ID=Data[i].identify;
					 						console.log(ID);
					 					}
					 				}
					 			}
					 		}
					 	}
		 				addData.style.display='block';
		 				getAll();
		 			}else{
		 				alert("用户名或密码错误！");
		 			}
		 		}
		 	}
		 	var o={};
		 	for(var i=0;i<reInput.length;i++){
		 		o[reInput[i].getAttribute('index')]=reInput[i].value;
		 	}
		 	xhr.setRequestHeader('Content-Type','application/json');
		 	xhr.send(JSON.stringify(o));
		}

		//排序
		var trs=document.getElementsByTagName('tr');
		order.onclick=function(){
			//console.log(order);
			clearInterval(Interval);
			return (function(){
				for(var jn=1;jn<trs.length;jn++){
					for(var kn=1;kn<trs.length-jn;kn++){
						if (Number(trs[kn].childNodes[4].innerHTML)>Number(trs[kn+1].childNodes[4].innerHTML)) {
							var tmp=trs[kn+1].cloneNode(true);
							tbody.removeChild(trs[kn+1]);
							tbody.insertBefore(tmp,trs[kn]);
						}
					}
				}
				for(var nj=0;nj<gxs.length;nj++){
					gxs[nj].onclick=function(){
				  		Datas.style.display='block';
						bg.style.display='block';
						var xhr2=createXHR();
						url0='http://localhost:2403/books/'+this.index;
						xhr2.open('get',url0,true);
						xhr2.send(null);
						xhr2.onreadystatechange=function(){
							if (xhr2.readyState==4) {
								if (xhr2.status>=200&&xhr2.status<300||xhr2.status==304) {
					  				var daTa=JSON.parse(xhr2.responseText);
					  				var k=0;
					  				for(var p in daTa)
					  				{
					  					if (k<inputs.length) {
					  						inputs[k++].value=daTa[p];
					  					}
					  				}
					  			}
					  		}
					  	}
					}	
				}
				
			})();
		}