<%@ page import="java.util.ArrayList" %>
<%@ page import="container.ResultRow" %>
<%@ page import="container.Rows" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>WebLab2</title>
    <link rel="stylesheet" href="style/stylesheet.css">
</head>
<body onload="draw()">
<header>Лавлинский Михаил Сергеевич, группа P3214, Вариант №2509</header>
<hr>
<div class="form">
<div>
    <canvas id="canvas" onload=""></canvas>
</div>
<div class="values">
<div class="Xbtn">
    <label>X value:</label>
    <input type="button" value="-3" name="X" onclick="checkX()">
    <input type="button" value="-2" name="X" onclick="checkX()">
    <input type="button" value="-1" name="X" onclick="checkX()">
    <input type="button" value="0" name="X" onclick="checkX()">
    <input type="button" value="1" name="X" onclick="checkX()">
    <input type="button" value="2" name="X" onclick="checkX()">
    <input type="button" value="3" name="X" onclick="checkX()">
    <input type="button" value="4" name="X" onclick="checkX()">
    <input type="button" value="5" name="X" onclick="checkX()">
</div>
<div class="Ytext">
    <label>Y value:</label>
    <input type="text" name="Y" onchange="checkY()">
</div>
<div class="Rcheck">
    <label>R value:</label>
    <input type="checkbox" name="R" value="1">1
    <input type="checkbox" name="R" value="2">2
    <input type="checkbox" name="R" value="3">3
    <input type="checkbox" name="R" value="4">4
    <input type="checkbox" name="R" value="5">5
</div>
</div>
<div class="submit">
    <input type="button" value="ok" id="btn">
</div>
</div>
<div class="results">
    <table class="table">
        <thead>
        <tr>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Result</td>
        </tr>
        </thead>
        <tbody>
        <%
            Rows rows = (Rows) request.getServletContext().getAttribute("rows");
            if (rows != null) {
                for (ResultRow row : rows.getRows()) {
        %>
        <tr>
            <td><div class="scroll"><%=row.getX()%></div>
            </td>
            <td><div class="scroll"><%=row.getY()%></div>
            </td>
            <td><%=row.getR()%>
            </td>
            <td><%=row.getResult()%>
            </td>
        </tr>
        <%
                }
            }
        %>
        </tbody>
    </table>
</div>
<script src="javascript/check.js"></script>
<script src="javascript/animation.js"></script>
</body>
</html>