import React from 'react';
import { useToast } from '@chakra-ui/react';
import endpoints from '../../helpers/endpoint';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../helpers/routes';
import UserForm from '../../components/UserForm/UserForm';

const SignUp = () => {
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

  const submitSignUp = async (email, password) => {
    try {
      const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
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

    <UserForm
      title="URL Shortner"
      caption="Create a account and start shortening your URL"
      onSubmit={submitSignUp}
      footerCaption="Already have an account"
      footerURL={AppRoutes.Login}
      footerURLPlaceholder="Login Now"
      buttonText="SignUp"
    />

  );
}

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
