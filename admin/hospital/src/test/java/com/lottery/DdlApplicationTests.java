package com.lottery;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.ddl.DdlApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DdlApplication.class)
@WebAppConfiguration
public class DdlApplicationTests {

	@Test
	public void contextLoads() {
	}

}
