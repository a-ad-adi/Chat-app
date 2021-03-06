
    //socket connection test
    $(function(){
        var socket = io.connect();
        var $chatWindow = $('.chat-window');
        
        //add user
        $('#userForm').submit(function(e){
            e.preventDefault();
            var userName = $('#username').val();
            if(userName != "" && userName.length > 0){
                socket.emit('addUser', userName);
                $('#newUser').attr('disabled','disabled');
            }

        });

        socket.on('updateUsers',function(data){
            $('.users').append(
            '<div class="user">' +
                '<h5>'+data.user+'</h5>' +
            '</div>'
            );
        });

        //send message    
        $('#frm').submit(function(e){
            e.preventDefault();
            var msg = $('.text-input');
            var user = $('#username');

            var message;
            message = {
                        message: msg.val(),
                        user: user.val()
                      };
            socket.emit('send', message);
            msg.val('');            

        });

        //append message to chat window
        socket.on('new msg',function(data){
            console.log("new msg: " + data.msg);
            var thisUser = $('#username').val();
            if(data.user == thisUser){
                if(data.msg != "" && data.msg.length > 0){                
                    $chatWindow.append('<div class="row">'+
                                                    '<div class="message message-left">'+ data.msg +'</div>'+
                                                '</div>');
                    }else{
                        //empty message prompt
                        console.log("error");
                    }
                }else{
                    if(data.msg != "" && data.msg.length > 0){    
                        $chatWindow.append('<div class="row">'+
                        '<div class="message message-right">'+ data.msg +'</div>'+
                        '</div>');
                    }else{
                        //empty message prompt
                        console.log("error");
                    }

                }        
        });
    });