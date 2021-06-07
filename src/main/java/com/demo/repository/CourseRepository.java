package com.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

	
	Course findByCode(String code);
}
