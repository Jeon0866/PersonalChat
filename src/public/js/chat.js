// Gemini
$(document).ready(function() {   
    $("#messageAreaGemini").on("submit", function(event) {  
        const date = new Date();                      
        const hour = date.getHours();                 
        const minute = date.getMinutes();             
        const str_time = hour+":"+minute;             
        var rawText = $("#text").val();               

        var userHtml = '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + rawText + '<span class="msg_time_send">'+ str_time + '</span></div><div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div></div>';

        $("#text").val("");
        $("#messageFormeight").append(userHtml);     

        $.ajax({                                      
            data: {                                   
                msg: rawText,
            },
            type: "POST",
            url: `${window.location.origin}/server`,
            //success: function(data){
            //    alert("success");
            //},
            //error: function(err){
            //    alert("false");
            //}                             
        })
        event.preventDefault();                      
         

        $.ajax({                                      
            data: {                                   
                msg: rawText,
            },
            type: "POST",
            url: `${window.location.origin}/homepage`,                          
        })
        .done(function(data) {                      
            var botHtml = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://i.ibb.co/g71jY0h/gemini-logo.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + data + '<span class="msg_time">' + str_time + '</span></div></div>';
            $("#messageFormeight").append($.parseHTML(botHtml));

        event.preventDefault();                      
        }); 

    });   
});   
                