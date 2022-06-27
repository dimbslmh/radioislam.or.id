import Head from "next/head";
import { MutableRefObject, PropsWithChildren, useState } from "react";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineMoreVert,
  MdRefresh,
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
  handleRefresh: any;
}

export default function DefaultLayout({
  title,
  children,
  handleSearchChange,
  handleRefresh,
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
            <Group
              sx={{
                flexGrow: 1,
                flexBasis: 0,
                justifyContent: "flex-start",
              }}
            >
              <ActionIcon
                size={36}
                radius={18}
                className={classes.actionButton}
                sx={{
                  marginLeft: -4,
                }}
                onClick={() => {
                  setOpened(!opened);
                }}
              >
                <MdSearch size={24} />
              </ActionIcon>
            </Group>

            <Title style={{ fontSize: 20 }}>Radio Islam Indonesia</Title>
            <Group
              sx={{ flexGrow: 1, flexBasis: 0, justifyContent: "flex-end" }}
            >
              <Menu
                control={
                  <ActionIcon
                    size={36}
                    radius={18}
                    className={classes.actionButton}
                    sx={{ marginRight: -2 }}
                  >
                    <MdOutlineMoreVert size={24} />
                  </ActionIcon>
                }
                withinPortal={false}
                sx={{ marginRight: -8 }}
              >
                <Menu.Item
                  icon={
                    colorScheme === "dark" ? <MdLightMode /> : <MdDarkMode />
                  }
                  onClick={() => toggleColorScheme()}
                >
                  Theme
                </Menu.Item>
                <Menu.Item icon={<MdRefresh />} onClick={() => handleRefresh()}>
                  Refresh
                </Menu.Item>
              </Menu>
            </Group>
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
      <Container px={0}>{children}</Container>
    </div>
  );
}
