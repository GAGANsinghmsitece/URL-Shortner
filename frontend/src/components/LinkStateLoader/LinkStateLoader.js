import React from 'react';
import PropTypes from 'prop-types';
import { Box, Center, Container, Spinner } from '@chakra-ui/react';
import styles from './LinkStateLoader.module.scss';

const LinkStateLoader = ({ icon, textStyle, text }) => {
  return (
    <Box justifyContent="center">
      <Center paddingBottom="20px">
        {icon}
      </Center>
      <p className={textStyle}>
        {text}
      </p>
    </Box>
  );
}

LinkStateLoader.propTypes = {};

LinkStateLoader.defaultProps = {};

export default LinkStateLoader;
