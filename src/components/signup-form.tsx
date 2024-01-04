import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Radio, RadioGroup, Select
} from '@chakra-ui/react';
import { successToast,errorToast } from '../toasters/toast-messages';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { getDataByEmail ,postdata} from '../axios/apicalls';
export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const signupValidation = Yup.object().shape({

    firstName: Yup.string()
      .required('Required')
      .matches(
        /^[a-zA-Z]+$/,
        'Enter valid firstname'
      ),
    lastName: Yup.string()
      .required('Required')
      .matches(
        /^[a-zA-Z]+$/,
        'Enter valid lastname'
      ),
    email: Yup.string()
      .required("Email Required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|co\.in|net|edu|gov|mil|[a-zA-Z]{2,})$/,
        "Enter valid Email"
      ),
    gender: Yup.string()
      .required('Gender Required'),
    country: Yup.string()
      .required('Country Required'),
    dateofbirth: Yup.string()
      .required('Date of Birth Required'),
    password: Yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter Valid Password"
      ),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    mobilenumber: Yup.string()
      .required('Required')
      .matches(
        /^[6-9]\d{9}$/,
        "Enter valid Number"
      )
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dateofbirth: '',
      country: '',
      countrycode: '',
      mobilenumber: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      console.log(values.email);
      let responce=await getDataByEmail('http://localhost:3000/registeredUsers',values.email);
      if(responce){
        errorToast("User Already Registered")
      }
      else{
        let resolve=await postdata('http://localhost:3000/registeredUsers',values);
        if(resolve.data){
          successToast("Registration Successfull")
        }
        else{
          errorToast("Something Went Wrong")
        }
      }
      formik.resetForm();
    },

  });
  // const setCountryCode = () => {
  //   if (formRef.current) {
  //     console.log(formRef.current.country.value);
  //     switch (formRef.current.country.value) {
  //       case 'India':
  //         formRef.current.countrycode.value = "+91";
  //         return;
  //       case 'America':
  //         formRef.current.countrycode.value = "+1";
  //         return;
  //       case 'Australia':
  //         formRef.current.countrycode.value = "+61";
  //         return;
  //       default:
  //         formRef.current.countrycode.value = "";
  //     }
  //   }
  // }
  return (
    <form ref={formRef} onSubmit={formik.handleSubmit}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" >
                    <FormLabel>First Name</FormLabel>
                    <Input {...formik.getFieldProps('firstName')} type="text" />
                  </FormControl>
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <span>{formik.errors.firstName}</span>
                  ) : null}
                </Box>
                <Box>
                  <FormControl id="lastName" >
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" {...formik.getFieldProps('lastName')} />
                  </FormControl>
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <span>{formik.errors.lastName}</span>
                  ) : null}
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="email" >
                    <FormLabel> Email Adress</FormLabel>
                    <Input type="email" {...formik.getFieldProps('email')} />
                  </FormControl>
                  {formik.touched.email && formik.errors.email ? (
                    <span>{formik.errors.email}</span>
                  ) : null}
                </Box>
                <Box>
                  <FormControl id="gender" >
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup >
                      <Stack direction='row'>
                        <Radio id='gender'  {...formik.getFieldProps('gender')} value="Male">Male</Radio>
                        <Radio id='gener' {...formik.getFieldProps('gender')} value="FeMale">Female</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  {formik.touched.gender && formik.errors.gender ? (
                    <span>{formik.errors.gender}</span>
                  ) : null}
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="dateofbirth" >
                    <FormLabel> Date Of Birth</FormLabel>
                    <Input type="date" max={new Date().toISOString().slice(0, 10)} {...formik.getFieldProps('dateofbirth')} />
                  </FormControl>
                  {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                    <span>{formik.errors.dateofbirth}</span>
                  ) : null}
                </Box>
                <Box>
                  <FormControl id="country" >
                    <FormLabel > Select Your Country</FormLabel>
                    <Select width={"140%"} {...formik.getFieldProps('country')} name='country'>
                      <option value=''>Country</option>
                      <option value="India" >India</option>
                      <option value="America" >America</option>
                      <option value="Australia">Australia</option>
                    </Select>
                  </FormControl>
                  {formik.touched.country && formik.errors.country ? (
                    <span>{formik.errors.country}</span>
                  ) : null}
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id='countrycode' >
                    <FormLabel>Country Code</FormLabel>
                    <Input type="text" {...formik.getFieldProps('countrycode')} name='countrycode' />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="mobilenumber" >
                    <FormLabel>Mobile Number</FormLabel>
                    <Input type="text" {...formik.getFieldProps('mobilenumber')} />
                  </FormControl>
                  {formik.touched.mobilenumber && formik.errors.mobilenumber ? (
                    <span>{formik.errors.mobilenumber}</span>
                  ) : null}
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="password" >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? 'text' : 'password'} {...formik.getFieldProps('password')} />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password ? (
                      <span>{formik.errors.password}</span>
                    ) : null}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="confirmPassword" >
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? 'text' : 'password'} {...formik.getFieldProps('confirmPassword')} />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <span>{formik.errors.confirmPassword}</span>
                  ) : null}
                </Box>
              </HStack>
              <HStack>
                <Box marginLeft={"20%"}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    type='submit'
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Box>
                <Box>
                  <Button
                    loadingText="resetting"
                    size="lg"
                    type='reset'
                    onClick={() => formik.resetForm()}
                    bg={'red.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Reset
                  </Button>
                </Box>
              </HStack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={() => navigate('/')}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}