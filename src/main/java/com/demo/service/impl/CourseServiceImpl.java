package com.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demo.entity.Course;
import com.demo.repository.CourseRepository;
import com.demo.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService {
	@Autowired
	private CourseRepository courseRepo;

	@Override
	public List<Course> getAll() {
		return courseRepo.findAll();
	}
	
	
	@Override
	public Course save(Course course) {
		return courseRepo.save(course);
	}

	@Override
	public Optional<Course> findById(Long id) {
		return courseRepo.findById(id);
	}

	 
	@Override
	public void deleteById(Long id) {
		courseRepo.deleteById(id);
	}

	
	
}

