package com.yyl.interceptor;


import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 拦截器测试
 * Created by yl on 2016/3/24.
 */
public class TestInterceptor extends HandlerInterceptorAdapter {

    private static final Logger log = LogManager.getLogger(TestInterceptor.class);

    private static final Logger log1 = LogManager.getLogger("myTest1");

    private static final Logger log2 = LogManager.getLogger("myTest2");


    /**
     * 在业务处理器处理请求之前拦截
     * 如果返回false
     *     从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
     * 如果返回true
     *    执行下一个拦截器,直到所有的拦截器都执行完毕
     *    再执行被拦截的Controller
     *    然后进入拦截器链,
     *    从最后一个拦截器往回执行所有的postHandle()
     *    接着再从最后一个拦截器往回执行所有的afterCompletion()
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {


        if(request.getRequestURI().toString().contains("/mvc")){
            log1.info(request.getRequestURI().toString());
            log.info("进入TestInterceptor拦截器");
        }

        return true;
    }


    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
        log2.info(request.getRequestURI().toString()+" --成功");
    }
}
