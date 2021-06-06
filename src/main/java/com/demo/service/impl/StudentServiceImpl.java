package com.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.demo.entity.Student;
import com.demo.repository.StudentRepository;
import com.demo.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService{
	
	@Autowired
	public StudentRepository studentRepo;

	public StudentServiceImpl(StudentRepository studentRepo) {
		super();
		this.studentRepo = studentRepo;
	}
	
	@Override
	public List<Student> getAll() {
		return studentRepo.findAll();
	}
	
	@Override
	public Optional<Student> findById(Long id) {
		return studentRepo.findById(id);
	}
	
	@Override
	public void deleteById(Long id) {
		studentRepo.deleteById(id);
	}
	
	@Override
	public Student save(Student student) {
		return studentRepo.save(student);
	}
	
}
