import { Button } from 'react-bootstrap'
import React, { useContext, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Context } from '../Context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'
const Register = () => {

    const navigate = useNavigate();
    const nameRef = useRef();
    const phoneRef = useRef();
    const regRef = useRef();
    const addRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name:nameRef.current.value,
            phone:phoneRef.current.value,
            address:addRef.current.value,
            registration:regRef.current.value
        }

        try {
            const res = await axios.post('http://localhost:5000/api/register/authentication',data);
            if(res.status === 200){

                console.log(res.data.result);

                localStorage.setItem('user',JSON.stringify(res.data.result));
                Swal.fire({
                    position: 'center-center',
                    icon: 'success',
                    title: 'Credentials are correct',
                    showConfirmButton: false,
                    timer: 2000
                })

                navigate('/courses')


            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Credentials'
                })
                

            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Wrong Credentials'
            })
            
        }

      
    }
    return (
        <div>
            <Container className='my-5'>
                <Form onSubmit={handleSubmit}>
                    <div className="d-flex flex">
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter Your Name</Form.Label>
                                <Form.Control type="text" placeholder="Full Name" ref={nameRef} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Enter Your Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Phone Number" ref={phoneRef} />
                            </Form.Group>
                        </div>

                        <div>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter Your Registration Number</Form.Label>
                                <Form.Control type="text" placeholder="Registration Number" ref={regRef} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Enter Your Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" ref={addRef} />
                            </Form.Group>
                        </div>
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Register