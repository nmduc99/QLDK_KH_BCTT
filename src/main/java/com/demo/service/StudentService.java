package com.demo.service;

import java.util.List;
import java.util.Optional;

import com.demo.entity.Student;

public interface StudentService {

	List<Student> getAll();

	Optional<Student> findById(Long id);

	void deleteById(Long id);

	Student save(Student student);

}
