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
import HistoryPreloader from '../../components/HistoryPreloader/HistoryPreloader';
import ListHistoryComponent from '../../components/ListHistoryComponent/ListHistoryComponent';
import LinkShortComponent from '../../components/LinkShortComponent/LinkShortComponent';

const Dashboard = () => {
  const toast = useToast();
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


  return (
    <Tabs variant='soft-rounded'>
      <TabList>
        <Tab>Create URL</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LinkShortComponent />
        </TabPanel>
        <TabPanel>
          <Stack>
            {previousURL === null ?
              <HistoryPreloader />
              :
              <ListHistoryComponent data={previousURL} />
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
