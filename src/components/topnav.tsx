import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordModal } from '../slices/popupSlice';
import { successToast } from '../toasters/toast-messages';
import ChangePasswordPopup from '../popups/change-password-popup';
import { setLogin } from '../slices/userSlice';
export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {user}=useSelector((state:any)=>state.user);
  const logOut = () => {
    dispatch(setLogin());
        navigate('/');
  }
  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4} position={'fixed'} width={'100%'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Todo Application</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar size='sm' name='Ryan Florence' src='https://bit.ly/ryan-florence' />{' '}
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                  <Avatar size='2xl' name='Ryan Florence' src='https://bit.ly/ryan-florence' />{' '}
                  </Center>
                  <br />
                  <Center>
                    <p>{user.firstName} {user.lastName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={()=>dispatch(changePasswordModal())} >Change Password</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={()=>{logOut();successToast("LoggedOut Successfully")}} >Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <ChangePasswordPopup/>
    </>
  );
}