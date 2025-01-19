
function phk_formcheck(input,evt) {
  input.setAttribute("disabled","");
  input.removeAttribute("disabled");

	if (input.getAttribute("data-phk_emailcheck")!="0"||
		input.getAttribute("data-phk_textlimit")!="0"
	) {
		input.setAttribute("disabled","disabled");
	}
}


function emailcheck(email1sel,email2sel,inputsel) {
	"use strict";

	function check(email1,email2) {
		if (email1==null) return true;
		if (email2==null) return true;

		if (email1.value=="") return false;
		if (email2.value=="") return false;
		if (email1.value!=email2.value) return false;

		return true;
	}

	function event_change(evt) {
		try {
			if (!check(email1,email2)) {
				if (input!=null) {
						  input.setAttribute("disabled","disabled");
						  input.setAttribute("data-phk_emailcheck","1");
				}
			} else {
					  if (input!=null) {
						  input.setAttribute("disabled","");
						  input.removeAttribute("disabled");
						  input.setAttribute("data-phk_emailcheck","0");
					  }

			}
		} catch (e) {
			console.log("error",e);
			if (input!=null) {
				input.setAttribute("disabled","");
				input.removeAttribute("disabled");
			  input.setAttribute("data-phk_emailcheck","0");
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

	var email1;
	var email2;
	var input;

	try {
		email1sel=email1sel||"#email";
		email2sel=email2sel||"#email_repeat";
		inputsel=inputsel||"#email_submit";

		if (typeof(email1sel)=="string") {
			email1=document.querySelector(email1sel);
		} else {
			email1=email1sel;
		}
		if (email1==null) { return; }
		if (typeof(email2sel)=="string") {
			email2=document.querySelector(email2sel);
		} else {
			email2=email2sel;
		}
		if (email2==null) { return; }

		if (typeof(inputsel)=="string") {
			input=document.querySelector(inputsel);
		} else {
			input=inputsel;
		}
		if (input!=null) {
			input.phk_formcheck=phk_formcheck;
		}

		email1.onkeydown=event_change;
		email1.oninput=event_change;
		email1.onpaste=event_change;

		email2.onkeydown=event_change;
		email2.oninput=event_change;
		email2.onpaste=event_change;

		event_change();
	} catch (e) {
		console.log("error",e);

	}


}

emailcheck(
	null
	,null
	,".dbf_html_insert_send"
);
