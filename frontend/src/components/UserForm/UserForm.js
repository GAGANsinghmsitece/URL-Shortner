import React, { useState } from 'react';
import styles from './UserForm.module.scss';
import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
const UserForm = ({
  title,
  caption,
  onSubmit,
  footerCaption,
  footerURL,
  footerURLPlaceholder,
  buttonText
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  }
  return (
    <Container display="block" pos="fixed" top="0px" left="0px" minWidth="100vw" minHeight="100vh">
      <Center height="100vh">
        <Stack width={"400px"}>
          <Heading as="h1">{title}</Heading>
          <Text fontSize='xl'>{caption}</Text>
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
          <Button onClick={onFormSubmit}>{buttonText}</Button>
          <Text fontSize='md'>{footerCaption} <a href={footerURL} className={styles.UserForm__Link}>{footerURLPlaceholder}</a></Text>
        </Stack>
      </Center>
    </Container >
  );
}

UserForm.propTypes = {};

UserForm.defaultProps = {};

export default UserForm;
