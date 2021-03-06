// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// script che viene chiamato per mostrare tutti gli assistance services relativi ad una certa categoria: l'id su cui viene fatta la query
// viene passato tramite l URL
$("document").ready(function(){
        console.log("la funzione loadass stata chiamata correttamente");
         var value = getUrlVars()["id"];
        console.log(value);
        $.ajax({
            method: "GET",
            //dataType: "json", //type of data
            crossDomain: true,
            url: "./php/deviceByCategory.php", //Relative or absolute path to file.php file
            data: {id:value},
            success: function(response) {
                  var device = JSON.parse(response)
            for(var i=0;i<device.length;i++){ 
               $(".results").append("<div class='well col-md-6 container-fluid' id='" + i + "'></div>");
                $(".categoryname").text("" + value +"");
                $("#"+ i).append("<h2>"+  device[i].device_name +"</h2>");
                $("#"+ i).append("<img src='" + device[i].img + "' class='img-responsive pull-left gap-right' style='max-width: 150px; max-height: 178px;'>");
                $("#"+ i).append("<p> &euro; "+  device[i].price +"</p>");
                $("#"+ i).append('<a type="submit" class="query pull-right btn btn-info" onclick="showdevicedetail(\''+device[i].id+'\');">Discover it!</a>');               
            }

                
            },
            error: function(request,error) 
            {
                console.log(request+":"+error);
            }
        });
        return false;
    });