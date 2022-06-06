import { MdOutlineMoreVert } from "react-icons/md";

import { ActionIcon, Menu } from "@mantine/core";

export default function StationMenu(station: any) {
  return (
    <Menu
      control={
        <ActionIcon
          variant="transparent"
          onClick={(event: any) => {
            event.stopPropagation();
          }}
        >
          <MdOutlineMoreVert size={18} />
        </ActionIcon>
      }
      style={{ marginRight: -8, marginTop: -4 }}
      withinPortal={false}
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
