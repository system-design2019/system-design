package xyz.timoney.swsad.controller;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.errands.Errands;
import xyz.timoney.swsad.bean.errands.Errands_temp;
import xyz.timoney.swsad.bean.questionnaire.Infos;
import xyz.timoney.swsad.bean.questionnaire.Questionnaire;
import xyz.timoney.swsad.bean.questionnaire.Questionnaire_temp;
import xyz.timoney.swsad.bean.user.User;
import xyz.timoney.swsad.bean.user.UserState;
import xyz.timoney.swsad.mapper.ErrandsMapper;
import xyz.timoney.swsad.mapper.QuestionnaireMapper;
import xyz.timoney.swsad.mapper.UserMapper;
import xyz.timoney.swsad.singleton.SingletonMybatis;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class ErrandsController {
    private static SqlSessionFactory sqlSessionFactory;

    static {
        sqlSessionFactory = SingletonMybatis.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
    }


    /**
     * 发布一个跑腿
     */
    @RequestMapping(method = RequestMethod.POST, value = "/errands/publish")
    @CrossOrigin
    public Message<String> createQues(@CookieValue("user") String userCookieKey, @RequestBody Errands errand) {
        /*
        验证用户身份
        */
        Message<String> message = new Message<>();
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if (!message.isSuccess()) {
            return message;
        }

        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ErrandsMapper erraMapper = sqlSession.getMapper(ErrandsMapper.class);
            //设置errandsID 自动设置
            int count=erraMapper.CountErrands();
            //System.out.println(count);
            if(count == 0)
            {
                errand.setErrandsID(1);
            }else {
                int maxID=erraMapper.queryMaxID();
                if(count == maxID)
                {
                    errand.setErrandsID(count+1);
                }else
                {
                    errand.setErrandsID(maxID+1);
                }
            }

            //添加问卷主要信息
            erraMapper.insert(errand);


            message.setSuccess(true);
            message.setMsg("创建成功");
            sqlSession.commit();

        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("创建失败:" + e.getMessage());
            return message;
        }
        return message;
    }



    /**
     * 获取正在进行的跑腿
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/errands/proceed/all")
    @CrossOrigin
    public Message<List<Errands_temp>> getErrands(){
        Message<List<Errands_temp>> message = new Message<>();
        List<Errands> listErra;
        List<Errands_temp> listErra1=new ArrayList<>();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            ErrandsMapper erraMapper = sqlSession.getMapper(ErrandsMapper.class);
            //用户的映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //当前时间
            Timestamp current = new Timestamp(new Date().getTime());
            //System.out.println(current);
            //调用接口中的方法去执行xml文件中的SQL语句

            listErra=erraMapper.getAllErra(current);
            //发布者的名字问题
            for (Errands errand : listErra) {
                Errands_temp temp=new Errands_temp();
                temp.setErrandsID(errand.getErrandsID());
                temp.setStatus(errand.isStatus());
                temp.setTitle(errand.getTitle());
                temp.setTime(errand.getTime());
                temp.setPlace(errand.getPlace());
                temp.setEvent(errand.getEvent());
                temp.setReward(errand.getReward());
                temp.setDeposit(errand.getDeposit());
                temp.setTotal(errand.getTotal());
                temp.setAttend(errand.getAttend());
                //id转名字
                int theID = errand.getPublisher();
                User publish = new User();
                publish=userMapper.getById(theID);
                temp.setPublisher(publish.getName());
                //System.out.println(publish.getName());
                listErra1.add(temp);
            }

            message.setData(listErra1);
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:可能是该用户不存在" + e.getMessage());
        }
        //最后记得关闭连接

        return message;
    }

    /**
     * 根据ID关闭跑腿
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/closeErra/{errandsID}")
    @CrossOrigin
    public Message<String> closeErraByID(@PathVariable int errandsID){
        Message<String> message = new Message<>();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            ErrandsMapper erraMapper = sqlSession.getMapper(ErrandsMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            Timestamp timeNow=new Timestamp(new Date().getTime());

            erraMapper.closeErraByID(errandsID,timeNow);


            message.setData("success close");
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }


    /**
     * 根据ID删除跑腿
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/deleteErra/{errandsID}")
    @CrossOrigin
    public Message<String> deleteErraByID(@PathVariable int errandsID){
        Message<String> message = new Message<>();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            ErrandsMapper erraMapper = sqlSession.getMapper(ErrandsMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            erraMapper.deleteErraByID(errandsID);
            erraMapper.deletePanByID(errandsID);

            message.setData("success delete");
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }


    /**
     * 参与跑腿
     * */
    @RequestMapping(method = RequestMethod.POST,value = "/participate/{errandsID}/{userID}")
    @CrossOrigin
    public Message<String> participateIn(@PathVariable int errandsID,@PathVariable int userID){
        Message<String> message = new Message<>();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            ErrandsMapper erraMapper = sqlSession.getMapper(ErrandsMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            erraMapper.participate(errandsID,userID);
            erraMapper.addPart(errandsID);

            message.setData("success participate");
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }

    /**
     * 确认完成跑腿
     * */
    @RequestMapping(method = RequestMethod.POST,value = "/confirm/{errandsID}/{userID}")
    @CrossOrigin
    public Message<String> confirmErra(@PathVariable int errandsID,@PathVariable int userID){
        Message<String> message = new Message<>();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            ErrandsMapper erraMapper = sqlSession.getMapper(ErrandsMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            Errands erra;
            erra = erraMapper.getErraByID(errandsID);
            //必须是发布者才可以确认
            if(userID == erra.getPublisher())
            {
                erraMapper.setStatus(errandsID);
                Timestamp timeNow=new Timestamp(new Date().getTime());
                erraMapper.closeErraByID(errandsID,timeNow);
                message.setData("success confirmation");
            }else {
                message.setData("you are not publisher!");
            }

            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }

}