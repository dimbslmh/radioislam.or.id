import { useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

import PlayerBar from "@element/PlayerBar";
import DefaultLayout from "@layout/Default/Default";
import {
  Button,
  Container,
  Drawer,
  SimpleGrid,
  Space,
  Stack,
  Title
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import Station from "@module/Station";
import { GetStations } from "@service/react-query/queries/stations";

function filterData(data: any, search: string) {
  const keys = Object.keys(data[0]);
  const query = search.toLowerCase().trim();
  return data.filter((item: any) =>
    keys.some(key => item[key].toString().includes(query)),
  );
}

function sortData(
  data: any,
  payload: { sortBy: keyof any; reversed: boolean; search: string },
) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search,
  );
}

export function StationsPage() {
  const [state, setState] = useSetState({ stream: undefined });
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState<keyof any>("");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { data } = GetStations();

  const setSorting = (field: keyof any) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    );
  };

  const { play, stop, playing, player, load, loading } = useAudioPlayer({
    src: state.stream,
    html5: true,
    format: ["mp3"],
    autoplay: true,
  });

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  if (!data) {
    return <></>;
  }

  const items = sortedData.map((item: any, index: number) => (
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
    <DefaultLayout handleSearchChange={handleSearchChange}>
      {/* <Title order={4}>Urutkan</Title>
      <Stack>
        <Button
          onClick={() => setSorting("name")}
          variant={sortBy === "name" ? "filled" : "outline"}
        >
          Nama
        </Button>
        <Button
          onClick={() => setSorting("province")}
          variant={sortBy === "province" ? "filled" : "outline"}
        >
          Propinsi
        </Button>
        <Button
          onClick={() => setSorting("district")}
          variant={sortBy === "district" ? "filled" : "outline"}
        >
          Kabupaten
        </Button>
      </Stack> */}
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
