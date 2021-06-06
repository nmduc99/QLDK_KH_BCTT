package com.demo.model;

import javax.validation.constraints.NotBlank;

public class Enrol {
	@NotBlank(message = "Your input is required")
	private String studentId;
	private Long[] courses;
	
	public Long getStudentId() {
		return Long.parseLong(studentId);
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public Long[] getCourses() {
		return courses;
	}
	public void setCourses(Long[] courses) {
		this.courses = courses;
	}
	 
}