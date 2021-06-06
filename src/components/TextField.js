import {  Form, Col } from 'react-bootstrap';
const TextField = ({label, value,name, onChange, controlFeedback}) => {
    return (
      <Form.Row >
        <Form.Group as={Col} md="12" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                type="text"
                defaultValue=""
                value={value}
                onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              {controlFeedback}
            </Form.Control.Feedback>
        </Form.Group>
    </Form.Row>

    )
}

export default TextField;