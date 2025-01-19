
function textlimit(areasel,infosel,inputsel,max) {
	"use strict";
	function event_change(evt) {
		try {
			var len=area.value.length;

			var infotext=""+len+" characters written. "+max+" characters maximum";
			if (len==max) {
				infotext+=" reached";
			}
			
			var mytitle=" Text too long";
			if (len>max) {
				infotext+=". Too long";
				area.setAttribute("data-phk_textlimit",1);
				if (info!=null) {
					info.setAttribute("data-phk_textlimit",1);
				}


				if (input!=null) {
					input.setAttribute("data-phk_textlimit",1);
					input.setAttribute("disabled","disabled");

					try {
						var title=input.getAttribute("title");
						if (title==null||title.indexOf(mytitle)<0) {
							input.setAttribute("title",(title||"")+mytitle);
						}
					} catch (e) { console.log(e); }
				}

			} else {
				var val=0;
				if (len==max)  { val=2; }
				area.setAttribute("data-phk_textlimit",val);
				if (info!=null) {
					info.setAttribute("data-phk_textlimit",val);
				}
				if (input!=null) {
					input.setAttribute("data-phk_textlimit",val);
					input.setAttribute("disabled","");
					input.removeAttribute("disabled");
					try {
						var title=input.getAttribute("title");
						if (title!=null&&title.indexOf(mytitle)>=0) {
							input.setAttribute("title",title.replace(mytitle,""));
						}
					} catch (e) { console.log(e); }
				}

			}
			if (info!=null) {
				if (info.textContent!=null) {
					info.textContent=infotext+".";
				} else {
					info.innerHTML=infotext+".";
				}
			}
		} catch (e) {
			console.log("error",e);
			if (input!=null) {
				input.setAttribute("data-phk_textlimit",0);
				input.setAttribute("disabled","");
				input.removeAttribute("disabled");
			}
		}

		try {
			if (input!=null&&input.phk_formcheck!=null) {
				input.phk_formcheck(input,evt);
			}
		} catch (e) {
			console.log("error",e);
		}
	}

	var area;
	var input;
	var info;

	try {
		areasel=areasel||"#text";
		infosel=infosel||"#text_limit";
		inputsel=inputsel||"#text_submit";

		if (typeof(areasel)=="string") {
			area=document.querySelector(areasel);
		} else {
			area=areasel;
		}
		if (area==null) { return; }

		max=max||area.getAttribute("data-phk_max")||1000;
		if (typeof(max)=="string") {
			max=parseInt(max,10);
		}

		if (typeof(infosel)=="string") {
			info=document.querySelector(infosel);
		} else {
			info=infosel;
		}
		if (typeof(inputsel)=="string") {
			input=document.querySelector(inputsel);
		} else {
			input=inputsel;
		}

		//area.onchange=event_change;
		//area.onkeyup=event_change;
		area.onkeydown=event_change;
		area.oninput=event_change;
		area.onpaste=event_change;
		//area.onkeypress=event_change;
		
		//if (area.addEventListener) { area.addEventListener('input', event_change); }
    		//if (area.attachEvent) { area.attachEvent('onpropertychange',event_change); }
		event_change();
	} catch (e) {
		console.log("error",e);

	}
}

textlimit(
	null
	,null
	,".dbf_html_insert_send"
);
