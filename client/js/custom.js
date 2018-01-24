
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
            }
        });

        socket.on('updateUsers',function(data){
            console.log("New user: " + data.user);
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
            socket.emit('send', msg.val());
            msg.val('');            

        });

        //append message to chat window
        socket.on('new msg',function(data){
            console.log("new msg: " + data.msg);
            if(data.msg != "" && data.msg.length > 0){                
                $chatWindow.append('<div class="row">'+
                                                '<div class="message">'+ data.msg +'</div>'+
                                            '</div>');
                }else{
                    //empty message prompt
                    console.log("error");
                }
        });
    });