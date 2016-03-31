package com.yyl.ctrl;

import com.yyl.utils.UI;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by yl on 2016/3/21.
 */
@Controller
@RequestMapping("/test")
public class TestCtrl {

    @RequestMapping(value = "/test1", method = RequestMethod.GET)
    public void test1() {
        System.out.println("------");
    }

    @RequestMapping(value = "/test2", method = RequestMethod.GET)
    public void test2(HttpServletRequest request, HttpServletResponse response, String s) {
        String s1 = request.getParameter("s1");

        UI.write(response, "{ll:111}");
        System.out.println("test2--s:" + s + ",s1:" + s1);
    }



    @RequestMapping(value = "/test3", method = RequestMethod.GET)
    public String test3(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("test3--");

        return "{ss:123}";
    }
}
