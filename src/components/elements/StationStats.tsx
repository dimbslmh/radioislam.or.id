import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { Group, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";

export default function StationStats({ listeners = 0 }: { listeners: number }) {
  const [state, setState] = useSetState({
    live: false,
  });

  return (
    <Group>
      {state.live && (
        <Text size="xs" color="red">
          Siaran langsung
        </Text>
      )}
      <Text size="xs" color="dimmed">
        {listeners} pendengar
      </Text>
    </Group>
  );
}
