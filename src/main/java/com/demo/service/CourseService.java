package com.demo.service;

import java.util.List;
import java.util.Optional;

import com.demo.entity.Course;

public interface CourseService {


	List<Course> getAll();

	Course save(Course course);

	Optional<Course> findById(Long id);

	void deleteById(Long id);

	Course findByCode(String code);

}
