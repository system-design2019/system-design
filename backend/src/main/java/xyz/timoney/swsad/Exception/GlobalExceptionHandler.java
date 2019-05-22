package xyz.timoney.swsad.Exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Author: Janking
 *
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
     @ExceptionHandler(Exception.class)
     public String handleException(Exception e) {
         return "MyError:" + e.getMessage();
     }
}
