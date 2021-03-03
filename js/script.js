var arr = [];
var memeArr = [];
var i = 2;
var blackList = [];
var callCount = 0;
var imageCheckCount = 0;

$(document).ready(function () {
    $(".btn-success").hide();

        
    
    var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

    function doCORSRequest(options, printResult) {
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url);
        x.onload = x.onerror = function () {
            printResult(
                (x.responseText || '')
            );
        };
        if (/^POST/i.test(options.method)) {
            x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        x.send(options.data);
    }



    $(".btn-success").click(function () {

        $("#meme").attr("src", arr[arr.length - i]);
        i++;
      
    });

    $(".btn-primary").click(function () {


        getMeme();


        
    });


    function getMeme() {
       
        i = 2;
        $(".btn-success").show();
        doCORSRequest({
            method: 'GET',
           url:'http://alpha-meme-maker.herokuapp.com/memes/'+Math.floor((Math.random() * 100) + 1),

        }, function printResult(result) {
           
            var jsonObj = jQuery.parseJSON(JSON.stringify(result));
            var jsonObj2 = (JSON.parse(jsonObj));
             console.log(jsonObj2);
            var imgUrl = (jsonObj2.data.image);
            
                callCount++;
            
            setImage(imgUrl);
 
            if (jsonObj2.code != '200') { //if http request does not return OK status
                getMeme();
            }

        })
    }
    
function setImage(img){
     
                memeArr.push(img);

                
               
                $("#meme").attr("src", img)

                    
                $("#meme").on('load', function () {
                    if(callCount==imageCheckCount+1){
                        imageCheckCount++;
                    
                  
                        
                        arr.push($("#meme").attr("src"));
                        console.log(arr);


                  
                       
                    }
                })
            

            $("#meme").on('error', function () {
                
                     if(callCount==imageCheckCount+1){
                        imageCheckCount++;
                    
                
                    console.log("Error getting image.");
                    console.log(img);
                    blackList.push(img);

                    $("#meme").attr("src", '  https://via.placeholder.com/350x150')

                   
                        getMeme();
                   
                     }
            });
}


});
