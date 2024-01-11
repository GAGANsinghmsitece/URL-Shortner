import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Center,
  Container,
  Flex,
  Input,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  List,
  ListItem,
  ListIcon,
  AccordionItem,
  Accordion,
  Box,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Heading,
  Text,
  Icon
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../helpers/routes';
import validator from "validator";
import { LinkIcon, CopyIcon } from '@chakra-ui/icons';
import styles from './LinkShortComponent.module.scss';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import endpoints from '../../helpers/endpoint';

const LinkShortComponent = () => {
  const toast = useToast();
  const [url, setURL] = useState('');
  const [shortedURL, setShortedURL] = useState(null);
  const showToastMessage = (title, message, status = "error") => {
    toast({
      title: title,
      description: message,
      status: status,
      isClosable: true
    });
  }
  const handleTokenExpiry = () => {
    showToastMessage("Session Expired", "Redirecting you to login page");
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload(true)
    }, 2000);
  }
  const generateShortLink = async (e) => {
    try {
      e.preventDefault();
      if (!validator.isURL(url)) {
        showToastMessage("Invalid URL", "Kindly Check your URL");
        return;
      }
      const response = await axios.post(endpoints.ShortURL, {
        url
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response?.data?.success === true) {
        showToastMessage("Success", "URL Shorted successfully", "success");

        const urlArray = (window.location + '').split("/");
        const resultedString = `${urlArray[0]}//${urlArray[2]}${AppRoutes.URL}${response?.data?.key}`;
        if (resultedString) {
          setShortedURL(resultedString);
        }
      }
    } catch (err) {
      if (err?.response) {
        if (err?.response?.status === 401) {
          handleTokenExpiry();
        } else if (err?.response?.data?.success === false) {
          showToastMessage("Server Error", err?.response?.data?.message);
        }
      };
      console.log(err);
      return;
    }
  }
  const copyURLToClipBoard = () => {
    try {
      navigator.clipboard.writeText(shortedURL);
      showToastMessage("Success", "Copied To Clipboard!!", "success");
    } catch (err) {
      console.log(err);
      return;
    }
  }
  return (
    <Container
      display="block"
      minWidth="100vw"
      minHeight="100vh"
      padding="0px"
      position="absolute"
      left="0px"
    >
      <Center height="100vh">
        <Stack width={"400px"}>
          <Heading as="h1">Shorten your URL</Heading>
          <Input
            type='text'
            value={url}
            onChange={(e) => {
              setURL(e.target.value);
            }}
            name='url'
            required={true}
            placeholder="Enter your URL here"
          />
          <Button onClick={generateShortLink}>Shorten URL!</Button>
          {shortedURL !== null &&
            <div
              className={styles.CopyToClipBoard}
            >
              <div
                className={styles.CopyToClipBoard__Left}
              >
                {shortedURL}
              </div>
              <div className={styles.CopyToClipBoard__Right} onClick={copyURLToClipBoard}>
                <Icon as={CopyIcon} />
              </div>
            </div>}
        </Stack>
      </Center>
    </Container>
  );
}

LinkShortComponent.propTypes = {};

LinkShortComponent.defaultProps = {};

export default LinkShortComponent;
