import { useEffect, useState } from "react";

import PlayerBar from "@element/PlayerBar";
import LoginLayout from "@layout/Default/Default";
import {
  Box,
  Container,
  Drawer,
  SimpleGrid,
  Skeleton,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import Station from "@module/Station";
import { GetStations } from "@service/react-query/queries/stations";

export function StationsPage() {
  const [opened, setOpened] = useState(true);
  const { data } = GetStations();

  if (!data) {
    return <></>;
  }

  const stations = data;
  // const stations = data.slice(1, 2);

  return (
    <LoginLayout title="Log in to your account">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {stations.map((item: any, index: number) => (
          <Station key={index} {...item} />
        ))}
      </SimpleGrid>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        withOverlay={false}
        position="bottom"
        size={58}
        trapFocus={false}
      >
        <Container style={{ paddingLeft: 8, paddingRight: 16 }}>
          <PlayerBar />
        </Container>
      </Drawer>
    </LoginLayout>
  );
}
