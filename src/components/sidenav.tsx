import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import {
  FiHome,
  FiList,
  FiUpload,
  FiStar,
  FiUser
} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

export default function Sidenav() {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
      />
    </Box>
  );
}


const SidebarContent = () => {
    const navigate =useNavigate();
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      top={55}
      pos="fixed"
      h="full"
      >
        <Box>
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={FiHome}
          />Home
      </Flex>
    </Link>
        </Box>
        <Box>
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={()=>navigate('/home/addtodo')}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={FiUpload}
          />AddTodo
      </Flex>
    </Link>
        </Box>
        <Box>
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={()=>navigate('/home/alltodos')}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={FiList}
          />AllItems
      </Flex>
    </Link>
        </Box>
        <Box>
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={()=>navigate('/home/profile')}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={FiUser}
          />Profile
      </Flex>
    </Link>
        </Box>
        <Box>
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={FiStar}
          />Favourites
      </Flex>
    </Link>
        </Box>
    </Box>
  );
};
