import Head from "next/head";
import { MutableRefObject, PropsWithChildren, useState } from "react";
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
  Space,
  TextInput,
  Title,
  useMantineColorScheme
} from "@mantine/core";

import useStyles from "./Default.styles";

interface Props {
  title?: string;
  handleSearchChange: any;
}

export default function DefaultLayout({
  title,
  children,
  handleSearchChange,
}: PropsWithChildren<Props>) {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [query, setQuery] = useState("");
  const [opened, setOpened] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header
        fixed
        height={opened ? 94 : 58}
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
            <ActionIcon
              variant="transparent"
              onClick={() => {
                setOpened(!opened);
              }}
            >
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
              withinPortal={false}
            >
              <Menu.Item
                icon={colorScheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
                onClick={() => toggleColorScheme()}
              >
                Theme
              </Menu.Item>
            </Menu>
          </Group>
          {opened && (
            <Group grow={true}>
              <TextInput
                value={query}
                onChange={event => {
                  const { value } = event.currentTarget;
                  setQuery(value);
                  handleSearchChange(value);
                }}
                placeholder="Cari Radio..."
              />
            </Group>
          )}
        </Container>
      </Header>
      <Space h={opened ? 94 : 58} />
      <Container>{children}</Container>
    </div>
  );
}
