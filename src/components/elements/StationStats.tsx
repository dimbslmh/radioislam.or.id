import { Group, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";

export default function StationStats({
  currentlisteners = 0,
}: {
  currentlisteners: number;
}) {
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
        {currentlisteners} pendengar
      </Text>
    </Group>
  );
}
