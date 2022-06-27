import { forwardRef, useEffect, useRef, useState } from "react";
import { BsSortDown, BsSortDownAlt, BsSortUp } from "react-icons/bs";
import { MdSort } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

import PlayerBar from "@element/PlayerBar";
import DefaultLayout from "@layout/Default/Default";
import {
  ActionIcon,
  Container,
  Drawer,
  Group,
  Loader,
  Menu,
  Select,
  SimpleGrid,
  Space,
  Switch,
  Text
} from "@mantine/core";
import { useDebouncedValue, useDidUpdate, useSetState } from "@mantine/hooks";
import Station from "@module/Station";
import { GetStations } from "@service/react-query/queries/stations";

function filterData(data: any, search: string) {
  if (data && data.length > 0) {
    const keys = Object.keys(data[0]);
    const query = search.toLowerCase().trim();
    return data.filter((item: any) =>
      keys.some(key => item[key].toString().includes(query)),
    );
  } else {
    return [];
  }
}

function sortData(
  data: any,
  payload: { sortBy: keyof any; reversed: boolean; search: string },
  listenersData: any,
) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (a.sticky || b.sticky) return 1;

      if (payload.reversed) {
        if (payload.sortBy === "listeners") {
          return (
            listenersData[`${b.url}:${b.port}`] -
            listenersData[`${a.url}:${a.port}`]
          );
        } else {
          return b[payload.sortBy].localeCompare(a[payload.sortBy]);
        }
      }

      if (payload.sortBy === "listeners") {
        return (
          listenersData[`${a.url}:${a.port}`] -
          listenersData[`${b.url}:${b.port}`]
        );
      } else {
        return a[payload.sortBy].localeCompare(b[payload.sortBy]);
      }
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

  // const [showOffline, setShowOffline] = useState(true);
  const [opened, setOpened] = useState(false);

  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 50);
  const [sortedData, setSortedData] = useState([]);
  const [listenersData, setListenersData] = useSetState({});
  const [sortBy, setSortBy] = useState<keyof any & string>("name");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { data, refetch } = GetStations();

  const limit = 10;

  const [count, setCount] = useState({
    prev: 0,
    next: limit,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);

  useDidUpdate(() => {
    const result = sortData(
      current,
      {
        sortBy,
        reversed: reverseSortDirection,
        search: debounced,
      },
      listenersData,
    );
    // setSortedData(result);
    setCurrent(result);
  }, [debounced]);

  const setSorting = (field: keyof any & string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    const result = sortData(
      current,
      { sortBy: field, reversed, search },
      listenersData,
    );
    // setSortedData(result);
    setCurrent(result);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

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

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  useEffect(() => {
    if (sortedData) {
      setCurrent(sortedData.slice(count.prev, count.next));
    }
  }, [sortedData]);

  const getMoreData = () => {
    if (current.length === sortedData.length) {
      console.log({ hasMore });
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(
        current.concat(
          sortedData.slice(count.prev + limit, count.next + limit),
        ),
      );
    }, 2000);
    setCount(prevState => ({
      prev: prevState.prev + limit,
      next: prevState.next + limit,
    }));
  };

  const items = sortedData.map((item: any, index: number) => (
    <Station
      key={index}
      {...item}
      index={index}
      state={state}
      setState={setState}
      sortedData={sortedData}
      setSortedData={setSortedData}
      listenersData={listenersData}
      setListenersData={setListenersData}
      setOpened={setOpened}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      // showOffline={showOffline}
    />
  ));

  if (!data) {
    return <></>;
  }

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    label: string;
    value: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    function SelectItemElement({ label, value, ...others }: ItemProps, ref) {
      return (
        <div ref={ref} {...others}>
          <Group noWrap position="apart">
            <Text size="sm">{label}</Text>
            {value === sortBy ? (
              reverseSortDirection ? (
                <BsSortDownAlt />
              ) : (
                <BsSortDown />
              )
            ) : (
              <BsSortDown />
            )}
          </Group>
        </div>
      );
    },
  );

  return (
    <DefaultLayout
      handleSearchChange={handleSearchChange}
      handleRefresh={refetch}
    >
      {/* <Group mx="md" my="sm" noWrap={true}> */}
      {/* <Select
          sx={{ width: 150 }}
          itemComponent={SelectItem}
          value={sortBy}
          withinPortal={false}
          rightSection={
            reverseSortDirection ? <BsSortDown /> : <BsSortDownAlt />
          }
          onChange={value => setSorting(value!)}
          data={[
            { value: "name", label: "Nama" },
            { value: "province", label: "Propinsi" },
            { value: "district", label: "Kabupaten" },
            { value: "listeners", label: "Pendengar" },
          ]}
        /> */}
      {/* <Switch
          checked={showOffline}
          onChange={event => setShowOffline(event.currentTarget.checked)}
          label="Tampilkan offline"
        /> */}
      {/* </Group> */}

      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={
          <Group position="center" my="xl">
            <Loader />
          </Group>
        }
      >
        <SimpleGrid
          cols={2}
          spacing={1}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          {/* {items} */}
          {current &&
            current.map((item: any, index) => (
              <Station
                key={index}
                {...item}
                index={index}
                state={state}
                setState={setState}
                sortedData={sortedData}
                setSortedData={setSortedData}
                listenersData={listenersData}
                setListenersData={setListenersData}
                setOpened={setOpened}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                // showOffline={showOffline}
              />
            ))}
        </SimpleGrid>
      </InfiniteScroll>
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
