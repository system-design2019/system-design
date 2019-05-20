package xyz.timoney.swsad.bean;

public class Code {
    /**
     * 0 : phone
     * 1 ：email
     * */
    private int phone_or_email;
    /**
     * 手机号或邮箱
     * */
    private String target;
    /**
     * 0 : 注册
     * 1 : 忘记密码
     * */
    private int type;
    /**
     * 用户输入验证码，用于对比是否正确
     */
    private String code;

    public Code(){
        phone_or_email = 1;
        target = "i@janking.cn";
        type = 2;
        code = "表示发错了";
    }

    public int getPhone_or_email() {
        return phone_or_email;
    }

    public int getType() {
        return type;
    }

    public String getCode() {
        return code;
    }

    public String getTarget() {
        return target;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setPhone_or_email(int phone_or_email) {
        this.phone_or_email = phone_or_email;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public void setType(int type) {
        this.type = type;
    }
}
