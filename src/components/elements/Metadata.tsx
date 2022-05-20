import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import { Stack, Text } from "@mantine/core";

export default function Metadata({
  title,
  artist,
  streamstatus,
}: {
  title: string;
  artist: string;
  streamstatus: number;
}) {
  return (
    <Stack spacing={0}>
      <Text weight={500} size="lg">
        {title}
      </Text>
      <Text size="sm" color="dimmed">
        {artist}
      </Text>
    </Stack>
  );
}
