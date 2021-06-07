package com.demo.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.demo.entity.Course;
import com.demo.entity.Student;
import com.demo.entity.StudentNotFoundException;
import com.demo.model.Enrol;
import com.demo.service.CourseService;
import com.demo.service.StudentService;

@RestController
@CrossOrigin("http://localhost:3000")
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private CourseService courseService;

	@GetMapping("/students")
	public List<Student> retrieveAllStudent() {
		return studentService.getAll();
	}

	@GetMapping("/students/{id}")
	public Student retrieveStudent(@PathVariable long id) {
		Optional<Student> student = studentService.findById(id);
		return student.get();
	}	

	@DeleteMapping("/students/{id}")
	public void deleteStudent(@PathVariable long id) {
		studentService.deleteById(id);
	}

	@PostMapping("/students")
	public ResponseEntity<Object> createStudent( @RequestBody Student student) {
		Student savedStudent = studentService.save(student);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedStudent.getId()).toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping("/students/{id}")
	public ResponseEntity<Object> updateStudent(  @RequestBody Student student, @PathVariable long id) {

		Optional<Student> studentOptional = studentService.findById(id);

		if (!studentOptional.isPresent())
			return ResponseEntity.notFound().build();

		student.setId(id);

		studentService.save(student);

		return ResponseEntity.noContent().build();
	}

//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
//		Map<String, String> errors = new HashMap<>();
//		ex.getBindingResult().getAllErrors().forEach((error) -> {
//			String fieldName = ((FieldError) error).getField();
//			String errorMessage = error.getDefaultMessage();
//			errors.put(fieldName, errorMessage);
//	});
//		return errors;
//	}
	
	@PutMapping("students/{id}/enrol")
	public ResponseEntity<Object> addEnrol(@RequestBody  @Valid Enrol enrol){
		Student student = studentService.findById(enrol.getStudentId()).orElseThrow(
				()->  new StudentNotFoundException("Student not found exception with id : "+ 
							enrol.getStudentId()));
				 
		if(enrol.getCourses() != null) {
			 List<Course> list = new ArrayList<Course>();
			 for(String item : enrol.getCourses()) {
				  Course course = courseService.findByCode(item);
				  if(course != null) {
					  list.add(course);
				  }
			 }
			 student.setCourse(list);
		}
		student = studentService.save(student);
		Map<String, String>  dataSuccess = new HashMap<>();
		dataSuccess.put("message", "Save success");
		return new ResponseEntity<Object>(dataSuccess, HttpStatus.OK);
	}
	
}