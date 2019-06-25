package xyz.timoney.swsad.controller;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.MoneyRecord;
import xyz.timoney.swsad.bean.Util;
import xyz.timoney.swsad.bean.user.User;
import xyz.timoney.swsad.bean.user.UserState;
import xyz.timoney.swsad.mapper.MoneyMapper;
import xyz.timoney.swsad.mapper.UserMapper;
import xyz.timoney.swsad.service.Email;
import xyz.timoney.swsad.singleton.SingletonMybatis;

import java.util.Date;
@RestController
@EnableAutoConfiguration
public class MoneyController {

    private static SqlSessionFactory sqlSessionFactory;
    static {
        sqlSessionFactory =  SingletonMybatis.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        try {
            //得到映射器
            MoneyMapper moneyMapper = sqlSession.getMapper(MoneyMapper.class);
            //初始化用户表
            moneyMapper.moneyTableInit();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * 充值或者提现
     */
    @RequestMapping(method = RequestMethod.POST, value = "/money")
    @CrossOrigin
    public Message<String> requestConfirm(@CookieValue("user") String userCookieKey, @RequestBody MoneyRecord moneyRecord) {
        System.out.println("\nPOST /money\n");
        Message<String> message = new Message<>();
        //检验权限
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        if(userId != moneyRecord.getUserId()){
            message.setSuccess(false);
            message.setMsg((moneyRecord.getMoney() > 0 ? "充值" : "提现") + "失败: 账号不一致");
            System.out.println(message);
            return message;
        }

        //获取一个连接,自动提交
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            MoneyMapper moneyMapper = sqlSession.getMapper(MoneyMapper.class);
            //获取用户对象
            User user = userMapper.getById(userId);
            //如果是提现，支付宝和微信账号必须要有一个
            if(moneyRecord.getMoney() < 0){
                if(user.getWeChatPay() == null && user.getAliPay() == null){
                    message.setSuccess(false);
                    message.setMsg("提现失败: 请至少设置一个收款账号(微信或者支付宝)");
                    System.out.println(message);
                    return message;
                }
                if(user.getAsset() + moneyRecord.getMoney() < 0){
                    message.setSuccess(false);
                    message.setMsg("提现失败: 余额不足");
                    System.out.println(message);
                    return message;
                }
            }
            moneyRecord.setDate(new Date(Util.getCurrentDateLong()));
            moneyRecord.setInfo((moneyRecord.getMoney() > 0 ?"充值: " : "提现: " )+ moneyRecord.getInfo());
            moneyRecord.setStatus(false);
            int newMoneyRecordId = moneyMapper.insertRecord(moneyRecord);
            /**
             * 单位是闲钱币!
             */
            //生成确认链接
            String confirmLink  = Util.getUUID();
            //不区分充值还是提现
            MoneyRecord.confirmLinkMap.put(confirmLink,moneyRecord);
            confirmLink = "http://118.25.215.11:8080/money/confirm/" + confirmLink;
            Email.sendMoneyConfirmMail(user,moneyRecord,confirmLink);
            message.setSuccess(true);
            message.setMsg(moneyRecord.getMoney() > 0 ? "充值成功:闲钱币将在管理员同意后到账": "提现成功:金额将在管理员同意后到账支付宝或微信" );
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg((moneyRecord.getMoney() > 0 ? "充值" : "提现") + "失败: 出现异常");
            System.out.println(message);
            return message;
        }
        System.out.println(message);
        return message;
    }

    /**
     * 确认链接
     */
    @RequestMapping(method = RequestMethod.GET, value = "/money/confirm/{confirm}")
    @CrossOrigin
    public Message<String> doConfirm(@PathVariable("confirm") String confirmKey) {
        System.out.println("\nPOST /money/confirm/"+ confirmKey +"\n");
        Message<String> message = new Message<>();
        if(MoneyRecord.confirmLinkMap.containsKey(confirmKey)){
            MoneyRecord  moneyRecord = MoneyRecord.confirmLinkMap.get(confirmKey);
            //获取一个连接,自动提交
            try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
                UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
                MoneyMapper moneyMapper = sqlSession.getMapper(MoneyMapper.class);
                //改变余额
                userMapper.changeAssetById(moneyRecord.getUserId(), moneyRecord.getMoney());
                //确认交易记录
                moneyMapper.setStatus(moneyRecord.getId(),true);
                //修改缓存
                //直接移除缓存，以后访问就会访问数据库了
                User.cacheList.removeIf(u -> u.getId() == moneyRecord.getUserId());
                //使链接无效
                MoneyRecord.confirmLinkMap.remove(confirmKey);
                message.setSuccess(true);
                message.setMsg("确认" + (moneyRecord.getMoney() > 0 ? "充值": "提现" )+ "成功");
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("确认失败: 出现异常");
            }
        }else {
            message.setSuccess(false);
            message.setMsg("确认失败: 该链接无效");
        }
        System.out.println(message);
        return message;
    }

}
