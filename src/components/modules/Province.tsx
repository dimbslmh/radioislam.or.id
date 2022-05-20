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
  Space,
  Tabs
} from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import Station from "@module/Station";
import { GetStationsByProvince } from "@service/react-query/queries/stations";

export function ProvinceStations({ province }: { province: string }) {
  const [opened, setOpened] = useState(false);
  const { data } = GetStationsByProvince(province);

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
  );
}
