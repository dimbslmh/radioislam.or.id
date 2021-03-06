import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";

import Metadata from "@element/Metadata";
import StationMenu from "@element/StationMenu";
import StationStats from "@element/StationStats";
import {
  Avatar,
  Card,
  Group,
  Image,
  Indicator,
  Stack,
  Text
} from "@mantine/core";

export default function Station({
  state,
  setState,
  sortedData,
  setSortedData,
  listenersData,
  setListenersData,
  setOpened,
  isPlaying,
  setIsPlaying,
  // showOffline,
  ...props
}: any) {
  const url = props.url.includes("/radio")
    ? `https://${props.url}${props.port}`
    : `https://${props.url}:${props.port}`;

  const { data, isLoading } = useQuery<any, any>(
    [url],
    async () => {
      const response: AxiosResponse = await axios.post(`/api/getstats`, {
        url,
        type: props.type,
        index: props.index,
      });
      return response.data;
    },
    {
      retry: false,
    },
  );

  useEffect(() => {
    if (data) {
      setListenersData({ [`${props.url}:${props.port}`]: data.listeners });
    }
  }, [data]);

  // if (!data) {
  //   return (
  //     <Card
  //       px={0}
  //       mx="md"
  //       radius={0}
  //       sx={theme => ({
  //         overflow: "visible",
  //         borderBottomWidth: 1,
  //         borderBottomStyle: "solid",
  //         borderBottomColor:
  //           theme.colorScheme === "dark"
  //             ? theme.colors.dark[8]
  //             : theme.colors.dark[0],
  //         backgroundColor:
  //           theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  //       })}
  //     >
  //       <Group
  //         noWrap={true}
  //         spacing={0}
  //         align="flex-start"
  //         sx={{ height: "100%" }}
  //       >
  //         <Avatar src={props.logo} size={64}>
  //           <Image src="https://apiapk.radioislam.or.id/v2/logo/rii.png" />
  //         </Avatar>
  //         <Stack
  //           // justify="space-between"
  //           spacing={4}
  //           sx={{ height: "100%", width: "100%", marginLeft: 16 }}
  //         >
  //           <Group position="apart">
  //             <Text style={{ fontSize: 13 }} color="dimmed">
  //               {props.name}
  //             </Text>
  //           </Group>

  //           <Text weight={500} size="sm">
  //             Offline
  //           </Text>
  //         </Stack>
  //       </Group>
  //     </Card>
  //   );
  // }

  // if (!showOffline && data && (data.error || !data.streamstatus || data.live)) {
  //   return null;
  // }

  if (!data || data?.error || !data?.streamstatus || data?.live) {
    return null;
  }

  const handlePlay = () => {
    const audioSrc = url + "/stream";
    if (isPlaying && state.audioSrc === audioSrc) {
      setIsPlaying(false);
    } else {
      setState({ audioSrc, ...props, ...data });
    }
  };

  return (
    <Card
      px={0}
      mx="md"
      radius={0}
      sx={theme => ({
        overflow: "visible",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.dark[0],
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
      onClick={handlePlay}
    >
      <Group
        noWrap={true}
        spacing={0}
        align="flex-start"
        sx={{ height: "100%" }}
      >
        <Indicator
          inline
          disabled={data ? !data.onair : true}
          label="LIVE"
          radius={6}
          position="bottom-center"
          withBorder
          offset={0}
          styles={{
            indicator: {
              borderWidth: 2,
              paddingLeft: 3,
              paddingRight: 3,
              height: "auto",
              zIndex: 1,
            },
          }}
        >
          <Avatar
            src={props.logo}
            size={64}
            sx={theme => ({
              ...(data?.onair && {
                boxShadow: `0 0 0 2px ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white
                }, 0 0 0 4px ${
                  theme.colorScheme === "dark"
                    ? theme.colors.brand[8]
                    : theme.colors.brand[6]
                }`,
              }),
            })}
          >
            <Image src="https://apiapk.radioislam.or.id/v2/logo/rii.png" />
          </Avatar>
        </Indicator>
        <Stack
          justify="space-between"
          spacing={0}
          sx={{ height: "100%", width: "100%", marginLeft: 16 }}
        >
          <Group position="apart">
            <Text style={{ fontSize: 13 }} color="dimmed">
              {props.name}
            </Text>
            <StationMenu {...props} {...data} />
          </Group>
          {isLoading ? (
            <Text weight={500} size="sm">
              Loading...
            </Text>
          ) : (
            <Metadata {...data} />
          )}

          <StationStats {...data} />
        </Stack>
      </Group>
    </Card>
  );
}
