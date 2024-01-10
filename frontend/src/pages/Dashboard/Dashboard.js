import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.scss';
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
import { useToast } from '@chakra-ui/react';
import endpoints from '../../helpers/endpoint';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../helpers/routes';
import validator from "validator";
import { LinkIcon, CopyIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const [url, setURL] = useState('');
  const [shortedURL, setShortedURL] = useState(null);
  const toast = useToast();
  const test = window.location + '';
  const [previousURL, setPreviousURL] = useState(null);

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
  useEffect(() => {
    axios.get(endpoints.HistoryURL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.success === true) {
        setPreviousURL(res.data.urls);
      }
    }).catch(err => {
      if (err?.response?.status === 401) {
        handleTokenExpiry();
      }
    });
  }, []);

  const generateLink = (hash) => {
    const urlArray = (window.location + '').split("/");
    const resultedString = `${urlArray[0]}//${urlArray[2]}${AppRoutes.URL}${hash}`;
    return resultedString;
  }
  const submitSignUp = async (e) => {
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
    <Tabs variant='soft-rounded'>
      <TabList>
        <Tab>Create URL</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
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
                <Button onClick={submitSignUp}>Shorten URL!</Button>
                {shortedURL !== null && <div className={styles.CopyToClipBoard}>
                  <div className={styles.CopyToClipBoard__Left}>{shortedURL}</div>
                  <div className={styles.CopyToClipBoard__Right} onClick={copyURLToClipBoard}>
                    <Icon as={CopyIcon} />
                  </div>
                </div>}
              </Stack>
            </Center>
          </Container>
        </TabPanel>
        <TabPanel>
          <Stack>
            {previousURL === null ?
              <Container>
                <Flex gap={"8px"}>
                  <Spinner />
                  <p>Fetching History...</p>
                </Flex>
              </Container>
              :
              <Container
                minWidth="100vw"
                minHeight="100vh"
                padding="0px"
                paddingTop="0px"
                position="absolute"
                left="0px"
              >
                <Heading as="h1">History</Heading>
                <Accordion padding="0px" allowToggle={true}>
                  {previousURL.map((tx) =>
                    <AccordionItem key={tx?._id}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            {generateLink(tx.shortUrl)}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Original Link:- {tx.originalUrl}
                        <br />
                        No. of Visits:- {tx.visits}
                      </AccordionPanel>
                    </AccordionItem>

                  )}
                </Accordion>
              </Container>
            }
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>


  );
}
Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
