import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import Metadata from "@element/Metadata";
import StationHeader from "@element/StationHeader";
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
  setOpened,
  play,
  stop,
  playing,
  player,
  load,
  ...props
}: any) {
  const url = props.url.includes("/radio")
    ? `https://${props.url}${props.port}/`
    : `https://${props.url}:${props.port}`;

  const { data } = useQuery<any, any>(
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

  if (!data || data?.error || !data.streamstatus) {
    return null;
  }

  const handlePlay = () => {
    const stream = url + "/stream";
    // if (state.stream === stream) {
    //   if (playing) {
    //     stop();
    //   } else {
    //     play();
    //   }
    // } else {
    setState({ stream, ...props, ...data });
    setOpened(true);
    // }
  };

  return (
    <Card
      p="sm"
      radius={0}
      sx={theme => ({
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
      <Group noWrap={true} align="flex-start" sx={{ height: "100%" }}>
        <Indicator
          inline
          disabled={!props.live}
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
              ...(props.live && {
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
          sx={{ height: "100%", width: "100%" }}
        >
          <Group position="apart">
            <Text style={{ fontSize: 13 }} color="dimmed">
              {props.name}
            </Text>
            <StationMenu {...data} />
          </Group>

          <Metadata {...data} />
          <StationStats {...data} />
        </Stack>
      </Group>
    </Card>
  );
}
