import { useState, useEffect } from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/UsersApiSlice';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { RootState } from '../store';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterScreen: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state:RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Password does not match');
        }
        try {
            const res = await register({ ...formData }).unwrap();
            dispatch(setCredentials({ ...res }))
            navigate('/')
        } catch (err: any) {
            toast.error(err?.data?.message || err.error);
            console.log(err?.data?.message || err.error);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <FormContainer>
            <h1>Register Screen</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type='text'
                        placeholder='Enter Name'
                        value={formData.name}
                        onChange={handleInputChange}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        name="email"
                        type='email'
                        placeholder='Enter Email'
                        value={formData.email}
                        onChange={handleInputChange}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type='password'
                        placeholder='Enter Password'
                        value={formData.password}
                        onChange={handleInputChange}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        name="confirmPassword"
                        type='password'
                        placeholder='Enter Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    >
                    </Form.Control>
                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className='mt-3'>
                    Sign Up
                </Button>

                <Row className='py-3'>
                    <Col>
                        Already a Customer? <Link to="/login">Login</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>

    );
}

export default RegisterScreen;