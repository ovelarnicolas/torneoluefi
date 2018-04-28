 $(document).ready(function(){	   
   var zona = $("#zona").val();
   var categoria = $("#categoria").val();
   var dato = 'categoria=' + categoria + '&zona=' + zona;
   $.ajax({    
    type: "POST",
    url: "ajax/fixture.php",                     
    data: dato,   		            
    success: function(response){                    
      $("#responsecontainer").html(response);  			    
    }
  }); 	

   $("#categoria").change(function(){	     
     var zona = $("#zona").val();
     var categoria = $("#categoria").val();
     var dato = 'categoria=' + categoria + '&zona=' + zona;    	               
       $.ajax({    
        type: "POST",
        url: "ajax/fixture.php",                     
        data: dato,   		            
        success: function(response){                    
          $("#responsecontainer").html(response);         
        }
      });     
   });
 });