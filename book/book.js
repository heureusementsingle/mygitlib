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
		var xhr1=createXHR();
		xhr1.open('get','http://localhost:2403/books');
		xhr1.send(null);
		xhr1.onreadystatechange=function(){
			if (xhr1.readyState==4) {
				if (xhr1.status>=200&&xhr1.status<300||xhr1.status==304) {
					var responseData=JSON.parse(xhr1.responseText);
					var container=document.getElementById('container');//购物页面
					var buy_btn = document.getElementsByClassName('buy');//购买按钮
					var sp_list = document.getElementById('spList');//购物列表
					var stick = document.getElementById('stick');//购物车按钮
					var num = document.getElementById('num');//购物出数量容器，存放j
					var j = 0; //购物车的商品数;
					//创建按钮的弹框border
					var border = document.createElement('div');
					border.className = 'border';	
					var del = document.createElement('button');//提示框的XX按钮
					del.id='del';
					var title = document.createElement('div');//提示框的头
					title.className = 'tit';
					title.innerHTML = '购物车提示';
					title.appendChild(del);
					var dh = document.createElement('img');//对号图片
					dh.src = 'images/dh.png';
					var b_n1 = document.createElement('button');//继续购物按钮
					b_n1.className = 'b_n1';
					b_n1.innerHTML = '<<继续购物';
					var b_n2 = document.createElement('button');//去结算按钮
					b_n2.className = 'b_n2';
					b_n2.innerHTML = '￥去结算';
					border.appendChild(dh); //插入dh图片
					border.appendChild(title);//插入框头
					border.appendChild(b_n1);//插入继续购物按钮
					border.appendChild(b_n2);//插入去结算按钮
					contentDiv.appendChild(border);
					var count=0;//书本数量
					//elem:书本对象  index :书本索引
					responseData.forEach(function(elem, index, self) {
							//console.log(arguments[1]);
							//图书销售信息创建
						var contentDiv = document.getElementById('contentDiv');
						var saleInfor = document.createElement('div');
						saleInfor.style.position = 'relative';
						//给每个div添加index属性，方便购买时使用索引找到对象；进而找到价格，图片，评分等属性
						saleInfor.setAttribute('index', index);
						var character = document.createElement('div');
						character.className = 'character';
						var bookname = document.createElement("div");
						var fTitle = document.createElement('div');
						var price = document.createElement('div');
						var hyprice = document.createElement('div');
						var xyprice = document.createElement('div');
						
						//创建星星的div
						var starDiv=document.createElement('div');
						starDiv.className='star';
						//根据pf评分获取亮星星的个数；	
						for(var i=0;i<5;i++){
							var star=document.createElement('img');
							star.src='images/star0.png';
							starDiv.appendChild(star);
						}
						if (elem.pf>0) {
							for(var i=0;i<elem.pf;i++){
								starDiv.childNodes[i].src='images/star.png';
							}
						}
						var pic = document.createElement('img');

						//图书信息创建
						var productInfor = document.createElement('div');
						var author = document.createElement('div');
						author.className = 'sCharacter';
						var publisher = document.createElement('div');
						publisher.className = 'sCharacter';
						var isbn = document.createElement('div');
						var sjDate = document.createElement('div');

						var pubDate = document.createElement('div');
						var kb = document.createElement('div');
						var page = document.createElement('div');
						var version = document.createElement('div');
						var category = document.createElement('div');

						//创建按钮
						var btnDiv = document.createElement('div');
						btnDiv.className = 'btnDiv';
						var buy = document.createElement("button");
						buy.className = 'buy';
						buy.innerHTML = '购买';
						var group = document.createElement('button');
						group.className = 'group';
						group.innerHTML = '团购';
						var collect = document.createElement('button');
						collect.className = 'collect';
						collect.innerHTML = '收藏';
						var information = document.createElement('div');
						information.className = 'information';
						var price = document.createElement('div');
						price.className = 'price';
						var Bimg=document.createElement('img');
						Bimg.src='images/B.png';
						price.innerHTML = "￥" + elem.price;
						//添加信息
						author.innerHTML = elem.author;
						bookname.innerHTML = elem.bookname;
						pic.src = elem.pic;
						pic.className = "picture";

						isbn.innerHTML = elem.isbn;
						publisher.innerHTML = elem.publisher;
						sjDate.innerHTML = elem.sjDate;
						information.innerHTML = author.innerHTML + ' | ' + publisher.innerHTML + ' | ' + isbn.innerHTML + ' | ' + sjDate.innerHTML;
						
						btnDiv.appendChild(collect);
						btnDiv.appendChild(group);
						btnDiv.appendChild(buy);
						character.appendChild(bookname);
						character.appendChild(information);
						character.appendChild(starDiv);
						character.appendChild(Bimg);
						character.appendChild(price);
						character.appendChild(btnDiv);
						saleInfor.appendChild(pic);
						saleInfor.appendChild(character);
						saleInfor.className = 'saleInfor';
						contentDiv.appendChild(saleInfor);
						//console.log(saleInfor);
					})
					var c_div = document.createElement('c_div');
					c_div.className='c_div';
					c_div.innerHTML="最近没有添加商品";
					sp_list.appendChild(c_div);
					var prices=0;
					var count_div=document.createElement('div');//统计共有几件商品和价钱
					count_div.className='count_div';
					var bn=document.createElement('button');
					bn.className='bn';
					bn.innerHTML='￥去结算';
					sp_list.appendChild(count_div);
					var include=document.createElement('div');
					include.appendChild(count_div);
					include.appendChild(bn);
					include.style.display='none';
					sp_list.appendChild(include);
					
					//将商品添加到购物车中
					var bor = document.getElementsByClassName('border')[0];
					for (var i = 0; i < buy_btn.length; i++) {
						buy_btn[i].onclick = function(e) {
							var q=0;
							var join=document.getElementsByClassName('join_div');
							for(var t=0;t<join.length;t++){
								q+=join[t].childNodes[2].childNodes[1].count;
							}
							j=q;
							characters.innerHTML='\<p\>商品已成功加入购物车!\</p\>'+'购物车中共'+j+'件商品，合计￥'+prices;
							bor.style.left = e.clientX-bor.offsetWidth+ 'px';
							bor.style.top = e.clientY - bor.offsetHeight+ 'px';
							bor.style.display = 'block';
							var aim = e.target || e.srcElement;
							var sp = aim.parentNode.parentNode.parentNode;
							var index = sp.getAttribute('index');
							if (j==0) {
								count=1;
								addbook();
								inner();
							}else{
								disappear();
								var flag=false;
								for(var k=0;k<join.length;k++){
									if (index==join[k].index) {
										j++;
										var span=join[k].childNodes[2].childNodes[1];
										span.count++;
										//console.log(span);
										span.innerHTML=' X '+span.count;
										flag=true;
										prices=Number(prices)+responseData[index].price;
										//console.log(prices);
										inner();
									}
								}if (k==join.length&&!flag) {
									count=1;
									addbook();
									inner();
								}
							}
							function addbook(){
								var pic = document.createElement('img');
								pic.src = responseData[index].pic;
								pic.className = 'pic';
								var author = document.createElement('div');
								author.innerHTML = responseData[index].author;
								author.className = 'ap';
								var price = document.createElement('div');
								var span=document.createElement('span');
								span.count=count;
								span.innerHTML=' X '+span.count;
								span.style.fontWeight='bold';
								span.style.color='#fc7215';
								price.innerHTML = '￥' + responseData[index].price;
								price.className = 'ap';
								price.appendChild(span);
								prices=Number(prices)+responseData[index].price;
								var join_div = document.createElement('div');
								join_div.className = 'join_div';
								c_div.innerHTML = '最近加入的商品';
								var dele=document.createElement('div');//购物列表中的删除
								dele.innerHTML='删除';
								dele.className='dele';
								join_div.appendChild(pic);
								join_div.appendChild(author);
								join_div.appendChild(price);
								join_div.appendChild(dele);
								join_div.index=index;//方便找到购物列表中已出现的商品
								j++;
								sp_list.insertBefore(join_div,include);
								dele.onclick=function(){
									j=Number(num.innerHTML);
									j--;
									console.log('j= '+j)
									var sd=0;	  	//deles[r].style.color='red';
									prices=Number(prices)-responseData[index].price;
									prices=prices.toFixed(2);
									var sl=join_div.childNodes[2].childNodes[1];
									sl.count--;
									inner();
									join_div.childNodes[2].childNodes[1].innerHTML=' X '+sl.count;
									if (sl.count==0) {
										sp_list.removeChild(join_div);
									}			//inner();
									if (j==0) {
										prices=0;j=0;
										include.style.display='none';
										c_div.innerHTML="最近没有添加商品";
									}
									//inner();	
								}	
								include.style.display='block';
							}
							//console.log(sp.getAttribute('index'));	
						}
					}
					//购物列表信息改变函数
					function inner(){
						num.innerHTML = j;
						var price=Number(prices).toFixed(2);
						//console.log(typeof prices);
						prices=price;
						count_div.innerHTML='共'+j+'件商品，共计￥'+prices;
						characters.innerHTML='\<p\>商品已成功加入购物车!\</p\>'+'购物车中共'+j+'件商品，合计￥'+prices;
					}
					var characters=document.createElement("div"); 
					characters.className='characters';
					border.appendChild(characters);
					document.getElementById('del').onclick=function () {
						bor.style.display = 'none';
					}
					//鼠标悬浮在购物列表，其出现
					function display() {
						sp_list.style.display = 'block';
					}
					//鼠标离开购物列表，其消失
					function disappear() {
						sp_list.style.display = 'none';
					}
					stick.onmouseover = function(e) {
						display();
					}
					stick.onmouseout = function() {
						disappear();
					}

					sp_list.onmouseover = function() {
						display();
					}
					sp_list.onmouseout = function() {
						disappear();
					}
					//继续购物，购物车提示消失		
					b_n1.onclick=function(){
						bor.style.display = 'none';
					}
					//购物车提示5秒后消失
					setTimeout(function(){
						bor.style.display = 'none';
					},5000);

					//去结算bn,b_n2
					bn.onclick=function(){
						pay();
					}
					b_n2.onclick=function(){
						pay();
					}
					stick.onclick=function(){
						pay();
					}
					//购物车页面
					var empty=document.getElementById('empty');//购物车中没有商品时出现的
					var bn2=document.getElementsByClassName('bn2')[0];//去结算按钮
					var aN=document.getElementById('aN');
					var tab=document.getElementById('tab');
					var selectAll=document.getElementById('selectAll');//全选复选框
					var bookStore=document.getElementById('Bookstore');//去结算界面的商品列表
					var js=document.createElement('div');
					js.className='js';
					var checkAll=document.createElement('input');
					checkAll.id='checkAll';
					checkAll.type='checkbox';
					js.appendChild(checkAll);
					var sel=document.createElement('a');
					sel.innerHTML='全选';
					js.appendChild(sel);
					var sc=document.createElement('button');
					sc.innerHTML='删除';
					js.appendChild(sc);
					var zj=document.createElement('span');//总计有多少商品？价钱是多少？
					zj.id='z_count';
					js.appendChild(zj);
					var table=document.createElement('table');
					table.id='firTable';
					tab.appendChild(js);
					tab.insertBefore(table,js);
					function pay(){
						container.style.display='none';
						bookStore.style.display='block';
						var joinList=document.getElementsByClassName('join_div');
						console.log(joinList);
						if (joinList.length!=0) {
							empty.style.display='none';
							bn2.style.display='block';
							js.style.display='block';
							selectAll.style.display='block';
							var c=0;//商品总件数
							var mn=0;
							var money=0;//总价钱
							//创建结算列表的最后一行列表：选中的件数以及总共价钱
							for(var i=0;i<joinList.length;i++){
								var every=joinList[i].childNodes[2].childNodes[1].count;//购物列表中每件商品内的件数
								var mon=Number(money)+Number((responseData[joinList[i].index].price*every).toFixed(2));
								money=mon;
								mn=mn+joinList[i].childNodes[2].childNodes[1].count;
								console.log('////'+joinList[i].childNodes[2].childNodes[1].count);
								console.log('mn='+mn);
								num.innerHTML=mn;
								//console.log(money);
								zj.innerHTML='总共有'+num.innerHTML+'件商品，共计'+money+'元';
								var tr=document.createElement('tr');
								tr.index=joinList[i].index;//便于删除或添加第一个页面中的与该页面想听操作的商品
								table.appendChild(tr);
								for(var j=0;j<7;j++){
									var td=document.createElement('td');
									tr.appendChild(td);
								}
								var sn1=document.createElement('button');
								sn1.innerHTML='-';
								sn1.className='sn1';
								var sn2=document.createElement('button');
								sn2.innerHTML='+';
								sn2.className='sn2';
								var sr=document.createElement('input');
								sr.type='text';
								sr.className='sr';
								sr.value=every;
								//console.log(joinList[i].childNodes[2].childNodes[1].innerHTML.split('')[3]);
								sr.style.textAlign='center';
								c+=parseInt(sr.value);
								var check=document.createElement('input');
								check.type='checkbox';
								check.className='check';
								var a_td=document.getElementsByTagName('tr')[i].childNodes;
								//console.log(a_td);
								var a=document.createElement('a');
								a.href="#";
								var bookname=document.createElement('span');
								bookname.style.verticalAlign='middle';
								bookname.style.float='left';
								bookname.innerHTML=responseData[joinList[i].index].bookname;
								var tu=document.createElement('img');
								tu.src=joinList[i].childNodes[0].src;
								tu.style.width='80px';
								tu.style.height='100px';
								a.innerHTML='删除';
								a_td[0].style.width='51px';
								a_td[1].style.width='441px';
								a_td[2].style.width='99px';
								a_td[2].style.color="#fc7215";
								a_td[3].style.width='99px';
								a_td[3].style.color="#fc7215";
								a_td[4].style.width='116px';
								a_td[5].style.width='116px';
								a_td[5].style.color="#fc7215";
								a_td[6].style.width='51px'; 
								a_td[0].appendChild(check);
								//console.log(joinList[i].childNodes[0]);
								a_td[1].appendChild(tu);
								a_td[1].appendChild(bookname);
								a_td[2].innerHTML='￥'+responseData[joinList[i].index].hyPrice;
								a_td[3].innerHTML='￥'+responseData[joinList[i].index].price;
								a_td[4].appendChild(sn1);
								a_td[4].appendChild(sr);
								a_td[4].appendChild(sn2);
								console.log(responseData[joinList[i].index].price);
								a_td[5].innerHTML='￥'+(responseData[joinList[i].index].price*every).toFixed(2);
								a_td[5].jq=(responseData[joinList[i].index].price*every).toFixed(2);
								a_td[6].appendChild(a);
								//console.log(a_td[0]);
							}
							var sn1=document.getElementsByClassName('sn1');
							var sn2=document.getElementsByClassName('sn2');
							var t_r=document.getElementsByTagName('tr');
							var hs=t_r.length;
							var joinlist=document.getElementsByClassName('join_div');
							var checkall=document.getElementById('checkAll');
							//删除第二个页面中的商品,同时删除原页面的购物列表中的商品
							var a=document.getElementsByTagName('a');
							for(var z=0;z<a.length;z++){
								a[z].onclick=function(){
									hs--;
									//console.log(hs);
									this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);	
									for(var i=0;i<joinlist.length;i++){
										if (this.parentNode.parentNode.index==joinlist[i].index) {
											sp_list.removeChild(joinlist[i]);
										}
									}
									redefine();
									if (hs==0) {
										var js=document.getElementsByClassName('js')[0];
										var bn_2=document.getElementsByClassName('bn2')[0];
										js.style.display='none';
										bn_2.style.display='none';
										empty.style.display='block';
										js.style.display='none';
										selectAll.style.display='none';
										include.style.display='none';
									}

								}
							}
							var checks=document.getElementsByClassName('check');
							var flag=false;
							checkall.onclick=function(){
								for(var i=0;i<checks.length;i++){
								  	checks[i].checked=checkall.checked;
								}
							}
							for(var a=0;a<sn1.length;a++){
								sn1[a].onclick=function(){
									var e_money=this.parentNode.nextSibling;
									var gs=Number(this.parentNode.childNodes[1].value);//输入框的值
										//console.log(typeof gs);
										//console.log(gs);
									if (gs==0) {
										gs==0;
									}else{
										gs--;	
										this.parentNode.childNodes[1].value=gs;
									}
									var s=(gs*Number(this.parentNode.parentNode.childNodes[3].innerHTML.substring(1))).toFixed(2);
									e_money.innerHTML='￥'+s;
									redefine();
									inner();	
								}
							}
							for(var b=0;b<sn2.length;b++){
								sn2[b].onclick=function(){
									var e_money=this.parentNode.nextSibling;
									var gs=Number(this.parentNode.childNodes[1].value);
									gs++;
									this.parentNode.childNodes[1].value=gs;
									var s=(gs*Number(this.parentNode.parentNode.childNodes[3].innerHTML.substring(1))).toFixed(2);
									e_money.innerHTML='￥'+s;
									redefine();
									inner();
								}
							}
							
							function redefine(){
								var m=0;var n=0;
								var characters=document.getElementsByClassName('characters');
								for(var x=0;x<t_r.length;x++){
									m+=Number(Number(t_r[x].childNodes[5].innerHTML.substring(1)).toFixed(2));
									//console.log(typeof Number(t_r[x].childNodes[5].innerHTML.substring(1)).toFixed(2));
									money=m;
									
									var span=joinList[x].childNodes[2].childNodes[1];
									span.count=Number(t_r[x].childNodes[4].childNodes[1].value);
									span.innerHTML=span.count;
									n=Number(n)+Number(span.count);
								}
								j=n;
								zj.innerHTML='总共有'+j+'件商品，共计￥'+money+'元';
								prices=money;
								//console.log(zj);
								num.innerHTML=j;
								//console.log(num);
								count_div.innerHTML='共'+j+'件商品，共计￥'+prices;
								//console.log(count_div);
								characters.innerHTML='\<p\>商品已成功加入购物车!\</p\>'+'购物车中共'+j+'件商品，合计￥'+prices;
								//console.log(characters);
							}
							//第二面转第一面,继续购物
							aN.onclick=function(){
								var o=0;
								for(var y=0;y<t_r.length;y++){
									o+=joinList[y].childNodes[2].childNodes[1].count;
								}
								j=o;
								num.innerHTML=j;
								bookStore.style.display='none';
								table.innerHTML='';
								container.style.display='block';
								console.log(bookStore);
								count_div.innerHTML='共'+j+'件商品，共计￥'+prices;
								characters.innerHTML='\<p\>商品已成功加入购物车!\</p\>'+'购物车中共'+j+'件商品，合计￥'+prices;
							}
						}else{
							js.style.display='none';
							empty.style.display='block';
							bn2.style.display='none';
						}

					}
				}	
			}
		}  
		//进入登录页面
		container.addEventListener('keydown',function(event){
			if(event.keyCode=='65'){
				window.open('bookcharge.html');
			}
		})
