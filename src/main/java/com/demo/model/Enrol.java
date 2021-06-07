package com.demo.model;

import javax.validation.constraints.NotBlank;

public class Enrol {
	@NotBlank(message = "Your input is required")
	private String studentId;
	private String[] courses;
	
	public Long getStudentId() {
		return Long.parseLong(studentId);
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String[] getCourses() {
		return courses;
	}
	public void setCourses(String[] courses) {
		this.courses = courses;
	}
	 
}
