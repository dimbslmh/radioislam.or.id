import { Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";

export default function Metadata(station: any) {
  const [state, setState] = useSetState({
    title: "Nikmat Persaudaraan Karna Allah",
    artist: "Al-Ustadz Abu Abdillah Muhammad Afifuddin Hafizhahullah Taala",
  });

  return (
    <>
      <Text weight={500} size="lg" mt="md">
        {state.title}
      </Text>
      <Text size="sm" color="dimmed">
        {state.artist}
      </Text>
    </>
  );
}
