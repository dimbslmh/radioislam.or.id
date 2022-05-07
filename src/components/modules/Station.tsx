import dynamic from "next/dynamic";

import StationHeader from "@element/StationHeader";
import StationMenu from "@element/StationMenu";
import StationStats from "@element/StationStats";
import { Card, Group, Text } from "@mantine/core";

const Metadata = dynamic(() => import("../elements/Metadata"), { ssr: false });

export default function Station(station: any) {
  return (
    <Card shadow="sm">
      <StationHeader {...station} />

      <Metadata {...station} />

      <Group position="apart" mt="md" mb={-8}>
        <StationStats {...station} />
        <StationMenu {...station} />
      </Group>
    </Card>
  );
}
