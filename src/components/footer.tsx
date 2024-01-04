import { Icon } from '@chakra-ui/icons';
import {
    Box,
    chakra,
    Container,
    Link,
    Stack,
    Text,
    useColorModeValue
  } from '@chakra-ui/react';
import { FiLinkedin,FiFacebook,FiTwitter,FiInstagram } from 'react-icons/fi';
  const Footer=()=>{
    return(
        <Box
      color={useColorModeValue('black', 'gray.200')}
      >
      <Container
        as={Stack}
        maxW={'6xl'}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2023 Cognine Technologies. All rights reserved</Text>
        {/* <Stack direction={'row'} spacing={6}>
          <Link href='#'><Icon as={FiLinkedin}></Icon></Link>
          <Link href='#'><Icon as={FiLinkedin}></Icon></Link>
          <Link href='#'><Icon as={FiLinkedin}></Icon></Link>
          <Link href='#'><Icon as={FiLinkedin}></Icon></Link>
        </Stack> */}
      </Container>
    </Box>
    )
  }

export default Footer;