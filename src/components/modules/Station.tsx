import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import Metadata from "@element/Metadata";
import StationHeader from "@element/StationHeader";
import StationMenu from "@element/StationMenu";
import StationStats from "@element/StationStats";
import { Card, Group, Stack } from "@mantine/core";

export default function Station({ setState, setOpened, ...props }: any) {
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
    console.log("play", { ...props, ...data });
    setState({ ...props, ...data });
    setOpened(true);
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
