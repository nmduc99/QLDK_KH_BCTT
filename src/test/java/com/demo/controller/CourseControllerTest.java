package com.demo.controller;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import com.demo.DemoCrudSimpleApplication;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoCrudSimpleApplication.class,
webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CourseControllerTest {
	@LocalServerPort
	private int port;
	
	TestRestTemplate restTemplate = new TestRestTemplate();

	HttpHeaders headers = new HttpHeaders();
	
	@Test
	public void testGetAll() {
		HttpEntity<String> entity= new HttpEntity<String>(null,headers);
		ResponseEntity<String> response = restTemplate.exchange(createURLWithPort("/courses"), HttpMethod.GET, entity, String.class);
		assertTrue(response.getBody().length() > 0 );
		assertTrue(response.getStatusCode().value() == 200);
	}
	
	

	private String createURLWithPort(String uri) {
	
		return "http://localhost:" + port + uri;
	}
}
