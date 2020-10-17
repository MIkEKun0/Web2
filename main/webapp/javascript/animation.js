function drawPoint(a, b) {
    console.log("start");
    let context = document.getElementById('canvas').getContext('2d');
    context.beginPath();
    context.moveTo(a, b);
    context.arc(a, b, 1, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.fill();
    context.stroke();
    console.log(a + " " + b);
}

function draw() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    context.font === "1px Verdana";
    //coordinates
    context.beginPath();
    context.moveTo(150, 140);
    context.lineTo(150, 10);
    context.closePath();
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    context.beginPath();
    context.rect(150, 50, 50, 25);
    context.fillStyle = "blue";
    context.fill();
    context.arc(150, 75, 50, 0, Math.PI / 2, false)
    context.fill();
    context.moveTo(148, 75);
    context.lineTo(100, 75);
    context.lineTo(149, 125);
    context.lineTo(149, 75);
    context.fill();

    context.closePath();

    context.beginPath();
    context.moveTo(10, 75);
    context.lineTo(290, 75);
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
    //triangle 1
    context.beginPath();
    context.moveTo(290, 75);
    context.lineTo(290, 70);
    context.moveTo(290, 75);
    context.lineTo(290, 80);
    context.lineTo(300, 75);
    context.lineTo(290, 70);
    context.fill();
    context.stroke();
    context.closePath();
    //triangle 2
    context.beginPath();
    context.moveTo(150, 10);
    context.lineTo(143, 10);
    context.moveTo(150, 10);
    context.lineTo(157, 10);
    context.lineTo(150, 4);
    context.lineTo(143, 10);
    context.strokeStyle = "black";
    context.fill();
    context.stroke();
    context.closePath();
    //text
    context.fillStyle = "black";
    context.fillText("X", 290, 67);
    context.fillText("Y", 160, 10);
    context.fillText("R/2", 167, 65);
    context.fillText("R", 197, 65);
    context.fillText("R/2", 160, 55);
    context.fillText("R", 160, 25);
    // vertical lines
    context.beginPath();
    context.moveTo(200, 70);
    context.lineTo(200, 80);
    context.moveTo(175, 70);
    context.lineTo(175, 80);
    context.moveTo(125, 70);
    context.lineTo(125, 80);
    context.moveTo(100, 70);
    context.lineTo(100, 80);
    context.stroke();
    context.closePath();
    //horizontal lines
    context.beginPath();
    context.moveTo(155, 100);
    context.lineTo(145, 100);
    context.moveTo(155, 125);
    context.lineTo(145, 125);
    context.moveTo(155, 50);
    context.lineTo(145, 50);
    context.moveTo(155, 25);
    context.lineTo(145, 25);
    context.stroke();
    context.closePath();

}

let pic = document.getElementById('canvas');
pic.onclick = function click(event) {
    let clientX = event.offsetX*0.54, offsetY = event.offsetY*0.5;
    console.log("Mouse position (" + clientX + ", " + offsetY + ")");
    if (checkR()) {
        r = document.querySelector('input[type="checkbox"]:checked').value;
        let context = pic.getContext('2d');
        let stepX = context.canvas.width / 3.2;
        let stepY = context.canvas.height / 1.5;
        x = r * (event.clientX - pic.offsetLeft - 275) / stepX;
        y = r * (context.canvas.height / 2 - event.offsetY + 75) / stepY;
        if(result(x,y,r)){
            sessionStorage.setItem("pointX", clientX);
            sessionStorage.setItem("pointY", offsetY);
            let points;
            if(sessionStorage.getItem('points') === null){
                points = [[clientX,offsetY]];
                sessionStorage.setItem('points', JSON.stringify(points));
                console.log(points);
            }else{
                points = JSON.parse(sessionStorage.getItem('points'));
                console.log(points);
                points.push([clientX,offsetY]);
                sessionStorage.setItem('points', JSON.stringify(points));
            }
        }
        let req = new XMLHttpRequest();
        let queryData = "Y=" + y + "&X=" + x + "&R=" + r;
        req.open("POST", "/fuck-1.0-SNAPSHOT/ControllerServlet");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(queryData);
        req.onload = function () {
            let tableWindow = window.open("/fuck-1.0-SNAPSHOT/ControllerServlet", "_parent");
            tableWindow.document.write(this.responseText);
            tableWindow.focus();
            tableWindow.document.close();
        }
    } else {
        console.log('choose R');
        alert("Choose R");
    }
}
function drawtable(){
    let points = document.querySelectorAll('div.scroll');
    for(let i = 0; i < points.length; i+=2){
        drawPoint(points[i].innerHTML, points[i+1].innerHTML);
    }
}
window.onload = function () {
    draw();
    let drawX = sessionStorage.getItem("pointX"), drawY = sessionStorage.getItem("pointY");
    if (drawX !== null && drawY !== null) {
        let points = JSON.parse(sessionStorage.getItem('points'));
        for(let i = 0; i < points.length; i++){
           drawPoint(points[i][0], points[i][1]);
        }
       // drawPoint(drawX, drawY);
    }
}