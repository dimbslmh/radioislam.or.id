import { useEffect, useRef, useState } from "react";

import PlayerBar from "@element/PlayerBar";
import DefaultLayout from "@layout/Default/Default";
import { Container, Drawer, SimpleGrid, Space } from "@mantine/core";
import { useDebouncedValue, useDidUpdate, useSetState } from "@mantine/hooks";
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
  const [state, setState] = useSetState({
    songtitle: "",
    name: "",
    logo: "",
    audioSrc: "",
  });

  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("") : undefined,
  );
  const isReady = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [opened, setOpened] = useState(false);

  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 50);
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState<keyof any>("");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { data, refetch } = GetStations();

  useDidUpdate(() => {
    const result = sortData(data, {
      sortBy,
      reversed: reverseSortDirection,
      search: debounced,
    });
    setSortedData(result);
  }, [debounced]);

  const setSorting = (field: keyof any) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    const result = sortData(data, { sortBy: field, reversed, search });
    setSortedData(result);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current?.pause();
      audioRef.current = new Audio("");
    };
  }, []);

  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current?.pause();
    audioRef.current = new Audio("");
    audioRef.current = new Audio(state.audioSrc);

    if (isReady.current) {
      audioRef.current.play();
      navigator.mediaSession.metadata = new MediaMetadata({
        title: state.songtitle,
        artist: state.name,
      });
      setIsPlaying(true);
      setOpened(true);
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [state]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      audioRef.current = new Audio("");
      audioRef.current = new Audio(state.audioSrc);
      setOpened(false);
    }
  }, [isPlaying]);

  const items = sortedData.map((item: any, index: number) => (
    <Station
      key={index}
      {...item}
      index={index}
      state={state}
      setState={setState}
      setOpened={setOpened}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
    />
  ));

  if (!data) {
    return <></>;
  }

  return (
    <DefaultLayout
      handleSearchChange={handleSearchChange}
      handleRefresh={refetch}
    >
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
        spacing={1}
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
        <Container px="md">
          <PlayerBar
            state={state}
            setOpened={setOpened}
            isPlaying={isPlaying}
            onPlayPauseClick={setIsPlaying}
          />
        </Container>
      </Drawer>
    </DefaultLayout>
  );
}
