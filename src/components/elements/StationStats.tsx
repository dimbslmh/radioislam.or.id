import { Group, Text } from "@mantine/core";

export default function StationStats({
  live,
  listeners = 0,
}: {
  live: boolean;
  listeners: number;
}) {
  return (
    <Group spacing={4}>
      {live && (
        <>
          <Text size="xs" color="red">
            Siaran langsung
          </Text>
          <Text size="xs" color="dimmed">
            •
          </Text>
        </>
      )}
      <Text size="xs" color="dimmed">
        {listeners} pendengar
      </Text>
    </Group>
  );
}
