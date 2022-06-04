import { useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

import PlayerBar from "@element/PlayerBar";
import DefaultLayout from "@layout/Default/Default";
import { Container, Drawer, SimpleGrid, Space } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import Station from "@module/Station";
import { GetStations } from "@service/react-query/queries/stations";

export function StationsPage() {
  const [state, setState] = useSetState({ stream: undefined });
  const [opened, setOpened] = useState(false);
  const { data } = GetStations();

  const { play, stop, playing, player, load, loading } = useAudioPlayer({
    src: state.stream,
    html5: true,
    format: ["mp3"],
    autoplay: true,
  });

  if (!data) {
    return <></>;
  }

  const items = data.map((item: any, index: number) => (
    <Station
      key={index}
      {...item}
      index={index}
      state={state}
      setState={setState}
      setOpened={setOpened}
      player={player}
      play={play}
      stop={stop}
      playing={playing}
      load={load}
    />
  ));

  return (
    <DefaultLayout>
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {items}
      </SimpleGrid>
      <Space h={78} />
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        withOverlay={false}
        position="bottom"
        size={58}
        trapFocus={false}
        lockScroll={false}
      >
        <Container style={{ paddingLeft: 8, paddingRight: 16 }}>
          <PlayerBar
            state={state}
            setOpened={setOpened}
            play={play}
            stop={stop}
            playing={playing}
            loading={loading}
          />
        </Container>
      </Drawer>
    </DefaultLayout>
  );
}
