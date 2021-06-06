import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import { Button,  Card, Table, Col } from 'react-bootstrap';
import {  Spin, Space } from 'antd';
import { Formik, Form, Field } from 'formik'

function Enroll() {
    const { id } = useParams();
    const [state, setState] = useState({ loading: true, data: [] });
    const { loading, data } = state || {};


    async function getAll() {
        setState({ loading: true, data: [] });
        const response = await axios.get(`http://localhost:8080/courses`);
        setState({ loading: false, data: response.data || [] });
    }

    useEffect(() => {
        setState({ loading: true, data: [] });
        getAll();
    }, [])

     function onSave(data) {
        const form = {
            "studentId": id,
            "courses": [...data.checked]
        }
        dispatch(updateEnrol(form));
    }
    function onBack() {
        history.push("/admin/students")
    }


    return (
        <>
        <Row>
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
                    <CardHeader>
                        <CardTitle>Enrol</CardTitle>
                    </CardHeader>
                    <CardBody className="table-full-width  px-0">
                        <Row>
                            <Col md="12">
                                <Spin spinning={isLoading}  >
                                    {!isLoading && <Formik
                                        initialValues={{
                                            checked: !isLoading && courses && courses.map(item=>item.code)
                                        }}
                                        onSubmit={onSave}
                                    >
                                        {
                                            (setFieldValue, values) => (
                                                <Form>
                                                    <div className=" table-responsive table-bordered table-hover table-striped">
                                                        <table className="table table-bordered">
                                                            <thead   >
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>Code</th>
                                                                    <th>Name</th>
                                                                    <th> + </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    data && data.map((item, idx) => {
                                                                        return (
                                                                            <tr key={idx}>
                                                                                <td>{idx + 1}</td>
                                                                                <td>{item.code}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>
                                                                                    <Field
                                                                                        key={idx}
                                                                                        type="checkbox"
                                                                                        name="checked"
                                                                                        value={`${item.code}`}
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                    )
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <Row>
                                                        <Col md="12" className="text-center">
                                                            <Space>
                                                                <Button type="primary" htmlType="submit">
                                                                    Save
                                                                </Button>
                                                                <Button
                                                                    htmlType="button"
                                                                    onClick={onBack}
                                                                >
                                                                    Back
                                                                </Button>
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            )
                                        }
                                    </Formik>}
                                </Spin>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
    )
}

export default Enroll;