import { Stack, Text } from "@mantine/core";

export default function Metadata({
  songtitle,
}: {
  songtitle: string;
  streamstatus: number;
}) {
  return (
    <Stack spacing={0}>
      <Text weight={500} size="sm" sx={{ lineHeight: 1.25, marginBottom: 4 }}>
        {songtitle}
      </Text>
    </Stack>
  );
}
