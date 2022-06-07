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
        height={opened ? 104 : 58}
        sx={theme => ({
          borderBottom: "none",
          color: theme.white,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.brand[8]
              : theme.colors.brand[6],
        })}
      >
        <Container style={{ height: 58 }}>
          <Group sx={{ height: "100%" }} position="apart">
            <ActionIcon
              variant="transparent"
              size={24}
              sx={{ marginLeft: -4, color: "#fff" }}
              onClick={() => {
                setOpened(!opened);
              }}
            >
              <MdSearch size={24} />
            </ActionIcon>
            <Title style={{ fontSize: 20 }}>Radio Islam Indonesia</Title>
            <Menu
              control={
                <ActionIcon
                  variant="transparent"
                  size={24}
                  sx={{ marginRight: -2, color: "#fff" }}
                >
                  <MdOutlineMoreVert size={24} />
                </ActionIcon>
              }
              closeOnItemClick={false}
              withinPortal={false}
              sx={{ marginRight: -8 }}
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
                autoFocus
                variant="default"
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
      <Space h={opened ? 104 : 58} />
      <Container>{children}</Container>
    </div>
  );
}
