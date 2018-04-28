$(document).ready(function(){	
 var id = $("#categoria").val(); 
 var zona = $("#zona").val();
 var dato = 'categoria=' + id + '&zona=' + zona;
 $.ajax({    
  type: "POST",
  url: "ajax/tablaPosiciones.php",                     
  data: dato,   		            
  success: function(response){                    
    $("#responsecontainer").html(response);  

  }
}); 

 $("#categoria").change(function(){	
   var id = $("#categoria").val(); 
   var zona = $("#zona").val();
   var dato = 'categoria=' + id + '&zona=' + zona;		
   if(id != 0){		                 
     $.ajax({    
      type: "POST",
      url: "ajax/tablaPosiciones.php",                     
      data: dato,   		            
      success: function(response){                    
        $("#responsecontainer").html(response);         
      }
    });
   }
 });

 $("#zona").change(function(){	
   var id = $("#categoria").val(); 
   var zona = $("#zona").val();
   var dato = 'categoria=' + id + '&zona=' + zona;		
   if(id != 0 ){		                 
     $.ajax({    
      type: "POST",
      url: "ajax/tablaPosiciones.php",                     
      data: dato,   		            
      success: function(response){                    
        $("#responsecontainer").html(response);         
      }
    });
   }
 });
});
