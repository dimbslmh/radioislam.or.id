import Head from "next/head";
import { MutableRefObject, PropsWithChildren } from "react";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineMoreVert,
  MdSearch
} from "react-icons/md";

import {
  ActionIcon,
  Container,
  Group,
  Header,
  Menu,
  Title,
  useMantineColorScheme
} from "@mantine/core";

import useStyles from "./Default.styles";

interface Props {
  title?: string;
}

export default function DefaultLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div className={classes.wrapper}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header
        fixed
        height={58}
        sx={theme => ({
          borderBottom: "none",
          color: colorScheme === "dark" ? theme.white : theme.black,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor:
          //   colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.red,
        })}
      >
        <Container style={{ height: 58 }}>
          <Group sx={{ height: "100%" }} position="apart">
            <ActionIcon variant="transparent" onClick={() => {}}>
              <MdSearch size={24} />
            </ActionIcon>
            <Title style={{ fontSize: 20 }}>Radio Islam Indonesia</Title>
            <Menu
              control={
                <ActionIcon variant="transparent">
                  <MdOutlineMoreVert size={24} />
                </ActionIcon>
              }
              closeOnItemClick={false}
            >
              <Menu.Item
                icon={colorScheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
                onClick={() => toggleColorScheme()}
              >
                Theme
              </Menu.Item>
            </Menu>
          </Group>
        </Container>
      </Header>
      {/* <Navbar width={{ base: 300 }} height={500} p="xs">
        <div></div>
            </Navbar> */}

      <Container mt={58}>{children}</Container>
      {/* <Footer /> */}
    </div>
  );
}
