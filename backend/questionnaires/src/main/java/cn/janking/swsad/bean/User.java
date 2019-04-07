package cn.janking.swsad.bean;

import cn.janking.swsad.Mapper.UserMapper;

import java.util.Random;

public class User {

    /*用户数量*/
    private static int count = 10000;
    /*登录资料*/
    private int id;
    private String password;
    private String email;
    private String phone;
    /*实名资料*/
/*  private String name;
    private String studentId;
    private int grade;
    private String major;
    private int gender;
    private int age;
    *//*个性资料*//*
    private String nickname;
    private String face;
    private String weChatPay;
    private String aliPay;
    private String QQ;
    private int credit;*/
    static public void initCount(int c){
        count = c + 10000;
    }

    public User(){
        password = "default_password";
    }
    public void modifyUser(){
        if(email == null)
            email = "$"+count;
        if(phone == null)
            phone = "$"+count;
    }
    public void setId(int id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }
}