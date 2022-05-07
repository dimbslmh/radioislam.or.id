import { Group, Text } from "@mantine/core";

export default function StationHeader(props: any) {
  return (
    <Group>
      <Text style={{ fontSize: 13 }} color="dimmed">
        {props.servertitle}
      </Text>
    </Group>
  );
}
