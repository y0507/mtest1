package com.yyl.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by yl on 2016/3/22.
 */
@Controller
@RequestMapping("/test1")
public class Test1 {

    @RequestMapping(value = "/t1",method = RequestMethod.GET)
    public void t1(){
        System.out.println("----t1-----");
    }
}
