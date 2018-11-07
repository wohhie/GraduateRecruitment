$(function(){
	
	$.getJSON('api/getDepartment',fnDepartment);
	
	$("#contactform").submit(function(e){
		e.preventDefault(); 
		 
		if(validateContactForm())
		{ 
			$.post("api/contact",{
				name : $("#name").val(),
				email : $("#email").val(),
				department : $("#ddlDepartment").val(),
				message : $("textarea#message").val()
			},funAlertSuccess)
		}	
	});
	
	function funAlertSuccess(data)
	{ 
		if(typeof(data.errno) != "undefined" &&  data.errno!="")
		{
			//alert(data.errno);
			//alert(data.sqlMessage);
			$("#message").text(data.sqlMessage);
		}
		else
		{
			$('#tab4').addClass("div_active");
		    $('#tab4').removeClass('div_unactive');
		    
		    $('#tab1').addClass("div_unactive");
		    $('#tab1').removeClass('div_active');
		    $('#tab2').addClass("div_unactive");
		    $('#tab2').removeClass('div_active');
		    $('#tab3').addClass("div_unactive");
		    $('#tab3').removeClass('div_active');
		    
		    $('#tab11').addClass("div_unactive");
		    $('#tab11').removeClass("div_active1");
		    
		    $("#name").val("");
		    $("#email").val(""); 
		    $('#ddlDepartment option')[0].selected = true;
		    $("#textarea#message").val("");
		    
		    $("#message").text("Message submitted successfully.");
		}
	}
	
	//create department dropdown list
	function fnDepartment(data)
	{ 
		var select = document.getElementById("ddlDepartment");
		
		$.each(data,function(key,item){
			var option = document.createElement("option");
			option.text = item.DeptName;
			option.value = item.DeptName;
			select.appendChild(option);
		}); 
	}
	
	var flag = true;

	function ValidateEmail(email) {
		var expr = /^([\w-\.]+@@([\w-]+\.)+[\w-]{2,4})?$/;
		return expr.test(email);
	};
	
	function validateContactForm() {		
		if ($('#name').val().length === 0) {
			$('#E1').removeClass('hide_error');
			$('#E1').addClass('show_error');
			flag = false;
		}
		else {
			$('#E1').removeClass('show_error');
			$('#E1').addClass('hide_error');
		}			 

		if ($('#email').val().length === 0) {
			$('#E2').removeClass('hide_error');
			$('#E2').addClass('show_error');
			flag = false;
		}
		else {
			$('#E2').removeClass('show_error');
			$('#E2').addClass('hide_error'); 
			
			if (!ValidateEmail($('#email').val())) {
				$('#E3').removeClass('hide_error');
				$('#E3').addClass('show_error');
				flag = false;
			}
			else {
				$('#E3').removeClass('show_error');
				$('#E3').addClass('hide_error');
			}
		}			 
		
		if ($('#ddlDepartment').val() == "-select-") {
			$('#E4').removeClass('hide_error');
			$('#E4').addClass('show_error');
			flag = false;
		}
		else {
			$('#E4').removeClass('show_error');
			$('#E4').addClass('hide_error');
		}
		 
		if ($('textarea#message').val().length === 0) {
			$('#E5').removeClass('hide_error');
			$('#E5').addClass('show_error');
			flag = false;
		}
		else {
			$('#E5').removeClass('show_error');
			$('#E5').addClass('hide_error');
		}

		if (flag == true) {
			return true;
		}
		else {
			return true; //need to change
		}
	}
	
});


