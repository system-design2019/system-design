package xyz.timoney.swsad.controller;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.errands.Errands;
import xyz.timoney.swsad.bean.user.UserState;
import xyz.timoney.swsad.mapper.ErrandsMapper;
import xyz.timoney.swsad.singleton.SingletonMybatis;

import java.util.ArrayList;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class ErrandsController {
    private static SqlSessionFactory sqlSessionFactory;
    static {
        sqlSessionFactory =  SingletonMybatis.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
    }



    /**
     * 发布一个跑腿
     * */
    @RequestMapping(method = RequestMethod.POST,value = "/errands/publish")
    @CrossOrigin
    public Message<String> createQues(@CookieValue("user") String userCookieKey, @RequestBody Errands errand)
    {
        /*
        验证用户身份
        */

        Message<String> message = new Message<>();
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }


        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ErrandsMapper erraMapper = sqlSession.getMapper(ErrandsMapper.class);

            //设置quesID 自动设置
            int count=erraMapper.CountQuestion();
            //System.out.println(count);
            if(count == 0)
            {
                ques.setQuesID(1);
            }else {
                int maxID=quesMapper.queryMaxID();
                if(count == maxID)
                {
                    ques.setQuesID(count+1);
                }else
                {
                    ques.setQuesID(maxID+1);
                }
            }


            //添加问卷主要信息
            quesMapper.insert(ques);


            message.setSuccess(true);
            message.setMsg("创建成功");
            sqlSession.commit();

        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("创建失败:" + e.getMessage());
            return message;
        }
}
