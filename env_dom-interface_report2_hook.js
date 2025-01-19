function report2_hook(id,scripturl) {
	function event_click(evt) {
		evt.preventDefault();
		evt.target.setAttribute("data-phk_loading",1);
		evt.target.setAttribute("data-phk_report2_called",1);
		console.log("click",scripturl);
		//autoload url
      var scriptel = document.createElement('script');
      scriptel.setAttribute('src',scripturl);
      document.head.appendChild(scriptel);
		return false;
	}

	try {
		scripturl=scripturl||"/jsbase/env_dom/interface_report2_call.js";

		var el=null;

		id=id||"report2_hook";

		if (id===undefined) {
			console.log("no id ERRzdv4ec");
			return;
		}
		el=document.getElementById(id);

		if (el!=null) {
			el.onclick=event_click;

			/*el.onkeydown=function(evt) {
				console.log("keypress ",evt.keyCode);
			}*/

			return;
		}

		var els=document.getElementsByClassName(id);

		for (var i = 0; i < els.length; i++) {
			var el=els[i];
			if (el!=null) {
				el.onclick=event_click;
			}
		};
	} catch (e) {
		console.log(e);
	}

}

//$(document).ready(function() {
	report2_hook();
//});
