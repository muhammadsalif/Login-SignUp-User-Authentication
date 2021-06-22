import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import axios from "axios"

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault()

    axios.post('http://localhost:8080/auth/login', { email, password })
      .then(function (response) {
        alert(response.data);
        // console.log(response.data);
        setEmail("")
        setPassword("")
      })
      .catch(function (error) {
        // console.log(JSON.parse(error.request.response).message);
        alert(JSON.parse(error.request.response).message);
      });
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Container className="p-4">
        <Row className="p-4 d-flex flex-column justify-content-center align-items-center">
          <Alert.Heading className="py-2 border-bottom border-success">Login</Alert.Heading>
          <Col style={{ minHeight: '50vh' }} xs={8} lg={4} className="bg-light font-weight-bold p-4 border border-secondary rounded">

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control value={email} required onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} required onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
            </Form.Group>

            <Button className="btn-block font-weight-bold text-uppercase" variant="warning" type="submit">
              Submit
            </Button>

          </Col>
        </Row>
      </Container>
    </Form>
  )
}
