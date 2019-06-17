package xyz.timoney.swsad.controller;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.user.User;
import xyz.timoney.swsad.mapper.MoneyMapper;
import xyz.timoney.swsad.mapper.UserMapper;
import xyz.timoney.swsad.singleton.SingletonMybatis;

import java.util.List;

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

}
