import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Card, Table, Form, Col,Dropdown } from 'react-bootstrap';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined,EyeOutlined } from '@ant-design/icons';
import { message, Spin, Popconfirm, Pagination, Input, Space } from 'antd';
import TextField from "components/TextField";

const PAGE_SIZE = 10;

function CourseList() {
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({ loading: true, data: [] });
    const { loading, data } = state || {};
    const [course, setCourse] = useState({
        id: '',
        code: '',
        name: '',
        description: ''
    })

    const [modal, setModal] = useState(false);

    const key = 'test';
    const mesdel = () => {
        message.loading({ content: 'Loading...', key });
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

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/courses/${id}`);
            await getAll();
            mesdel();
        } catch (error) {
            console.log(error);
        }
    }

    const { Search } = Input;
    const onSearch = value => console.log(value);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    function handlePageChange(page, pageSize) {
          setCurrentPage(page);

    }

    async function getAll() {
        setState({ loading: true, data: [] });
        const response = await axios.get(`http://localhost:8080/courses`);
        setState({ loading: false, data: response.data || [] });
    }

    useEffect(() => {
        setState({ loading: true, data: [] });
        getAll();
    }, [])

    async function handleOnSubmit(e) {
       
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        // pass validate
        if (form.checkValidity() === true) {
            const data = {
                code: course.code,
                name: course.name,
                description: course.description
            }

            // has id is edit
            if (course.id) {
                const { id } = course;
                data.id = id
                //console.log(data)
                try {
                    const response = await axios.put(`http://localhost:8080/courses/${id}`, data);
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
                    const response = await axios.post('http://localhost:8080/courses', data);
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
        setCourse({
            id: '',
            code: '',
            name: '',
            description: '',
        })
        setModal(false);
    }

    function editCourse(id) {
        axios.get(`http://localhost:8080/courses/${id}`)
            .then(response => response.data)
            .then(data => setCourse({
                id: data.id,
                code: data.code,
                name: data.name,
                description: data.description
            }))
        setModal(true)
    }

    return (
        <div>
            {loading && <Spin className="d-flex justify-content-center" />}
            {!loading && (
                <Col>
                     <h3>Course list</h3>
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
                                        <th><b>Code</b></th>
                                        <th><b>Name</b></th>
                                        <th><b>Description</b></th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((item, courseIndex) => (
                                            <tr key={courseIndex}>
                                                <td className="td-title">{item.id}</td>
                                                <td className="td-title">{item.code}</td>
                                                <td className="td-title">{item.name}</td>
                                                <td className="td-title">{item.description}</td>
                                                <td>
                                                    {/* <EditOutlined onClick={() => editCourse(item.id)} /> {' '}
                                                    <Popconfirm title="Are you sure？" onConfirm={() => deleteCourse(item.id)} okText="Yes" cancelText="No" >
                                                        <DeleteOutlined />
                                                    </Popconfirm> */}
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="ghost" id="dropdown-basic" size="sm">
                                                            Action
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align="right" className="mt-1 p-2">
                                                            <Dropdown.Item href="#/action-1"><EyeOutlined className="mr-2" />View</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2" onClick={() => editCourse(item.id)}> <EditOutlined className="mr-2" />Edit</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3" onClick={() => setSmall(true)} className="d-flex align-items-center"> <DeleteOutlined className="mr-2" />Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
                <Modal show={modal}>
                    <Modal.Header></Modal.Header>
                    <Modal.Body>
                        <Form id="formSubmit" noValidate validated={validated} onSubmit={handleOnSubmit} >
                            <TextField
                                label="Code:"
                                value={course.code}
                                name="code"
                                onChange={e => setCourse({ ...course, code: e.target.value })}
                                controlFeedback="Code should have aleast 2 characters and max 10 characters"
                            />

                            <TextField
                                label="Name:"
                                value={course.name}
                                name="namec"
                                onChange={e => setCourse({ ...course, name: e.target.value })}
                                controlFeedback="Name should have aleast 3 characters"
                            />

                            <TextField
                                label="description:"
                                value={course.description}
                                name="description"
                                onChange={e => setCourse({ ...course, description: e.target.value })}
                                controlFeedback="Not blank"
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row ml-auto" >
                            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                            <Button variant="primary" type="submit" form="formSubmit" className="ml-4" >
                                Save</Button>{' '}
                        </div>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>


    )
}

export default CourseList;