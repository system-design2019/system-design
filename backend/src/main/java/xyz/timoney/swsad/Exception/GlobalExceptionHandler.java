package xyz.timoney.swsad.Exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;
import xyz.timoney.swsad.bean.Message;

import javax.servlet.http.HttpServletRequest;

/**
 * Author: Janking
 *
 */
@ControllerAdvice
public class GlobalExceptionHandler extends ExceptionHandlerExceptionResolver {
     @ExceptionHandler(value = Exception.class)
     @ResponseBody
     public Message<String> handleException(HttpServletRequest request, Exception e) throws Exception{
         Message<String > message = new Message<>();
         message.setData(e.toString());
         return message;
     }

}
