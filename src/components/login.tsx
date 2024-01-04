import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
    Text, Link,
    useColorModeValue,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { setLogin,setUserData} from '../slices/userSlice';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToast, errorToast } from '../toasters/toast-messages';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import dayjs from 'dayjs';
const LoginForm = () => {

    const { toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const dispatch=useDispatch<AppDispatch>();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });
    const formRef = useRef<HTMLFormElement>(null)
    const login = (e: any) => {
        console.log("Login");
        if (formRef.current) {
            let password = formRef.current.password.value;
            console.log(formRef.current.email.value);
            console.log(password);
            debugger;
            axios.get(`http://localhost:3000/registeredUsers/?email=${formRef.current.email.value}`)
                .then(responce => {
                    if (responce.data[0]) {
                        console.log(responce.data[0])
                        if (responce.data[0].password === password) {
                            successToast("Login Successfull");
                            dispatch(setLogin());
                            navigate('/home');
                            console.log(responce.data[0].email)
                            dispatch(setUserData(responce.data[0]));
                        }
                        else {
                            errorToast("Invalid Password")
                        }
                    }
                    else {
                        errorToast("User Doesnot Exists")
                    }
                })
                .catch(error => {
                    console.log(error);
                    errorToast("Something Went Wrong")
                })
        }

    }

    useEffect(() => {
        console.log(navigator.language.toLowerCase(),'useEEfect');

        const importModule = async () => {
            try{
                const module =await import('dayjs/locale/en-gb')
                console.log(module,'module')
            }catch(e) {
                console.log(e,'error')
            }
        };
        importModule();
    },[navigator.language])
    return (
        <form onSubmit={handleSubmit(login)} ref={formRef}>
            <Flex h="100vh" alignItems="center" justifyContent="center">
                <Flex
                    flexDirection="column"
                    bg={formBackground}
                    p={12}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Heading mb={6}>Log In</Heading>
                    <Input
                        placeholder="johndoe@gmail.com"
                        type="email"
                        variant="filled"
                        mb={3}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                    />
                    {errors.email ? <span>{(errors.email.message?.toString())}</span> : null}
                    <Input
                        placeholder="**********"
                        type="password"
                        variant="filled"
                        mb={6}
                        {...register('password', {
                            required: 'Password Is Required',
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Please Enter Valid Password'
                            }
                        })}
                    />
                    {errors.password ? <span>{(errors.password.message?.toString())}</span> : null}
                    <Text align={'left'}>
                        <Link color={'blue.400'} onClick={() => navigate('/forgot')}>Forgot Password?</Link>
                    </Text>
                    <Button type='submit' colorScheme="teal" mb={8}>
                        Log In
                    </Button>
                    <Text align={'center'}>
                        Create An Account? <Link color={'blue.400'} onClick={() => navigate('/signup')}>Signup</Link>
                    </Text>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="dark_mode" mb="0">
                            Enable Dark Mode?
                        </FormLabel>
                        <Switch
                            id="dark_mode"
                            colorScheme="teal"
                            size="lg"
                            onChange={toggleColorMode}
                        />
                    </FormControl>
                </Flex>
            </Flex>
        </form>
    );
}


export default LoginForm