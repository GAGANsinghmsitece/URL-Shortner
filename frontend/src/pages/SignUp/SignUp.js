import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SignUp.module.scss';
import { Button, Center, Container, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import endpoints from '../../helpers/endpoint';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../helpers/routes';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const showToastMessage = (title, message, status = "error") => {
    toast({
      title: title,
      description: message,
      status: status,
      isClosable: true
    });
  }

  const submitSignUp = async (e) => {
    try {
      const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      e.preventDefault();
      console.log(email, password);
      if (!email.match(isValidEmail)) {
        showToastMessage("Validation Error", "This email is not valid");
        return;
      }
      const response = await axios.post(endpoints.SignUp, {
        email, password
      });
      if (response?.data?.success === true) {
        showToastMessage("Signup Successful", "Login with your newly created account", "success");
        setTimeout(() => {
          navigate(AppRoutes.Login);
        }, 2000);
      }
    } catch (err) {
      if (err?.response) {
        if (err?.response?.data?.success === false) {
          showToastMessage("Server Error", err?.response?.data?.message);
        }
      };
      return;
    }
  }
  return (
    <Container display="block" pos="fixed" top="0px" left="0px" minWidth="100vw" minHeight="100vh">
      <Center height="100vh">
        <Stack width={"400px"}>
          <Heading as="h1">URL Shortner</Heading>
          <Text fontSize='xl'>Create a account and start shortening your URL</Text>
          <Input
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name='email'
            required={true}
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name='password'
            required={true}
            placeholder="password"
          />
          <Button onClick={submitSignUp}>Signup</Button>
          <Text fontSize='md'>Already have an account? <a href={AppRoutes.Login} className={styles.SignUp__Link}>Login Now</a></Text>
        </Stack>
      </Center>
    </Container >
  );
}

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
