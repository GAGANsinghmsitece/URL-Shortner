import React from 'react';
import {
  Container,
  Flex
} from '@chakra-ui/react';
const EmptyHistoryState = () => (
  <Container>
    <Flex gap={"8px"}>
      <p>Shorten a Link to see them here!!!</p>
    </Flex>
  </Container>
);

EmptyHistoryState.propTypes = {};

EmptyHistoryState.defaultProps = {};

export default EmptyHistoryState;
