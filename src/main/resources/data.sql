INSERT INTO COURSE (code,name,description) values('KPDL','Khai pha du lieu','3Tc');
INSERT INTO COURSE (code,name,description) values('KTMT','Kien truc may tinh','3Tc');
INSERT INTO COURSE (code,name,description) values('DTDM','Dien toan dam may','3Tc');
INSERT INTO COURSE (code,name,description) values('TTNT','Tri tue nhan tao','3Tc');
INSERT INTO COURSE (code,name,description) values('LTJ','Lap trinh java','3Tc');

INSERT INTO STUDENT (name,code_student,gender,phonenumber,address,email) values 
('Nam Anh', '1755242','Nam','0312455', 'Phu Yen', 'abcd123@gmail.com');
INSERT INTO STUDENT (name,code_student,gender,phonenumber,address,email) values 
('Nguyen Tam', '1755232','Nam','0312455', 'Quy Nhon', 'aaawwwwsss@gmail.com');
INSERT INTO STUDENT (name,code_student,gender,phonenumber,address,email) values 
('Nguyen Em', '175775242','Nu','0312455', 'Da Nang', '1q2w3e4r@gmail.com');
INSERT INTO STUDENT (name,code_student,gender,phonenumber,address,email) values 
('Ho Anh', '1755342','Nu','0312455','Lam Dong', 'awds123@gmail.com');


INSERT INTO STUDENT_COURSE (STUDENT_ID, COURSE_ID)
VALUES (1,1);
INSERT INTO STUDENT_COURSE (STUDENT_ID, COURSE_ID)
VALUES (1,2);
INSERT INTO STUDENT_COURSE (STUDENT_ID, COURSE_ID)
VALUES (2,2);

