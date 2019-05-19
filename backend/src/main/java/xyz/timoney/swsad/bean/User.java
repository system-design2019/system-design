package xyz.timoney.swsad.bean;

import org.apache.ibatis.session.SqlSession;
import xyz.timoney.swsad.mapper.NotificationMapper;
import xyz.timoney.swsad.mapper.QuestionnaireMapper;
import xyz.timoney.swsad.mapper.UserMapper;

import javax.swing.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class User {
    /**用户的缓存*/
    public static List<User> userList = new ArrayList<>();
    /**用户数量*/
    private static int count = 10000;
    /**登录资料*/
    //数据库自动生成
    private int id;
    private String password;
    //邮箱和手机号均唯一，且不为空，初始状态以"$"开头，表示未初始化
    private String email;
    private String phone;
    /**实名资料*/
    //用户名 唯一
    private String name;
    private String university;
    private String studentId;
    //初始化-1
    //本科1 2 3 4 5
    //硕士11 22 33
    //博士111 222 333
    private int grade;
    private String major;
    //初始化-1
    //女0，男1
    private int gender;
    //初始化-1
    //范围0~150
    private int age;
    /**个性资料*/
    private String nickname;
    //头像保存URL
    private String face;
    //微信号
    private String weChatPay;
    //支付宝账号
    private String aliPay;
    //qq号
    private String QQ;
    //初始 0
    //信用
    private double credit;

    /**问卷资料*/
    private List<questionnaire> publish;
    private List<questionnaire> attend;
    private List<questionnaire> favorite;

    static public void initCount(int c){
        count = c;
    }
    public User(){
        String uuid = Util.getUUID();
        password = "default_password";
        email = "$"+uuid;
        phone = "$"+uuid;
        name = "$"+uuid;
        university = null;
        studentId = null;
        grade = -1;
        major = null;
        gender = -1;
        age = -1;
        nickname = null;
        face = null;
        aliPay = null;
        weChatPay = null;
        QQ = null;
        credit = 0;
        publish = null;
        attend = null;
        favorite = null;

        count++;
    }
    public void setId(int id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {

        if(email == null || email.isEmpty())
            this.email = "$"+count;
        else
            this.email = email;
    }

    public void setPhone(String phone) {
        if(phone == null || phone.isEmpty())
            this.phone = "$"+count;
        else
            this.phone = phone;
    }


    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public void setAge(int age) {
        this.age = age;
    }


    public static void setCount(int count) {
        User.count = count;
    }

    public void setName(String name) {

        if(name == null || name.isEmpty())
            this.name = "$"+count;
        else
            this.name = name;
    }

    public void setAliPay(String aliPay) {
        this.aliPay = aliPay;
    }

    public void setCredit(double credit) {
        this.credit = credit;
    }

    public void setFace(String face) {
        this.face = face;
    }

    public void setQQ(String QQ) {
        this.QQ = QQ;
    }

    public void setWeChatPay(String weChatPay) {
        this.weChatPay = weChatPay;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    //同步方法
    public void setCollected(List<questionnaire> collected) {
        this.collected = collected;
    }

    public void setFilled(List<questionnaire> filled) {
        this.filled = filled;
    }

    public void setPublished(List<questionnaire> published) {
        this.published = published;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
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

    public synchronized String getStudentId() {
        return studentId;
    }

    public synchronized String getNickname() {
        return nickname;
    }

    public synchronized String getMajor() {
        return major;
    }

    public int getGrade() {
        return grade;
    }

    public int getGender() {
        return gender;
    }

    public int getAge() {
        return age;
    }

    public static int getCount() {
        return count;
    }

    public String getName() {
        return name;
    }

    public double getCredit() {
        return credit;
    }

    public String getAliPay() {
        return aliPay;
    }

    public String getFace() {
        return face;
    }

    public String getQQ() {
        return QQ;
    }

    public String getWeChatPay() {
        return weChatPay;
    }

    public String getUniversity() {
        return university;
    }
    //同步方法
    public List<questionnaire> getCollected() {
        return collected;
    }

    public List<questionnaire> getFilled() {
        return filled;
    }

    public List<questionnaire> getPublished() {
        return published;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    @Override
    public String toString() {
        String s = "Id: " + id;
        s += "\nPassword: " + password;
        s += "\nEmail: " + email;
        s += "\nPhone: " + phone;
        return s;
    }
}