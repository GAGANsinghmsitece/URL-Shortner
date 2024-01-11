import React from 'react';
import PropTypes from 'prop-types';
import styles from './HistoryPreloader.module.scss';
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
const HistoryPreloader = () => (
  <Container>
    <Flex gap={"8px"}>
      <Spinner />
      <p>Fetching History...</p>
    </Flex>
  </Container>
);

HistoryPreloader.propTypes = {};

HistoryPreloader.defaultProps = {};

export default HistoryPreloader;
