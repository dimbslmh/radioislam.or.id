import { Group, Text } from "@mantine/core";

export default function StationStats({ listeners = 0 }: { listeners: number }) {
  return (
    <Group spacing={4}>
      <Text size="xs" color="dimmed">
        {listeners} pendengar
      </Text>
    </Group>
  );
}
