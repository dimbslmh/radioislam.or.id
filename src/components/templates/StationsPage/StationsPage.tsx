import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PlayerBar from "@element/PlayerBar";
import DefaultLayout from "@layout/Default/Default";
import {
  Container,
  Drawer,
  Group,
  Loader,
  SimpleGrid,
  Space
} from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import Station from "@module/Station";
import { GetStations } from "@service/react-query/queries/stations";

export function StationsPage() {
  const [opened, setOpened] = useState(false);
  const { data } = GetStations();

  const limit = 10;

  const [count, setCount] = useState({
    prev: 0,
    next: limit,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);

  useDidUpdate(() => {
    if (data) {
      setCurrent(data.slice(count.prev, count.next));
    }
  }, [data]);

  const getMoreData = () => {
    if (current.length === data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(
        current.concat(data.slice(count.prev + limit, count.next + limit)),
      );
    }, 2000);
    setCount(prevState => ({
      prev: prevState.prev + limit,
      next: prevState.next + limit,
    }));
  };

  if (!data) {
    return <></>;
  }

  const items = data.map((item: any, index: number) => (
    <Station key={index} {...item} index={index} />
  ));

  return (
    <DefaultLayout>
      {/* <Tabs>
        <Tabs.Tab label="Jawa">
          <ProvinceStations province="Jawa Timur" />
        </Tabs.Tab>
        <Tabs.Tab label="Kalimantan">
          <ProvinceStations province="Kalimantan" />
        </Tabs.Tab>
        <Tabs.Tab label="Sulawesi">
          <ProvinceStations province="Sulawesi" />
        </Tabs.Tab>
        <Tabs.Tab label="Others">
          <OtherStations provinces={["Jawa", "Kalimantan", "Sulawesi"]} />
        </Tabs.Tab>
      </Tabs> */}
      {/* <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={
          <Group position="center" my="xl">
            <Loader />
          </Group>
        }
      > */}
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {items}
        {/* {current &&
            current.map((item, index) => (
              <Station key={index} {...item} index={index} />
            ))} */}
      </SimpleGrid>
      {/* </InfiniteScroll> */}
      <Space h={78} />
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
    </DefaultLayout>
  );
}
