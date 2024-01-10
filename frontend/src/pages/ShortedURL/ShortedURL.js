import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ShortedURL.module.scss';
import { useParams } from 'react-router-dom';
import { Box, Center, Container, Spinner } from '@chakra-ui/react';
import { WarningIcon, CheckIcon } from "@chakra-ui/icons";
import endpoints from '../../helpers/endpoint';
import axios from 'axios';

const ShortedUrl = () => {
  const { hash } = useParams();
  const [externalURL, setExternalURL] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get(`${endpoints.ResolveURL}${hash}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res?.data?.success === true) {
        setExternalURL(res?.data?.url);
      } else {
        setError("Unable to resolve the URL");
      }
    }).catch(err => setError(err.message));
  }, [hash]);

  useEffect(() => {
    if (externalURL) {
      window.location.replace(externalURL);
    }
  }, [externalURL]);
  return (
    <div className={styles.ShortedUrl} data-testid="ShortedUrl">
      <Container minW="100vw" minH="100vh">
        <Center height="100vh">
          {error === null ?
            externalURL === null ?
              <Box justifyContent="center">

                <Center paddingBottom="20px">
                  <Spinner size="xl" color="blue.600" />
                </Center>
                <p className={styles.ShortedUrl__LoadingPlaceholder}>
                  Getting Information...
                </p>
              </Box> : <Box justifyContent="center">
                <Center paddingBottom="20px">
                  <CheckIcon boxSize="60px" color="green.500" />
                </Center><p className={`${styles.ShortedUrl__Success}`}>Redirecting you now</p>
              </Box> : <Box justifyContent="center">
              <Center paddingBottom="20px">
                <WarningIcon boxSize="40px" color="red.500" />
              </Center><p className={`${styles.ShortedUrl__Error}`}>{error}</p>
            </Box>}
        </Center>
      </Container>
    </div>
  );
}
ShortedUrl.propTypes = {};

ShortedUrl.defaultProps = {};

export default ShortedUrl;
