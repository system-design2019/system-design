package xyz.timoney.swsad.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import xyz.timoney.swsad.bean.Message;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JwtHelper {
    private static final String base64Security = "MDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjY=";
    private static final String audience = "098f6bcd4621d373cade4e832627b4f6";
    private static final String issuer = "api,timoney.xyz";
    private static final long TTLMillis = 24*60*60*1000;

    /**
     * 解析jwt
     */
    public static <T>String parseJWT(String jsonWebToken, Message<T> message){
        if(jsonWebToken==null || jsonWebToken.isEmpty()){
            message.setSuccess(false);
            message.setMsg("token为空");
            System.out.println(message);
            return "-1";
        }
        System.out.println("--------Request-------");
        System.out.println(jsonWebToken);
        System.out.println("--------Request-------");
        Claims claims;
        try
        {
            claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(base64Security))
                    .parseClaimsJws(jsonWebToken).getBody();
        }
        catch(Exception ex)
        {
            message.setSuccess(false);
            message.setMsg("解析token出现异常");
            return "-1";
        }

        if(claims!=null && !claims.isEmpty()) {
            if(!claims.getExpiration().before(new Date())){
                message.setSuccess(true);
                message.setMsg("token验证成功");
                return (String)claims.get("userId");
            }else {
                message.setSuccess(false);
                message.setMsg("token已过期");
                return "-1";
            }
        }
        message.setSuccess(false);
        message.setMsg("token无效");
        return "-1";
    }

    /**
     * 构建jwt
     */
    public static String createJWT(String userId)
    {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //生成签名密钥
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(base64Security);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //添加构成JWT的参数
        JwtBuilder builder = Jwts.builder().setHeaderParam("typ", "JWT")
                .claim("userId", userId)
                .setIssuer(issuer)
                .setAudience(audience)
                .signWith(signatureAlgorithm, signingKey);
        //添加Token过期时间
        if (TTLMillis >= 0) {
            long expMillis = nowMillis + TTLMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp).setNotBefore(now);
        }

        //生成JWT
        return builder.compact();
    }
}