let y, x = undefined, r;

function isNum(n) {
    let regexp = /^-?\d[\.,]?\d*$/;
    let val = regexp.test(n);
    return val;
}

function checkY() {
    y = document.getElementsByName("Y")[0].value;
    if (isNum(y.toString()) && y.length > 0) {
        y = y.replace(',', '.');
        y = parseFloat(y);
        return (y <= 3 && y >= -5) && !isNaN(y);
    }
}

function checkX() {
    x = document.querySelector(".Xbtn input:focus").value;
    console.log("Checked X: \"" + x + "\"");
}

function checkR() {
    let z = 0;
    let Rmass = document.getElementsByName('R');
    for (var i = 0; i < Rmass.length; i++) {
        if (Rmass[i].checked) {
            z++;
        }
    }
    return z === 1;
}
function result(x,y,r){
    if (x >= 0 && x <= r && y >= 0 && y <= r / 2) {
        return true;
    } else if (x > 0 && y < 0 && (x * x + y * y <= r*r)) {
        console.log("Yes");
        return true;
    } else if (x < 0 && y < 0 && (-x / 2 - r / 2 <= y)) {
        return true;
    }
    return false;
}

document.getElementById("btn").onclick = function () {
    if (checkY() && checkR() && isNum(x)) {
        y = document.getElementsByName("Y")[0].value;
        r = document.querySelector('input[type="checkbox"]:checked').value;
        console.log("x=" + x + "\ny=" + y + "\nr=" + r);
        let req = new XMLHttpRequest();
        let queryData = "Y=" + y + "&X=" + x + "&R=" + r;
        req.open("POST", "/fuck-1.0-SNAPSHOT_war/ControllerServlet" );
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(queryData);
        req.onload = function () {
            let tableWindow = window.open("/fuck-1.0-SNAPSHOT/ControllerServlet_war", "_parent");
            tableWindow.document.write(this.responseText);
            tableWindow.focus();
            console.log(tableWindow.location);
            tableWindow.document.close();
        }
    } else {
        if(!checkY()){
            alert("Bad Y");
            throw Error("Bad Y");
        }else if(!checkX()){
            alert("Bad X");
            alert("Bad X");
            throw Error("Bad X");
        }else if(!checkR()){
            alert("Bad R");
            throw Error("Bad R");
        }
    }
}