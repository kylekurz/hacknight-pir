window.onload = function() {
    var socket = io.connect('http://192.168.1.128:45331');
    var stat = document.getElementById("status");

    socket.on('message', function (data) {
        if(data.message) {
            var html = data.message;
            console.log(data.message);
            stat.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
}
