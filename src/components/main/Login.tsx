import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import {ChakraProvider} from '@chakra-ui/react'
import chakraTheme from "../../ChakraTheme"
import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

interface LoginRequest {
    email: string,
    password: string
}

interface AuthenticationResponse {
    token: string;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('')

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/register')
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const requestBody: LoginRequest = {
            email,
            password
        };

        const endpoint = `http://localhost:8080/api/v1/auth/authenticate`;

        try {
            const response = await axios.post<AuthenticationResponse>(endpoint, requestBody);
            localStorage.setItem('token', response.data.token); // switch to cookie on both login and register
            setLoginStatus('success')
            navigate('/dashboard')
            // Redirect to the desired page after successful authentication
        } catch (error) {
            setLoginStatus('failed');
            setPassword("");
            localStorage.removeItem('token');
            console.error(error)
        }
    };

    return (
        <ChakraProvider theme={chakraTheme}>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>

                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features 💰️
                        </Text>
                    </Stack>

                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        {loginStatus === 'failed' && (
                            <Box mb={4} color="red.500">Invalid username or password!</Box>
                        )}
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={email} onChange={handleEmailChange}/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={password} onChange={handlePasswordChange}/>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link onClick={handleRegisterClick} color={'blue.400'}>Sign Up</Link>
                                </Stack>
                                <Button
                                    onClick={handleSubmit}
                                    bg={'brand.100'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'brand.200',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </ChakraProvider>
    );
}