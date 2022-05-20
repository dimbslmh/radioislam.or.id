import { Avatar, Group, Text } from "@mantine/core";

export default function StationHeader(props: any) {
  return (
    <Group>
      <Avatar src={props.logo} />
      <Text style={{ fontSize: 13 }} color="dimmed">
        {props.name}
      </Text>
    </Group>
  );
}
