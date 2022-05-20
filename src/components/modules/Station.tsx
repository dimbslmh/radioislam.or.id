import axios, { AxiosResponse } from "axios";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import StationHeader from "@element/StationHeader";
import StationMenu from "@element/StationMenu";
import StationStats from "@element/StationStats";
import { Card, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";

const Metadata = dynamic(() => import("../elements/Metadata"), { ssr: false });

export default function Station(props: any) {
  const [ref, observedEntry] = useIntersection({
    root: null,
    threshold: 1,
  });

  const { data, isLoading, isFetching, isError, error, isFetched } = useQuery(
    [props.url],
    async () => {
      const response: AxiosResponse = await axios.post(`/api/getstats`, {
        url: `https://${props.url}:${props.port}`,
        type: props.type,
        index: props.index,
      });
      return response.data;
    },
    {
      enabled: !!observedEntry?.isIntersecting,
      retry: false,
    },
  );

  // if (!data || data.streamstatus === 0) {
  //   return null;
  // }

  return (
    <Card shadow="sm" ref={ref}>
      <Stack justify="space-between">
        <StationHeader {...props} />

        {isLoading && (
          <Stack spacing={6}>
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
          </Stack>
        )}

        {isError && <Text>{error.response.data.message}</Text>}

        {data && data.streamstatus === 0 && <Text>Offline</Text>}

        {data && data.streamstatus !== 0 && (
          <>
            <Metadata {...data} />

            <Group position="apart" mb={-8}>
              <StationStats {...data} />
              <StationMenu {...data} />
            </Group>
          </>
        )}
      </Stack>
    </Card>
  );
}
