import React, { useEffect, useState } from 'react';
import styles from './ShortedURL.module.scss';
import { useParams } from 'react-router-dom';
import { Center, Container, Spinner } from '@chakra-ui/react';
import { WarningIcon, CheckIcon } from "@chakra-ui/icons";
import endpoints from '../../helpers/endpoint';
import axios from 'axios';
import LinkStateLoader from '../../components/LinkStateLoader/LinkStateLoader';

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
              <LinkStateLoader
                icon={<Spinner size="xl" color="blue.600" />}
                text="Getting Information..."
                textStyle={styles.ShortedUrl__LoadingPlaceholder}
              />
              :
              <LinkStateLoader
                icon={<CheckIcon boxSize="60px" color="green.500" />}
                text="Redirecting you now"
                textStyle={styles.ShortedUrl__Success}
              /> :
            <LinkStateLoader
              icon={<WarningIcon boxSize="40px" color="red.500" />}
              text={error}
              textStyle={styles.ShortedUrl__Error}
            />
          }
        </Center>
      </Container>
    </div>
  );
}
ShortedUrl.propTypes = {};

ShortedUrl.defaultProps = {};

export default ShortedUrl;
