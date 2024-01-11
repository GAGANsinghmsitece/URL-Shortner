import React from 'react';
import { Box, Center } from '@chakra-ui/react';
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
