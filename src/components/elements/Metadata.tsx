import { Stack, Text } from "@mantine/core";

export default function Metadata({
  songtitle,
  streamstatus,
}: {
  songtitle: string;
  streamstatus: number;
}) {
  if (!streamstatus) {
    return (
      <Text weight={500} size="sm">
        Offline
      </Text>
    );
  }

  return (
    <Stack spacing={0}>
      <Text
        weight={500}
        size="sm"
        sx={{ lineHeight: 1.25, marginBottom: 4, overflowWrap: "anywhere" }}
      >
        {songtitle}
      </Text>
    </Stack>
  );
}
