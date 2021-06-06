import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Col } from 'reactstrap';
import './Normalcss.css'

const NormalLoginForm = ({ login }) => {
  const onFinish = (values) => {
    login(values.username, values.password)
  };
  return (
    // cardLogin
    <Col className="pt-5 d-flex justify-content-center" lg={12}>
      <Col lg={3} style={{ paddingTop: '3rem' }}>
        <Card className="rounded ">
          <Form
            name="normal_login"
            className=""
            initialValues={{  
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Col className="py-4 d-flex justify-content-center pb-5">
              <div className="d-flex flex-column">
                <h3 className="d-flex justify-content-center">LOGIN</h3>
                <span className="text-muted">Wellcome to login to system</span>
              </div>
            </Col>
            <Col className="p-0 pb-2">
              <Col className="p-0 pt-2">
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
              </Col>
              <Col className="p-0">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

              </Col>
              <Col className="p-0 pt-1">
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Log in
                  </Button>                 
                </Form.Item>
              </Col>
            </Col>
          </Form>
        </Card>
      </Col>
    </Col>




  );
};


export default NormalLoginForm;