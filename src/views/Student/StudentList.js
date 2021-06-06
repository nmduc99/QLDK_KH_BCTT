import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom'
import { Button, Modal, Card, Table, Form, Col, Dropdown } from 'react-bootstrap';
import axios from "axios";
import { EditOutlined, PlusCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { message, Spin, Popconfirm, Pagination, Tag } from 'antd';
import TextField from "components/TextField";
const PAGE_SIZE = 10;

function StudentList() {

    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({ loading: true, data: [] });

    const { loading, data } = state;


    const [student, setStudent] = useState({
        id: '',
        name: '',
        code: '',
        address: '',
        email: '',
    });

    //modal
    const [modal, setModal] = useState(false);
    const key = 'test';

    const mesdel = () => {
        message.loading({ content: 'loading....', key });
        setTimeout(() => {
            message.success({ content: 'Successfully!', key, duration: 2 });
        }, 200);
    };



    const addSuccess = () => {
        message.success('Create');
    };

    const editSuccess = () => {
        message.success('Edit Success');
    };


    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/students/${id}`);
            getAll();
            mesdel();
        } catch (error) {
            console.log(error);
        }
    }

    const inputS = useRef(null);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);


    function handlePageChange(page, pageSize) {
        // console.log(page);
        // console.log(pageSize);

        setCurrentPage(page);

    }

    async function getAll() {
        setState({ loading: true, data: [] });
        const response = await axios.get(`http://localhost:8080/students`)

        setState({ loading: false, data: response.data || [] });
        //console.log(response.data);
    }

    useEffect(() => {
        setState({ loading: true, data: [] });
        getAll();
    }, [])

    async function handleOnSubmit(e) {
        //console.log(inputS);
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        // pass validate
        if (form.checkValidity() === true) {
            const data = {
                name: student.name,
                codeStudent: student.code,
                address: student.address,
                email: student.email
            }

            // has id is edit
            if (student.id) {
                const { id } = student;
                data.id = id
                //console.log(data)
                try {
                    const response = await axios.put(`http://localhost:8080/students/${id}`, data);
                    if (response.status !== 500) {
                        editSuccess();
                        setModal(false);
                        getAll();
                    } else {
                        const { data } = response || {};
                        console.log(data);
                    }
                } catch (error) {
                    message.error("Validate Failed");
                }
                // else create new
            } else {
                try {
                    const response = await axios.post('http://localhost:8080/students', data);
                    console.log(response);
                    if (response.status !== 500) {
                        addSuccess();
                        setModal(false);
                        getAll();
                    } else {
                        const { data } = response || {};
                        console.log(data);
                    }
                } catch (error) {
                    message.error("Validate Failed");
                }
            }

        }

        setValidated(true);
    }

    function handleOnAdd() {
        setModal(true);
    }

    function handleCancel() {
        setStudent({
            id: '',
            name: '',
            code: '',
            address: '',
            email: '',

        })
        setModal(false);
    }

    function editStudent(id) {
        axios.get(`http://localhost:8080/students/${id}`)
            .then(response => response.data)
            .then(data => setStudent({
                id: data.id,
                name: data.name,
                code: data.codeStudent,
                address: data.address,
                email: data.email

            }))
        setModal(true)
    }


    return (
        <Col >
            {loading && <Spin className="d-flex justify-content-center" />}
            {!loading && (
                <Col>
                    <h3>Student list</h3>
                    <Card>
                        <Col className="pt-4 d-flex flex-lg-row flex-column pb-3">
                            <Col lg={3}>
                                <Form.Control type="email" placeholder="Search by name..." />
                            </Col>
                            <Col>
                                <Button color="primary" onClick={handleOnAdd} className="d-flex align-items-center ml-auto"><PlusCircleOutlined className="mr-2" />Add</Button>
                            </Col>
                        </Col>
                        <Card.Body className="pb-4">
                            <Table reponsive>
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Name</b></th>
                                        <th><b>Code Studen</b>t</th>
                                        <th><b>Address</b></th>
                                        <th><b>Email</b></th>
                                        <th><b>Course</b></th>
                                        <th><b>Action</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((item, studentIndex) => (
                                            <tr key={studentIndex}>
                                                <td className="td-title">{item.id}</td>
                                                <td className="td-title">{item.name}</td>
                                                <td className="td-title">{item.codeStudent}</td>
                                                <td className="td-title">{item.address}</td>
                                                <td className="td-title">{item.email}</td>
                                                <td className="td-title">{item.course.map(item => (
                                                    <Tag color="blue" key={item}>
                                                        {
                                                            item.code
                                                        }
                                                    </Tag>
                                                ))}</td>
                                                <td>
                                                    <EditOutlined onClick={() => editStudent(item.id)} /> {' '}
                                                    <Popconfirm title="Are you sure？" onConfirm={() => deleteStudent(item.id)} okText="Yes" cancelText="No" >
                                                        <DeleteOutlined />
                                                    </Popconfirm>
                                                    <Link to={`/admin/students/enrol/${item.id}`} >
                                                        <Button style={{
                                                            fontFamily: '-moz-initial',
                                                            padding: '6px 20px 6px 20px'
                                                        }} color="primary">
                                                            Enrol
                                                        </Button>
                                                    </Link>

                                                    {/* <Dropdown>
                                                        <Dropdown.Toggle variant="ghost" id="dropdown-basic" size="sm">
                                                            Action
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align="right" className="mt-1 p-2">
                                                            <Dropdown.Item href="#/action-1"><EyeOutlined className="mr-2" />View</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2" onClick={() => editStudent(item.id)}> <EditOutlined className="mr-2" />Edit</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3" onClick={() => setSmall(true)} className="d-flex align-items-center"> <DeleteOutlined className="mr-2" />Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown> */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <Pagination
                                defaultCurrent={1}
                                current={currentPage}
                                total={data.length}
                                onChange={handlePageChange}
                                className="d-flex justify-content-center"
                                pageSize={PAGE_SIZE}
                                showSizeChanger={false}
                            />
                        </Card.Body>
                    </Card>
                </Col>

            )}

            <div>
                <Modal show={modal} >
                    <Modal.Header> </Modal.Header>
                    <Modal.Body className="studentModal">
                        <Form id="formSubmit" noValidate validated={validated} onSubmit={handleOnSubmit} >
                            <TextField
                                label="Name:"
                                value={student.name}
                                name="names"
                                onChange={e => setStudent({ ...student, name: e.target.value })}
                                controlFeedback="Name should have aleast 3 characters"
                            />

                            <TextField
                                label="CodeStudent:"
                                value={student.code}
                                name="codes"
                                onChange={e => setStudent({ ...student, code: e.target.value })}
                                controlFeedback="codeStudent should have aleast 7 characters and max 10 characters"
                            />
                            <TextField
                                label="Address:"
                                value={student.address}
                                name="address"
                                onChange={e => setStudent({ ...student, address: e.target.value })}
                                controlFeedback="Not Null"

                            />
                            <TextField
                                label="Email:"
                                value={student.email}
                                name="email"
                                onChange={e => setStudent({ ...student, email: e.target.value })} controlFeedback="NOT NULL"
                                controlFeedback="Not Null"

                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row ml-auto" >
                            <Button variant="light" onClick={handleCancel} >Cancel</Button>
                            <Button variant="primary" type="submit" form="formSubmit" className="ml-4">
                                Save</Button>
                        </div>

                    </Modal.Footer>
                </Modal>
            </div>


        </Col>

    )

}

export default StudentList;