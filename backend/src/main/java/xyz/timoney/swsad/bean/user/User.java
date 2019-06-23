package xyz.timoney.swsad.bean.user;

import xyz.timoney.swsad.bean.Util;
import xyz.timoney.swsad.bean.questionnaire.Questionnaire;

import java.util.ArrayList;
import java.util.List;

/**
 *
 */
public class User {
    /**
     * 用户的缓存
     * */
    public static List<User> cacheList = new ArrayList<>();

    /**
     * 判断是否初始化
    * */
    public static boolean isInit(String s){
        return s != null && !s.isEmpty() && s.charAt(0) != '$';
    }

    /**
     * 用户数量
     * */
    //目前还没有使用这个字段
    private static int count = 10000;
    /**
     * 登录资料
     * */
    //数据库自动生成auto increase
    private int id;
    private String password;
    //邮箱和手机号均唯一，且不为空，初始状态以"$"开头，表示未初始化
    private String email;
    private String phone;
    /**
     * 实名资料
     * */
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
    private String gender;
    //初始化-1
    //范围0~150
    private int age;
    /**
     * 个性资料
     * */
    private String nickname;
    //头像保存URL
    private String face;
    //微信号
    private String weChatPay;
    //支付宝账号
    private String aliPay;
    //qq号
    private String QQ;
    //初始 4，就是距离满分差一点，但是也差不多
    //信用
    private double credit;

    /**
     * 财产，闲钱币
     * 100 timoney = 1 yuan
     * 开始赠送100闲钱币
     */
    private int asset;

    /**
     * 问卷资料
     * 现在不在这里啦
     * */
/*    //发布的所有问卷
    private List<Questionnaire> published;
    //填写的所有问卷
    private List<Questionnaire> filled;
    //收藏的所有问卷
    private List<Questionnaire> collected;*/

    /**
     * 通知资料
     * 现在不在这里面啦
     * */
    //private List<Notification> notifications;

    static public void initCount(int c){
        count = c;
    }


    public User(){
        String uuid = Util.getUUID();
        password = "";
        email = "$"+uuid;
        phone = "$"+uuid;
        name = "$"+uuid;
        university = "";
        studentId = "";
        grade = -1;
        major = "";
        gender = "未初始化";
        age = -1;
        nickname = "";
        face = "http://118.25.215.11/static/images/upload/default.png";
        aliPay = "";
        weChatPay = "";
        QQ = "";
        //初始化为4
        credit = 4;
        //赠送100闲钱币
        asset = 100;
        count++;
    }
    public void setId(int id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {

        if(email == null || email.isEmpty()) {
            this.email = "$"+count;
        } else {
            this.email = email;
        }
    }

    public void setPhone(String phone) {
        if(phone == null || phone.isEmpty()) {
            this.phone = "$"+count;
        } else {
            this.phone = phone;
        }
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

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setAge(int age) {
        this.age = age;
    }


    public static void setCount(int count) {
        User.count = count;
    }

    public void setName(String name) {

        if(name == null || name.isEmpty()) {
            this.name = "$"+count;
        } else {
            this.name = name;
        }
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

    public String getGender() {
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

    public int getAsset() {
        return asset;
    }

    public void setAsset(int asset) {
        this.asset = asset;
    }

    @Override
    public String toString() {
        String s = "Id: " + id;
        s += "\nPassword: " + password;
        s += "\nEmail: " + email;
        s += "\nPhone: " + phone;
        s += "\nAsset: " + asset;
        return s;
    }
}