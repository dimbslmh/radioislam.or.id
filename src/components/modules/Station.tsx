import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import Metadata from "@element/Metadata";
import StationHeader from "@element/StationHeader";
import StationStats from "@element/StationStats";
import { Card, Group, Stack } from "@mantine/core";

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
  const { data } = useQuery<any, any>(
    [`https://${props.url}:${props.port}`],
    async () => {
      const response: AxiosResponse = await axios.post(`/api/getstats`, {
        url: `https://${props.url}:${props.port}`,
        type: props.type,
        index: props.index,
      });
      return response.data;
    },
    {
      retry: false,
    },
  );

  if (!data || !data.streamstatus) {
    return null;
  }

  const handlePlay = () => {
    const stream = `https://${props.url}:${props.port}/stream`;
    if (state.stream === stream) {
      if (playing) {
        stop();
      } else {
        play();
      }
    } else {
      setState({ stream, ...props, ...data });
      setOpened(true);
      play();
    }
  };

  return (
    <Card shadow="sm" onClick={handlePlay}>
      <Stack justify="space-between" sx={{ height: "100%" }}>
        <StationHeader {...props} />
        <Metadata {...data} />
        <Group position="apart">
          <StationStats {...data} />
          {/* <StationMenu {...data} /> */}
        </Group>
      </Stack>
    </Card>
  );
}
