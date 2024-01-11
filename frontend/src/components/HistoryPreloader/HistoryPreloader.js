import React from 'react';
import {
  Container,
  Flex,
  Spinner
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
