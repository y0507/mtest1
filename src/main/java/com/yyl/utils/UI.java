package com.yyl.utils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by yl on 2016/3/21.
 */
public class UI {

    private UI(){}


    private static class UIFactory{
        private static final UI INSTENCE = new UI();
    }


    public static final UI getInstence(){
        return UIFactory.INSTENCE;
    }


   public static void write(HttpServletResponse response,String json) {
       response.setCharacterEncoding("UTF-8");

       //ctrl+alt+t
       PrintWriter printWriter = null;
       try {
           printWriter = response.getWriter();
           printWriter.print(json);
           printWriter.flush();
       } catch (IOException e) {
           e.printStackTrace();
       }finally {
           printWriter.close();
       }


   }



}
