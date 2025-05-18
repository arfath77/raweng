import {
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Container,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useContext } from 'react';
import { Store } from '../context';
import { removeToken } from '../utils';

export function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Store);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  console.log({ isAuthenticated }, 'from header');

  return (
    <Box>
      <header>
        <Container size={1140} py={'md'} px={0}>
          <Group justify="space-between" h="100%">
            <Image alt="logo" src={logo} h={50} w={150} />
            <Group visibleFrom="sm">
              {isAuthenticated ? (
                <>
                  <Button onClick={logout} variant="default">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" variant="default">
                    Log in
                  </Button>
                  <Button component={Link} to="/register">
                    Sign up
                  </Button>
                </>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Group justify="center" grow pb="xl" px="md">
            {isAuthenticated ? (
              <>
                <Button onClick={logout} variant="default">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="default">
                  Log in
                </Button>
                <Button component={Link} to="/register">
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
