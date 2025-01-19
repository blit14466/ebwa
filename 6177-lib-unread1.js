
function report_js_error(e) {
	try {
		e=e||{};
		var data={};
		data.message=e.message;
		data.lineNumber=e.lineNumber;
		data.fileName=e.fileName;
		data.stack=e.stack;
		var datastr=JSON.stringify(data);

		var xmlHttpReq = false;
		var ajax=null;
		if (window.XMLHttpRequest) { ajax = new XMLHttpRequest(); } else if (window.ActiveXObject) { ajax = new ActiveXObject("Microsoft.XMLHTTP"); }
		if (ajax==null) {
			console.log("no ajax obj");
			return;
		}
		ajax.open('POST', "/x_jsexc.php", true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		ajax.send("d="+encodeURIComponent(datastr));
		//ajax.onreadystatechange=onreadystatechange;
	} catch (e) {
		console.log("error in error reporter ",e);
	}
}

function unread_update(first) {
	function show_result(res) {
		try {
			var el=document.getElementById("unread");
			if (el==null) return;
			el.title="updated: "+(new Date());
			var before=el.getAttribute("data-phk_unread");

			if (res!=before) {
				el.setAttribute("data-phk_changed",1);
				el.setAttribute("data-phk_unread",res);
				el.title+=" - has changed";
				if (res>0) {
						  if (document.title.indexOf("*")<0) {
							  document.title="* "+document.title;
						  }
				} else {
					document.title=document.title.replace("* ","");
				}
			} else {
				if (delay<1000*60*60*60) {
					delay*=2;
				}
			}
			if (res=="-1"||res=="?") { res="logged out"; el.title+="  ... logged out?";}
			var t="("+res+")";
			el.textContent=t;
			el.className="msg msg_"+(res.replace(" ","_"));
		} catch (e) {
			//console.log(e);
			report_js_error(e);
		}
		setTimeout(unread_update,delay);
	}
	function onreadystatechange() {
		try {
			if (ajax.readyState!=4) {
				return;
			}
			if (ajax.status==200) {
				show_result(ajax.responseText);
				return;
			}
			show_result(-1);
		} catch (e) {
			report_js_error(e);
			show_result(-1);
		}
	}

	var delay=1000*180;

	if (first) {
		setTimeout(unread_update,delay);
		return;
	}

	try {
		var xmlHttpReq = false;
		if (window.XMLHttpRequest) {
			ajax = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		ajax.open('GET', 'x_unread.php', true);
		ajax.onreadystatechange=onreadystatechange;
			
		ajax.send("");
	} catch (e) {
		report_js_error(e);
		show_result(-1);
	}

}
unread_update(true);
