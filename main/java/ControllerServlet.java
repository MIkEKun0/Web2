import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setHeader("Access-Control-Allow-Origin", "*");
        ServletContext servletContext = getServletContext();
        RequestDispatcher dispatcher;
        String x = req.getParameter("X");
        String y = req.getParameter("Y");
        String r = req.getParameter("R");
        if (req.getParameterMap().size() == 3 && !x.isEmpty()  && !y.isEmpty() && !r.isEmpty()) {
            dispatcher = servletContext.getRequestDispatcher("/AreaCheckServlet");
        } else {
            dispatcher = servletContext.getRequestDispatcher("/index.jsp");
        }
        dispatcher.forward(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setHeader("Access-Control-Allow-Origin", "*");
        ServletContext servletContext = getServletContext();
        RequestDispatcher dispatcher;
        dispatcher = servletContext.getRequestDispatcher("/index.jsp");
        dispatcher.forward(req, resp);
    }
}