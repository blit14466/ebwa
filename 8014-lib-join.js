
function request_suggestions(un,text) {
		function get_html_for_response(un,obj) {

			if (obj=="1") return "";

			var s=text||"Not available. Suggestions: ";
			for (var n in obj.names) {
				name=""+obj.names[n];
				if (name==un) { 
					return ""; 
				}
				//s+="<a href=\"join.php?n="+name+"\">"+name+"</a>, ";
				s+="<a href=\""+(document.location.pathname||join.php)+"?n="+name+"\">"+name+"</a>, ";
			}
			return s;
		}
      $.post("x_suggest.php", {"n":un }, function(response) {
			var currentval=$('#account_username').val();
			if (un!=currentval) {
				//console.log("response outdated ",un,currentval);
				return;
			}
			var obj = jQuery.parseJSON(response);
			var s=get_html_for_response(un,obj)||"";
			$("#account_username_info").html(s);
      });
}
function join_check_password_inner(pw1,pw2) {

	if (pw1==null||pw1.length<4) {
		return ($("#trans_min_len").text()||"Minimum length")+": 4";
	}
	if (pw1!=pw2) {
		return ($("#trans_password_nomatch").text()||"Passwords don't match");
	}
	return null;

}
function join_check_password() {

	var pw1=$('#account_password').val();
	var pw2=$('#account_password_repeat').val();

	var msg=join_check_password_inner(pw1,pw2);
	msg=msg||"";
	$("#account_password_info").html(msg);
}
function join_check_username_inner(un) {
	if (un==null||un.length<3) {
		return ($("#trans_min_len").text()||"Minimum length")+": 3";
	}

	if (/^[a-zA-Z0-9 ]+$/.test(un)==false) {
		return ($("#trans_account_username_requirements").text()||"Only letters,numbers,space");
	}


	var text=$("#trans_not_available").text();

	request_suggestions(un,text);


	return null;
}

function join_check_username() {

	var un=$('#account_username').val();


	var msg=join_check_username_inner(un);
	msg=msg||"";

	$("#account_username_info").html(msg);
}
function prevent_resubmit() {
	try {


		var form = document.querySelector('.reg_form');
		if (form==null) return;
		if (form.reportValidity==null) return;
		form.onsubmit = function(e){
			if (form.reportValidity()) {
				form.onsubmit = function(e) { console.log("no resubmit"); return false; } 
			}
			return true;
		}
	} catch (e) {
	   console.error(e);
	}

}

$(document).ready(function() {
	$('input#account_username').keyup(join_check_username);
	$('input#account_password').keyup(join_check_password);
	$('input#account_password_repeat').keyup(join_check_password);

	prevent_resubmit();
});
