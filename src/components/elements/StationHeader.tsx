import { Avatar, Group, Image, Text } from "@mantine/core";

export default function StationHeader(props: any) {
  return (
    <Group>
      <Avatar src={props.logo}>
        <Image src="https://apiapk.radioislam.or.id/v2/logo/rii.png" />
      </Avatar>
      <Text style={{ fontSize: 13 }} color="dimmed">
        {props.name}
      </Text>
    </Group>
  );
}
