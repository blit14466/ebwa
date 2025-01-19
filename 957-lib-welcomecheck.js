


(function welcomecheck() {
	function doshow() {
		var el=document.querySelector('.welcomecheckalways');
		if (el!=null) {
			console.log("alwaysshow",el);
			return true;
		}
		
		if (localStorage==null) {
			return false;
		}
		var welcome = localStorage.getItem("ppalswelcome");

		if (welcome==null) {
			return false;
		}
		var welcomets=new Date(welcome).getTime();

		var currentts=new Date().getTime();

		var diff=currentts-welcomets;

		console.log("diff ",diff);

		if (diff>1000*60*60*24*28) {
			console.log("been a while");
			return false;
		}
		return true;


	}
	try {
		if (!doshow()) { return; }

		var el=document.querySelector('.reg_form tbody');


		var ch=el.querySelectorAll("tr");
		var last=ch[ch.length-1];

		//console.log("last: ",last);

		var tr=document.createElement("tr");
		var td=document.createElement("td");
			var inp=document.createElement("input");
			inp.name="welcomecheck";
			inp.required="required";
			inp.type="checkbox";
			td.appendChild(inp);
			tr.appendChild(td);
		var td=document.createElement("td");
			//td.textContent="I confirm that this is the first account";
			td.textContent="I confirm that I have not created an account in at least a month."
			tr.appendChild(td);

		el.insertBefore(tr,last);
		





	} catch (e) {
		console.error(e);
	}

})();
