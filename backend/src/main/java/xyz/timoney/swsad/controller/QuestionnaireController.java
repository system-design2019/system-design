package xyz.timoney.swsad.controller;

import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.MoneyRecord;
import xyz.timoney.swsad.bean.Util;
import xyz.timoney.swsad.bean.quesUser.QuesCollectUser;
import xyz.timoney.swsad.bean.quesUser.QuesFillUser;
import xyz.timoney.swsad.bean.questionnaire.*;
import xyz.timoney.swsad.bean.user.Notification;
import xyz.timoney.swsad.bean.user.User;
import xyz.timoney.swsad.bean.user.UserState;
import xyz.timoney.swsad.mapper.*;
import xyz.timoney.swsad.singleton.SingletonMybatis;

import javax.jws.soap.SOAPBinding;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;


@RestController
@EnableAutoConfiguration
public class QuestionnaireController {

    private static SqlSessionFactory sqlSessionFactory;
    static {
        sqlSessionFactory =  SingletonMybatis.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        try {
            //得到映射器
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            questionnaireMapper.questionnaireTableInit();
             //初始化用户填写问卷表格
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            quesFillUserMapper.quesFillUserTableInit();

             //初始化用户收藏问卷表格
            QuesCollectUserMapper quesCollectUserMapper= sqlSession.getMapper(QuesCollectUserMapper.class);
            quesCollectUserMapper.quesCollectUserTableInit();
            //调用接口中的方法去执行xml文件中的SQL语句
            //初始化问卷表
            //questionnaireMapper.questionnaireTableInit();
            /*用户数量*/
            /*问卷数量*/
            int count = questionnaireMapper.getCount();
            //Questionnaire.initCount(count);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * 根据ID关闭问卷
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/closeQues/{quesID}")
    @CrossOrigin
    public Message<String> closeQueseByID(@CookieValue("user") String userCookieKey, @PathVariable int quesID){
        Message<String> message = new Message<>();
        /**
         * 要有权限判断啊！！！
         */
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        Questionnaire theQues;
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            MoneyMapper moneyMapper = sqlSession.getMapper(MoneyMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            Timestamp timeNow=new Timestamp(new Date().getTime());
            Questionnaire questionnaire = quesMapper.getQuesByID(quesID);
            if(questionnaire == null){
                message.setData("问卷不存在");
                return message;
            }
            if(questionnaire.getPublisher() != userId){
                message.setData("您没有权限关闭此问卷");
                return message;
            }
            quesMapper.closeQuesByID(quesID,timeNow);
            /**
             * 修改余额
             */
            int reFundAsset = questionnaire.getReward() * (questionnaire.getInfos().getTotal() - questionnaire.getInfos().getAttend());
            userMapper.changeAssetById(userId, reFundAsset);
            /**
             * 修改缓存
             */
            //直接移除缓存，以后访问就会访问数据库了
            User.cacheList.removeIf(u -> u.getId() == userId);
            /**
             * 添加记录,单位：闲钱币
             */
            MoneyRecord moneyRecord = new MoneyRecord(userId, reFundAsset,new Date(Util.getCurrentDateLong()),
                    "关闭《"+ questionnaire.getTitle() +"》问卷退回押金",true);
            moneyMapper.insertRecord(moneyRecord);
            message.setSuccess(true);
            message.setMsg("关闭成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("关闭失败:" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }

    /**
     * 根据ID删除问卷
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/deleteQues/{quesID}")
    @CrossOrigin
    public Message<String> deleteQueseByID(@CookieValue("user") String userCookieKey,@PathVariable int quesID){
        Message<String> message = new Message<>();
        /**
         * 要有权限判断啊！！！
         */
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        Questionnaire theQues;
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            QuesCollectUserMapper quesCollectUserMapper  = sqlSession.getMapper(QuesCollectUserMapper.class);
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            MoneyMapper moneyMapper = sqlSession.getMapper(MoneyMapper.class);
            Questionnaire questionnaire = quesMapper.getQuesByID(userId);
            if(questionnaire == null){
                message.setData("问卷不存在");
                return message;
            }
            if(questionnaire.getPublisher() != userId){
                message.setData("您没有权限删除此问卷");
                return message;
            }
            //调用接口中的方法去执行xml文件中的SQL语句
            quesMapper.deleteQuesByID(quesID);
            quesMapper.deleteTianByID(quesID);
            quesMapper.deleteXuanByID(quesID);
            quesMapper.deleteAnsByID(quesID);
            /**
             * 同时要删除缓存吖！！
             */
            List<Integer> allCollectorId = quesCollectUserMapper.getAllCollectorId(quesID);
            //删除用户收藏的缓存列表
            //获取该问卷所有的收藏者
            for(int i : allCollectorId){
                //删除每个收藏者缓存的问卷id，去掉将要删除的问卷
                if(QuesCollectUser.cacheListId.containsKey(i)){
                    QuesCollectUser.cacheListId.get(i).removeIf(item ->item == quesID);
                }
                //删除每个收藏者缓存的问卷，去掉将要删除的问卷
                if(QuesCollectUser.cacheList.containsKey(i)){
                    QuesCollectUser.cacheList.get(i).removeIf(questionnaireItem -> questionnaireItem.getQuesID() == quesID);
                }
            }
            //删除用用户填写的缓存列表
            List<Integer> allFillterId = quesFillUserMapper.getAllFillerId(quesID);
            for(int i : allFillterId){
                //删除每个填写者缓存的问卷id，去掉将要删除的问卷
                if(QuesFillUser.cacheListId.containsKey(i)){
                    QuesFillUser.cacheListId.get(i).removeIf(item ->item == quesID);
                }
                //删除每个收藏者缓存的问卷，去掉将要删除的问卷
                if(QuesFillUser.cacheList.containsKey(i)){
                    QuesFillUser.cacheList.get(i).removeIf(questionnaireItem -> questionnaireItem.getQuesID() == quesID);
                }
            }
            /**
             * 修改余额
             */
            int reFundAsset = questionnaire.getReward() * (questionnaire.getInfos().getTotal() - questionnaire.getInfos().getAttend());
            userMapper.changeAssetById(userId, reFundAsset);
            /**
             * 修改缓存
             */
            //直接移除缓存，以后访问就会访问数据库了
            User.cacheList.removeIf(u -> u.getId() == userId);
            /**
             * 添加记录,单位：闲钱币
             */
            MoneyRecord moneyRecord = new MoneyRecord(userId, reFundAsset,new Date(Util.getCurrentDateLong()),
                    "删除《"+ questionnaire.getTitle() +"》问卷退回押金",true);
            moneyMapper.insertRecord(moneyRecord);

            message.setSuccess(true);
            message.setMsg("删除成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("删除失败:" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }

    /**
     * 获取问卷详情
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/questionnaires/{quesID}")
    @CrossOrigin
    public Message<Questionnaire_temp> getQueseByID(@PathVariable int quesID){
        Message<Questionnaire_temp> message = new Message<>();
        Questionnaire theQues;
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //用户的映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            theQues = quesMapper.getQuesByID(quesID);
            Infos temp=quesMapper.getInfo(theQues.getQuesID());
            theQues.setInfos(temp);

            Questionnaire_temp theQues1=new Questionnaire_temp();
            theQues1.setQuesID(theQues.getQuesID());
            theQues1.setTitle(theQues.getTitle());
            theQues1.setDetail(theQues.getDetail());
            theQues1.setPublisher(theQues.getPublisher());
            theQues1.setReward(theQues.getReward());
            theQues1.setCommand(theQues.getCommand());
            theQues1.setStatus(theQues.getStatus());
            theQues1.setNumber(theQues.getNumber());
            theQues1.setInfos(temp);

            //id转名字
            int theID=theQues.getPublisher();
            User publish = new User();
            publish=userMapper.getById(theID);
            theQues1.setPublisherName(publish.getName());

            message.setData(theQues1);
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
     * 查看问卷答案
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/Answer/{quesID}/{userID}")
    @CrossOrigin
    public Message<QuesResult> queryAnswer(@PathVariable int quesID,@PathVariable int userID){
        Message<QuesResult> message = new Message<>();
        QuesResult quesResult=new QuesResult();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            QuesResult_temp temp=quesMapper.queryAns(quesID,userID);
            quesResult.setQuesID(quesID);
            quesResult.setUserID(userID);

            String tian=new String();
            List<String> tians = new ArrayList<>();
            String xuan=new String();
            List<String> xuans = new ArrayList<>();
            tian=temp.getTiankong();
            xuan=temp.getXuanze();
            String [] tians1 = tian.split("\\$");
            String [] xuans1 = xuan.split("\\$");
            for(int i=0;i<tians1.length;i++)
            {
                tians.add(tians1[i]);
            }
            for(int i=0;i<xuans1.length;i++)
            {
                if(xuans1[i] != null)
                {
                    xuans.add(xuans1[i]);
                }
            }
            quesResult.setTiankong(tians);
            quesResult.setXuanze(xuans);
            //必须要注意转义

            quesResult.setCreateTime(temp.getCreateTime());


            message.setData(quesResult);
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
     * 获取问卷内容，即题目等
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/questionnaires/content/{quesID}")
    @CrossOrigin
    public Message<QuesContent> getQueseCont(@PathVariable int quesID){
        Message<QuesContent> message = new Message<>();
        QuesContent quesCont= new QuesContent();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            //获取title
            String title = quesMapper.getTitleByID(quesID);
            //获取选择题
            List<Ques2_temp> ques2s_temp=new ArrayList<>();
            ques2s_temp=quesMapper.getQues2s(quesID);


            List<Ques2> ques2s= new ArrayList<>();
            for(int i=0;i<ques2s_temp.size();i++)
            {
                Ques2 te = new Ques2();
                te.setXuanID(ques2s_temp.get(i).getXuanID());
                te.setQuesID(ques2s_temp.get(i).getQuesID());
                te.setMode(ques2s_temp.get(i).getMode());
                te.setTitle(ques2s_temp.get(i).getTitle());
                te.setChoose(ques2s_temp.get(i).getChoose());
                te.setFill(ques2s_temp.get(i).isFill());
                te.setTheorder(ques2s_temp.get(i).getTheorder());

                String cho=new String();
                List<String> choices = new ArrayList<>();
                cho=ques2s_temp.get(i).getChoices();
                //必须要注意转义
                String [] choic=cho.split("\\$");
                for(int j=0;j<choic.length;j++)
                {
                    choices.add(choic[j]);
                }
                /*不一定只有四个选择
                choices.add(choic[0]);
                choices.add(choic[1]);
                choices.add(choic[2]);
                choices.add(choic[3]);*/
                te.setChoices(choices);

                ques2s.add(te);
            }


            //获取填空题
            List<Ques1> ques1s = quesMapper.getQues1s(quesID);
            //计算number
            int num = ques1s.size()+ques2s.size();

            quesCont.setQuesID(quesID);
            quesCont.setNumber(num);
            quesCont.setTitle(title);
            quesCont.setQues1(ques1s);
            quesCont.setQues2(ques2s);

            message.setData(quesCont);
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

        return message;
    }

    /**
     * 根据问卷ID获取参与者名字
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/getUsers/{quesID}")
    @CrossOrigin
    public Message<List<User_temp>> getUsersByID(@PathVariable int quesID){
        Message<List<User_temp>> message = new Message<>();
        List<User_temp> users_temp=new ArrayList<>();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

            //调用接口中的方法去执行xml文件中的SQL语句
            List<Integer> users=quesMapper.getUsersByID(quesID);
            for(int i=0;i<users.size();i++)
            {
                User publish = new User();
                publish=userMapper.getById(users.get(i));
                User_temp temp = new User_temp();
                temp.setUserID(users.get(i));
                temp.setUserName(publish.getName());
                //更新时间
                Timestamp createTime = new Timestamp(new Date().getTime());
                createTime=quesMapper.getCreateTime(quesID,users.get(i));
                temp.setCreateTime(createTime);
                users_temp.add(temp);
            }

            message.setData(users_temp);
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:可能是用户列表没有某个用户" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }

    /**
     * 获取正在进行的问卷
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/questionnaires/proceed/all")
    @CrossOrigin
    public Message<List<Questionnaire_temp>> getQueses(){
        Message<List<Questionnaire_temp>> message = new Message<>();
        List<Questionnaire> listQues;
        List<Questionnaire_temp> listQues1=new ArrayList<>();
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //用户的映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //当前时间
            Timestamp current = new Timestamp(new Date().getTime());
            //System.out.println(current);
            //调用接口中的方法去执行xml文件中的SQL语句

            listQues = quesMapper.getAllQues(current);
            for (Questionnaire listQue : listQues) {
                Infos temp = quesMapper.getInfo(listQue.getQuesID());
                listQue.setInfos(temp);
            }

            //发布者的名字问题
            for (Questionnaire listQue : listQues) {
                Questionnaire_temp temp1=new Questionnaire_temp();
                temp1.setQuesID(listQue.getQuesID());
                //System.out.println(listQue.getQuesID());
                temp1.setTitle(listQue.getTitle());
                temp1.setDetail(listQue.getDetail());
                //System.out.println(listQue.getDetail());
                temp1.setReward(listQue.getReward());
                temp1.setCommand(listQue.getCommand());
                temp1.setStatus(listQue.getStatus());
                temp1.setNumber(listQue.getNumber());
                temp1.setInfos(listQue.getInfos());
                temp1.setPublisher(listQue.getPublisher());
                //id转名字
                int theID=listQue.getPublisher();
                User publish = new User();
                publish=userMapper.getById(theID);
                temp1.setPublisherName(publish.getName());
                //System.out.println(publish.getName());
                listQues1.add(temp1);
            }

            message.setData(listQues1);
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
     * 发布一个问卷
     * */
    @RequestMapping(method = RequestMethod.POST,value = "/questionnaires/publish")
    @CrossOrigin
    public Message<String> createQues(@CookieValue("user") String userCookieKey, @RequestBody Questionnaire ques)
    {
        /**
        验证用户身份
        */

        Message<String> message = new Message<>();
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        /*检查权限*/
        if(userId != ques.getPublisher()){
            message.setData("发布问卷失败:没有权限");
            return message;
        }
        System.out.println(ques);

        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            MoneyMapper moneyMapper = sqlSession.getMapper(MoneyMapper.class);
            /*检查余额: 单位都是【闲钱币】*/
            int userAsset = userMapper.getAssetById(userId);
            int needAsset = ques.getReward() * ques.getInfos().getTotal();
            if(userAsset < needAsset){
                message.setData("发布问卷失败:没有足够的闲钱币");
                return message;
            }
            //设置quesID 自动设置
            int count=quesMapper.CountQuestion();
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

            //添加填空

            List<Ques1> tians=new ArrayList<>();
            tians=ques.getTians();
            for(int i=0;i<tians.size();i++) {
                tians.get(i).setQuesID(ques.getQuesID());

            }
            for(int i=0;i<tians.size();i++) {

                quesMapper.insertTian(tians.get(i));
            }

            //添加选择

            List<Ques2> xuans=new ArrayList<>();
            xuans=ques.getXuans();


            for(int i=0;i<xuans.size();i++) {
                Ques2_temp ques2_temp=new Ques2_temp();
                ques2_temp.setXuanID(xuans.get(i).getXuanID());
                ques2_temp.setQuesID(ques.getQuesID());
                ques2_temp.setTheorder((xuans.get(i).getTheorder()));
                ques2_temp.setMode(xuans.get(i).getMode());
                ques2_temp.setTitle(xuans.get(i).getTitle());
                ques2_temp.setChoose(xuans.get(i).getChoose());
                ques2_temp.setFill(xuans.get(i).isFill());
                List<String> te = xuans.get(i).getChoices();
                String re = String.join("$",te);
                ques2_temp.setChoices(re);
                quesMapper.insertXuan(ques2_temp);
            }

            /**
             * 减去余额
             */
            userMapper.changeAssetById(userId, -needAsset);
            /**
             * 修改缓存
             */
            //直接移除缓存，以后访问就会访问数据库了
            User.cacheList.removeIf(u -> u.getId() == userId);
            /**
             * 添加记录
             */
            MoneyRecord moneyRecord = new MoneyRecord(userId, -needAsset, new Date(Util.getCurrentDateLong()),
                    "创建《" + ques.getTitle() + "》问卷", true);
            moneyMapper.insertRecord(moneyRecord);

            message.setSuccess(true);
            message.setMsg("发布成功");
            sqlSession.commit();

        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("发布失败:" + e.getMessage());
            return message;
        }

        /**
        更新问卷id缓存
        */
        if(Questionnaire.cacheListId.containsKey(userId)){
            Questionnaire.cacheListId.get(userId).add(ques.getQuesID());
        }else {
            List<Integer> list = new ArrayList<>();
            list.add(ques.getQuesID());
            Questionnaire.cacheListId.put(userId, list);
        }
        /**
        更新问卷缓存
        */
        if(Questionnaire.cacheList.containsKey(userId)){
            Questionnaire.cacheList.get(userId).add(ques);
        }else {
            List<Questionnaire> list = new ArrayList<>();
            list.add(ques);
            Questionnaire.cacheList.put(userId, list);
        }
        System.out.println("----------------这是更新缓存后的发布问卷id列表-----------------");
        System.out.println(new Gson().toJson(Questionnaire.cacheListId.get(userId)));
        System.out.println("----------------这是更新缓存后的发布问卷列表-----------------");
        System.out.println(new Gson().toJson(Questionnaire.cacheList.get(userId)));
        return message;
    }

    /**
     * @param userCookieKey 用户cookie
     * @return 用户发布所有问卷的ID集合
     */
    @RequestMapping(method = RequestMethod.GET,value = "/questionnaires/publish/all")
    @CrossOrigin
    public Message<List<Integer>> questionnairePublishList(@CookieValue("user") String userCookieKey)
    {
        /*
        验证用户身份
        */
        System.out.println("\nGET /questionnaires/publish/all"  + "\n");
        Message<List<Integer>> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        /*
        查看缓存
        */
        if(Questionnaire.cacheListId.containsKey(userId)){
            message.setSuccess(true);
            message.setMsg("获取发布问卷id成功: 来自缓存");
            message.setData(Questionnaire.cacheListId.get(userId));
            System.out.println(message);
        }
        //查找数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            QuestionnaireMapper questionnaireMapper =  sqlSession.getMapper(QuestionnaireMapper.class);
            //获取发布的问卷ID
            List<Integer> list = questionnaireMapper.getAllPublishedId(userId);
            message.setData(list);
            /**
             * 增加缓存
             * */
            Questionnaire.cacheListId.put(userId,list);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取发布问卷id失败: 出现异常");
            System.out.println(message);
            return message;
        }
        message.setSuccess(true);
        message.setMsg("获取发布问卷id成功: 来自数据库");
        System.out.println(message);
        return message;
    }

    /**
     *
     *  收藏某个问卷
     * @param userCookieKey 用户cookie
     * @param quesId 问卷id
     * @return*/
    @RequestMapping(method = RequestMethod.PUT,value = "/questionnaires/{id}/collect")
    @CrossOrigin
    public Message<String> questionnaireCollect(@CookieValue("user") String userCookieKey, @PathVariable("id") int quesId)
    {
        /*
        验证用户身份
        */
        System.out.println("\nPUT /questionnaires/" + quesId + "/collect" + "\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        Questionnaire questionnaire;
        //修改数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            QuesCollectUserMapper quesCollectUserMapper= sqlSession.getMapper(QuesCollectUserMapper.class);
            List<Integer> collecterList = quesCollectUserMapper.getAllCollectedId(userId);
            //判断是否重复收藏
            if(collecterList.contains(userId)){
                message.setSuccess(false);
                message.setMsg("收藏问卷失败: 已经收藏了此问卷");
                System.out.println(message);
                return message;
            }
            //添加记录
            quesCollectUserMapper.insert(new QuesCollectUser(quesId, userId));
            //获得问卷对象
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            questionnaire = questionnaireMapper.getQuesByID(quesId);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("收藏问卷失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //同步发送到缓存中的用户收藏id列表
        if(QuesCollectUser.cacheListId.containsKey(userId)){
            QuesCollectUser.cacheListId.get(userId).add(quesId);
        }else{
            List<Integer> list = new ArrayList<>();
            list.add(quesId);
            QuesCollectUser.cacheListId.put(userId, list);
        }
        //同步发送到缓存中的用户收藏列表
        if(QuesCollectUser.cacheList.containsKey(userId)){
            QuesCollectUser.cacheList.get(userId).add(questionnaire);
        }else{
            List<Questionnaire> list = new ArrayList<>();
            list.add(questionnaire);
            QuesCollectUser.cacheList.put(userId, list);
        }
        message.setSuccess(true);
        message.setMsg("收藏问卷成功");
        System.out.println(message);
        return message;
    }


    /**
     *
     *  取消收藏某个问卷
     * @param userCookieKey 用户cookie
     * @param quesId 问卷id
     * @return*/
    @RequestMapping(method = RequestMethod.DELETE,value = "/questionnaires/{id}/collect")
    @CrossOrigin
    public Message<String> questionnaireCollectCancel(@CookieValue("user") String userCookieKey, @PathVariable("id") int quesId)
    {
        /*
        验证用户身份
        */
        System.out.println("\nDELETE /questionnaires/" + quesId + "/collect" + "\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        Questionnaire questionnaire;
        //修改数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            QuesCollectUserMapper quesCollectUserMapper= sqlSession.getMapper(QuesCollectUserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            List<Integer> collecterList = quesCollectUserMapper.getAllCollectorId(quesId);
            //判断是否没有收藏过
            if(!collecterList.contains(userId)){
                message.setSuccess(false);
                message.setMsg("取消收藏问卷失败: 没有收藏过此问卷");
                System.out.println(message);
                return message;
            }
            questionnaire = questionnaireMapper.getQuesByID(quesId);
            //删除记录
            quesCollectUserMapper.delete(new QuesCollectUser(quesId, userId));
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("取消收藏问卷失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //同步发送到缓存中的用户收藏id列表
        if(QuesCollectUser.cacheListId.containsKey(userId)){
            //不知道会不会remove错
            QuesCollectUser.cacheListId.get(userId).remove((Integer)quesId);
        }
        //同步发送到缓存中的用户收藏列表
        if(QuesCollectUser.cacheList.containsKey(userId)){
            QuesCollectUser.cacheList.get(userId).remove(questionnaire);
        }
        message.setSuccess(true);
        message.setMsg("取消收藏问卷成功");
        System.out.println(message);
        return message;
    }

    /**
     * @param userCookieKey 用户cookie
     * @return 用户收藏所有问卷的ID集合
     */
    @RequestMapping(method = RequestMethod.GET,value = "/questionnaires/collect/all")
    @CrossOrigin
    public Message<List<Integer>> questionnaireCollectList(@CookieValue("user") String userCookieKey)
    {
        /*
        验证用户身份
        */
        System.out.println("\nGET /questionnaires/collect/all"  + "\n");
        Message<List<Integer>> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        /*
         查找缓存
         */
        if(QuesCollectUser.cacheListId.containsKey(userId)){
            message.setSuccess(true);
            message.setMsg("获取收藏问卷id成功: 来自缓存");
            message.setData(QuesCollectUser.cacheListId.get(userId));
            System.out.println(message);
        }
        //查找数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            QuesCollectUserMapper quesCollectUserMapper= sqlSession.getMapper(QuesCollectUserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //获取收藏者列表
            List<Integer> list = quesCollectUserMapper.getAllCollectedId(userId);
            //删除问卷数据库中不存在的
            list.removeIf(item -> questionnaireMapper.getQuesByID(item) == null);
            message.setData(list);
            /**
             * 增加缓存
             * */
            QuesCollectUser.cacheListId.put(userId, list);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取收藏问卷id失败: 出现异常");
            System.out.println(message);
            return message;
        }

        message.setSuccess(true);
        message.setMsg("获取收藏问卷id成功: 来自数据库");
        System.out.println(message);
        return message;
    }

    /**
     * 填写某个问卷
     * */
    @RequestMapping(method = RequestMethod.PUT,value = "/questionnaires/{id}/fill")
    @CrossOrigin
    public Message<String> questionnaireFill(@CookieValue("user") String userCookieKey, @PathVariable("id") int quesId)
    {
        /*
        验证用户身份
        */
        System.out.println("\nPUT /questionnaires/"+ quesId + "/fill" + "\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        Questionnaire questionnaire;
        int fillerCount;
        //修改数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //获得问卷填写者列表
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            List<Integer> fillerList = quesFillUserMapper.getAllFillerId(quesId);
            //判断是否重复填写
            if(fillerList.contains(userId)){
                message.setSuccess(false);
                message.setMsg("填写问卷失败: 已经填写了此问卷");
                System.out.println(message);
                return message;
            }
            fillerCount = fillerList.size();
            //获取问卷详情
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            questionnaire = questionnaireMapper.getQuesByID(quesId);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("填写问卷失败: 获取问卷出现异常");
            System.out.println(message);
            return message;
        }
        /**
         * 人数是否已满
         * */
        if(questionnaire.getInfos().getTotal() > fillerCount ){
            //修改数据库
            try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
                //新加一条参与的记录
                QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
                quesFillUserMapper.insert(new QuesFillUser(quesId, userId));
                //获得问卷mapper
                QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
                /**
                 * 测试
                 * */
                //attend加一
                int affect = questionnaireMapper.addOneFill();
                System.out.println("Affect : " + affect);
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("填写问卷失败: 填写问卷出现异常");
                System.out.println(message);
                return message;
            }

            //同步发送到缓存中的用户填写id列表
            if(QuesFillUser.cacheListId.containsKey(userId)){
                QuesFillUser.cacheListId.get(userId).add(quesId);
            }else{
                List<Integer> list = new ArrayList<>();
                list.add(quesId);
                QuesFillUser.cacheListId.put(userId, list);
            }
            //同步发送到缓存中的用户填写列表
            if(QuesFillUser.cacheList.containsKey(userId)){
                QuesFillUser.cacheList.get(userId).add(questionnaire);
            }else{
                List<Questionnaire> list = new ArrayList<>();
                list.add(questionnaire);
                QuesFillUser.cacheList.put(userId, list);
            }
            message.setSuccess(true);
            message.setMsg("开始填写问卷");
            System.out.println(message);
            return message;
        }
        /**
         * 人数已满
         * */
        message.setSuccess(false);
        message.setMsg("填写问卷失败: 人数已满");
        System.out.println(message);
        return message;
    }

    /**
     * 放弃填写某个问卷
     * */
    @RequestMapping(method = RequestMethod.DELETE,value = "/questionnaires/{id}/fill")
    @CrossOrigin
    public Message<String> questionnaireFillCancel(@CookieValue("user") String userCookieKey, @PathVariable("id") int quesId)
    {
        /*
        验证用户身份
        */
        System.out.println("\nDELETE /questionnaires/"+ quesId + "/fill" + "\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        Questionnaire questionnaire;
        //修改数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //获得问卷填写者列表
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            List<Integer> fillerList = quesFillUserMapper.getAllFillerId(quesId);
            //判断是否没有填写过
            if(!fillerList.contains(userId)){
                message.setSuccess(false);
                message.setMsg("取消填写问卷失败: 没有填写过此问卷");
                System.out.println(message);
                return message;
            }
            //删除记录
            quesFillUserMapper.delete(new QuesFillUser(quesId, userId));
            //attend减1
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            questionnaire = questionnaireMapper.getQuesByID(quesId);
            int affect = questionnaireMapper.cancelOneFill();
            /**
             * 测试
             * */
            System.out.println("Affect : " + affect);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("取消填写问卷失败: 获取问卷出现异常");
            System.out.println(message);
            return message;
        }
        //同步发送到缓存中的用户收藏id列表
        if(QuesFillUser.cacheListId.containsKey(userId)){
            //不知道会不会remove错
            QuesFillUser.cacheListId.get(userId).remove((Integer)quesId);
        }
        //同步发送到缓存中的用户收藏列表
        if(QuesFillUser.cacheList.containsKey(userId)){
            QuesFillUser.cacheList.get(userId).remove(questionnaire);
        }
        message.setSuccess(true);
        message.setMsg("已取消填写问卷");
        System.out.println(message);
        return message;
    }

    /**
     * 用户填写的所有问卷id
     * @param userCookieKey 用户cookie
     * @return 用户填写所有问卷的ID集合
     */
    @RequestMapping(method = RequestMethod.GET,value = "/questionnaires/fill/all")
    @CrossOrigin
    public Message<List<Integer>> questionnaireFillList(@CookieValue("user") String userCookieKey)
    {
        /*
        验证用户身份
        */
        System.out.println("\nGET /questionnaires/fill/all"  + "\n");
        Message<List<Integer>> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        if(QuesFillUser.cacheListId.containsKey(userId)){
            message.setSuccess(true);
            message.setMsg("获取填写问卷id成功: 来自缓存");
            message.setData(QuesFillUser.cacheListId.get(userId));
            System.out.println(message);
        }
        //修改数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            List<Integer> list = quesFillUserMapper.getAllFilledId(userId);
            //删除问卷数据库中不存在的
            list.removeIf(item -> questionnaireMapper.getQuesByID(item) == null);
            message.setData(list);
            /**
             * 增加缓存
             */
            QuesFillUser.cacheListId.put(userId, list);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取填写问卷id失败: 出现异常");
            System.out.println(message);
            return message;
        }

        message.setSuccess(true);
        message.setMsg("获取填写问卷id成功: 来自数据库");
        System.out.println(message);
        return message;
    }

    /**
     * 填写问卷
     * 回答问卷问题
     * */
    @RequestMapping(method = RequestMethod.POST,value = "/questionnaires/commit")
    @CrossOrigin
    public Message<String> addXuan(@CookieValue("user") String userCookieKey, @RequestBody QuesResult quesResult)
    {
        Message<String> message = new Message<>();
        /**
        * 验证用户身份
        */
        System.out.println("\nGET /questionnaires/commit"  + "\n");
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        QuesResult_temp quesResult_temp = new QuesResult_temp();
        System.out.println(quesResult);
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            MoneyMapper moneyMapper = sqlSession.getMapper(MoneyMapper.class);
            UserMapper userMapper  = sqlSession.getMapper(UserMapper.class);
            NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
            /*只有正在进行的问卷才能被填写*/
            int quesID  = quesResult.getQuesID();
            Questionnaire questionnaire = quesMapper.getQuesByID(quesID);
            if(questionnaire == null){
                message.setSuccess(false);
                message.setMsg("问卷不存在");
                return message;
            }
            Infos temp=quesMapper.getInfo(quesID);
            //问卷结束时间
            //Timestamp timeEnd = new Timestamp(temp.getEndTime().getTime());
            Timestamp timeNow=new Timestamp(new Date().getTime());

            //System.out.println(timeNow.before(temp.getEndTime()));

            if(timeNow.before(temp.getEndTime()))
            {
                quesResult_temp.setQuesID(quesResult.getQuesID());
                quesResult_temp.setUserID(quesResult.getUserID());
                List<String> te = quesResult.getTiankong();
                String re = String.join("$",te);
                List<String> te1 = quesResult.getXuanze();
                List<String> te2 = new ArrayList<>();
                for(int i=0;i<te1.size();i++)
                {
                    te2.add(te1.get(i).toString());
                }
                String re1 = String.join("$",te2);
                quesResult_temp.setTiankong(re);
                quesResult_temp.setXuanze(re1);
                quesResult_temp.setCreateTime(quesResult.getCreateTime());
                quesMapper.commitResults(quesResult_temp);

                //参与者加一
                quesMapper.addPart(quesResult.getQuesID());
                message.setMsg("创建成功");
                /**
                 * 修改余额
                 */
                int newAsset = quesMapper.getQuesByID(quesID).getReward();
                userMapper.changeAssetById(userId, newAsset);
                /**
                 * 添加记录,单位：闲钱币
                 */
                MoneyRecord moneyRecord = new MoneyRecord(userId, newAsset,new Date(Util.getCurrentDateLong()),
                        "填写《"+ questionnaire.getTitle() +"》问卷",true);
                moneyMapper.insertRecord(moneyRecord);
                /**
                 * 发送通知给发布者
                 */
                User user = userMapper.getById(userId);
                Notification notification = new Notification(0, "系统通知",questionnaire.getPublisher(),
                        "有人填写你的问卷啦！",
                        "用户 " + user.getName()+ " 填写了你的问卷《"+ questionnaire.getTitle()+"》") ;
                notificationMapper.insert(notification);
                /**
                 * 同步通知发送到缓存中的用户
                 * */
                if(Notification.cacheList.containsKey(questionnaire.getPublisher())){
                    Notification.cacheList.get(questionnaire.getPublisher()).add(notification);
                    //重新排列，预想降序排列
                    Notification.cacheList.get(questionnaire.getPublisher())
                            .sort(Comparator.comparing(Notification::getDate));
                }
                /**
                 * 更新用户资料里
                 */
                //同步发送到缓存中的用户填写id列表
                if(QuesFillUser.cacheListId.containsKey(userId)){
                    QuesFillUser.cacheListId.get(userId).add(quesResult.getQuesID());
                }else{
                    List<Integer> list = new ArrayList<>();
                    list.add(quesResult.getQuesID());
                    QuesFillUser.cacheListId.put(userId, list);
                }
                //同步发送到缓存中的用户填写列表
                if(QuesFillUser.cacheList.containsKey(userId)){
                    QuesFillUser.cacheList.get(userId).add(questionnaire);
                }else{
                    List<Questionnaire> list = new ArrayList<>();
                    list.add(questionnaire);
                    QuesFillUser.cacheList.put(userId, list);
                }
            }else
            {
                message.setSuccess(false);
                message.setMsg("问卷已经关闭！");
                return message;
            }
            message.setSuccess(true);
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("创建失败:你已经填写过此问卷" + e.getMessage());
            return message;
        }
        return message;
    }


}
