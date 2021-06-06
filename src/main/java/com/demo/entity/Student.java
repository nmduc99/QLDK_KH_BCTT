package com.demo.entity;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;



@Entity
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@NotBlank
	@Size(min=3, message="Name should have aleast 3 characters")
	private String name;
	@NotBlank
	@Size(min=7, max=10, message="codeStudent should have aleast 7 characters and max 10 characters")
	private String codeStudent;
	@NotBlank
	private String gender;
	@NotBlank
	private String phonenumber;
	@NotBlank
	private String address;
	@NotBlank
	private String email;
	@ManyToMany	
	@JoinTable(name= "student_course", // Tạo ra một join table tên là"student_course"
			joinColumns = @JoinColumn(name= "student_id"), // Trong đó, khóa ngoại chính là student_id trỏ tới class hiện tại (Student)
			inverseJoinColumns = @JoinColumn(name= "course_id") //Khóa ngoại thứ 2 trỏ tới thuộc tính ở dưới (Course)
	)
	
	private List<Course> course;
	
	public Student() {
		super();
	}
	public Student(long id,String name, String codeStudent,String gender, String phonenumber, String addresss, String email) {
		super();
		this.id= id;
		this.name= name;
		this.codeStudent= codeStudent;
		this.gender= gender;
		this.phonenumber= phonenumber;
		this.email= email;
		}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCodeStudent() {
		return codeStudent;
	}
	public void setCodeStudent(String codeStudent) {
		this.codeStudent = codeStudent;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhoneNumber() {
		return phonenumber;
	}
	public void setPhoneNumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<Course> getCourse() {
		return course;
	}
	public void setCourse(List<Course> course) {
		this.course = course;
	}		
}