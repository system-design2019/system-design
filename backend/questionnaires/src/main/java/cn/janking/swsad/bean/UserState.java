package cn.janking.swsad.bean;

public class UserState {
    static private boolean state;
    static private String id;

    static public String getId() {
        return id;
    }
    static public boolean getState(){
        return state;
    }
    static public void setId(String id){
        UserState.id = id;
    }

}
