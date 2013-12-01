var port = chrome.runtime.connect({name: "mouseEnabled"});
// query background script for enabled status of
// mousey in the current tab
port.postMessage({getEnabled: '1'})

// on response take appropriate enable/disable action
port.onMessage.addListener(function(msg) {
        console.log('content onMessage');
        sessionStorage.setItem('enabled', msg.enabled);
        console.log(msg.enabled);
        addRemoveMousey();
        //port.postMessage({answer: "Madame"});
        });

// add/remove mousey depending on enabled status
function addRemoveMousey()
{
    test = document.getElementById("mousey");
    if(test && sessionStorage.getItem('enabled') == 'false'){
        document.body.removeChild(test);
        document.body.onmousemove = null;
    }else if (!test && sessionStorage.getItem('enabled') == 'true' && document.getElementsByTagName('body').length !== 0){
        var mousey = document.createElement("canvas");
        var ctx = mousey.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,13);
        ctx.lineTo(4,11);
        ctx.lineTo(6,15);
        ctx.lineTo(8,14);
        ctx.lineTo(6,9);
        ctx.lineTo(10,9);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.fillStyle = 'red';
        ctx.fill();
        //mousey.style.width = "10px";
        //mousey.style.height = "10px";
        // mousey.style.minheight="100px";
        //mousey.style.background = "red";
        //mousey.style.color = "white";
        mousey.style.position = "absolute";
        mousey.id = "mousey";
        mousey.style.zIndex = "1000000";
        mousey.style.pointerEvents = "none";
        document.body.appendChild(mousey);

        //var elem = document.createElement("canvas");
        ////elem.src = chrome.extension.getURL("cursor.png");
        //elem.style.height="10px";
        //elem.style.width="10px";
        //var ctx=elem.getContext("2d");
        //ctx.fillStyle="#FF0000";
        //ctx.fillRect(0,0,150,75);
        //mousey.appendChild(elem);

        document.body.onmousemove = function(e){
            var x = e.pageX;
            var y = e.pageY;
            mouse = document.getElementById("mousey");
            mouse.style.top = y+"px"; 
            mouse.style.left = x+"px";
        }
    }
}
