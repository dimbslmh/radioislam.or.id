import { MdOutlineMoreVert } from "react-icons/md";

import { ActionIcon, Group, Menu, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";

export default function StationMenu(station: any) {
  const [state, setState] = useSetState({
    live: false,
  });

  return (
    <Menu
      control={
        <ActionIcon variant="transparent">
          <MdOutlineMoreVert size={18} />
        </ActionIcon>
      }
      style={{ marginRight: -8 }}
    >
      <Menu.Item
        onClick={async () => {
          if (!navigator.canShare) {
            console.log("navigator.canShare() not supported.");
          } else {
            console.log("navigator.canShare() supported.");
          }
        }}
      >
        Share
      </Menu.Item>
    </Menu>
  );
}
