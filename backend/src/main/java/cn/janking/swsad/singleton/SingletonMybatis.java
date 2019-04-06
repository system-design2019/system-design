package cn.janking.swsad.singleton;
import java.io.IOException;
import java.io.Reader;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import javax.jws.soap.SOAPBinding;

public class SingletonMybatis {
    private static SqlSessionFactory sqlSessionFactory;
    static {
        String resource = "spring-mybatis.xml";
        Reader reader = null;

        try {
            reader = Resources.getResourceAsReader(resource);
        } catch (IOException e) {
            System.out.println(e.getMessage());

        }
        //这里相当于生成一个数据库管理者，它可以返回一个连接给使用者。
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
    }

    public static SqlSessionFactory getSqlSessionFactory(){
        return sqlSessionFactory;
    }
}
