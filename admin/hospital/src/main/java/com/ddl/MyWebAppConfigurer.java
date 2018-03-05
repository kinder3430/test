package com.ddl;

import java.io.File;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.ddl.model.ConfigModel;

@Configuration
public class MyWebAppConfigurer 
        extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	String pathUpload = initPathUpload();
    	registry.addResourceHandler("/data/upload/**").addResourceLocations("file:" + pathUpload);
        registry.addResourceHandler("/img/**").addResourceLocations("classpath:/static/img/");
        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");
        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/");
        super.addResourceHandlers(registry);
    }
    
    // 文件上传目录定义及初始化	
    private String initPathUpload() {
    	String pathUpload = ConfigModel.getPathUpload();
    	File file = new File(pathUpload);
    	if (!file.exists()) {
    		file.mkdirs();
    	}
		return pathUpload;
	}    

}