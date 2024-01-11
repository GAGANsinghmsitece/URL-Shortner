import React from 'react';
import {
  Container,
  AccordionItem,
  Accordion,
  Box,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Heading
} from '@chakra-ui/react';
import AppRoutes from '../../helpers/routes';

const ListHistoryComponent = ({ data }) => {
  const generateLink = (hash) => {
    const urlArray = (window.location + '').split("/");
    const resultedString = `${urlArray[0]}//${urlArray[2]}${AppRoutes.URL}${hash}`;
    return resultedString;
  }
  return (
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
        {data.map((tx) =>
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
              Shortened Link:-  {generateLink(tx.shortUrl)}
              <br />
              No. of Visits:- {tx.visits}
            </AccordionPanel>
          </AccordionItem>

        )}
      </Accordion>
    </Container>
  );
}

ListHistoryComponent.propTypes = {};

ListHistoryComponent.defaultProps = {};

export default ListHistoryComponent;
