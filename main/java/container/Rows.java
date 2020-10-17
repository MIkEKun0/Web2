package container;

import java.util.ArrayList;
import java.util.List;

public class Rows {
    private final List<ResultRow> rows;

    public Rows() {
       rows = new ArrayList<>();
    }
    public void addRow(ResultRow row){
        rows.add(row);
    }

    public List<ResultRow> getRows(){
        return rows;
    }
}