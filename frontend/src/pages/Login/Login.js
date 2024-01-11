import React from 'react';
import { useToast } from '@chakra-ui/react';
import endpoints from '../../helpers/endpoint';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../helpers/routes';
import UserForm from '../../components/UserForm/UserForm';

const Login = () => {
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

  const submitLogin = async (email, password) => {
    try {
      const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!email.match(isValidEmail)) {
        showToastMessage("Validation Error", "This email is not valid");
        return;
      }
      const response = await axios.post(endpoints.Login, {
        email, password
      });
      if (response?.data?.success === true) {
        showToastMessage("Login Successful", "Redirecting you to dashboard", "success");
        localStorage.setItem("token", response?.data?.token);
        setTimeout(function () {
          navigate(AppRoutes.Dashboard)
        }, 2000);
      }
    } catch (err) {
      if (err?.response) {
        if (err?.response?.data?.success === false) {
          showToastMessage("Server Error", err?.response?.data?.message);
        }
      };
      console.log(err);
      return;
    }
  }
  return (
    <UserForm
      title="URL Shortner"
      caption="Welcome Back, let's get you back to URL Shortening"
      onSubmit={submitLogin}
      footerCaption="Didn't have a account?"
      footerURL={AppRoutes.Signup}
      footerURLPlaceholder="Signup Now"
      buttonText="Login"
    />
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
