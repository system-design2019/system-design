package cn.janking.swsad.bean;

public class User {
    private int id;
    private String name;

    public User(){

    }
    public User(int id,String name){
        this.id = id;
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(int id) {
        this.id = id;
    }

}