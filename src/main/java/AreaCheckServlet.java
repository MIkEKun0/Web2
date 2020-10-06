import container.ResultRow;
import container.Rows;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {
    public double parse(String val) {
        return Double.parseDouble(val.replace(",", "."));
    }

    private boolean is_valid(double x, double y, double r) {
        return y >= -5 && y <= 3 && r >= 1 && r <= 5 && x <= 5 && x >= -3;
    }

    private String check(double x, double y, double r) {
        if (is_valid(x, y, r)) {
            if (x >= 0 && x <= r && y >= 0 && y <= r / 2) {
                return "true";
            } else if (x > 0 && y < 0 && (x * x + y * y <= r*r)) {
                return "true";
            } else if (x < 0 && y < 0 && (-x / 2 - r / 2 <= y)) {
                return "true";
            }
        }
        return "false";
    }

    private String print_table(double x, double y, double r) {
        return "<!DOCTYPE html>\n" +
                "<html lang=''>\n" +
                " <link rel=\"stylesheet\" href=\"style/stylesheet.css\">\n"+
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>web lab2</title>\n" +
                "</head>\n" +
                "<body class = 'out'>\n" +
                "<table id = 'outputtable'>\n" +
                "<thead>\n" +
                "<tr>\n" +
                "<td>X</td><td>Y</td><td>R</td><td>Result</td>\n" +
                "</tr>\n" +
                "</thead>\n" +
                "<tbody>\n" +
                "<tr>\n" +
                "<td><div class ='scroll'>" + x + "</div></td><td><div class = 'scroll'>" + y + "</div></td><td>" + r + "</td><td>" + check(x, y, r) + "</td>" +
                "</tr>\n" +
                "</tbody>\n" +
                "<form>\n" +
                "<input type='submit' value='Form'\n>" +
                "</form>\n" +
                "</body>";
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        double x, y, r;
        try {
            x = parse(req.getParameter("X"));
            y = parse(req.getParameter("Y"));
            r = parse(req.getParameter("R"));
            PrintWriter writer = resp.getWriter();
            ResultRow row = new ResultRow();
            row.setX(x);
            row.setY(y);
            row.setR(r);
            row.setResult(check(x, y, r));
            ServletContext context = getServletContext();
            Rows rows = (Rows) context.getAttribute("rows");
            if (rows == null) {
                rows = new Rows();
            }
            rows.addRow(row);
            context.setAttribute("rows", rows);
            writer.print(print_table(x, y, r));
            writer.flush();
            writer.close();
        } catch (NullPointerException | NumberFormatException e) {
            PrintWriter writer = resp.getWriter();
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            writer.print(resp.getStatus());
            writer.close();
        }
    }
}