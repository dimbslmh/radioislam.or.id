import { MdOutlineMoreVert } from "react-icons/md";

import { ActionIcon, Menu } from "@mantine/core";

export default function StationMenu(station: any) {
  return (
    <Menu
      control={
        <ActionIcon
          variant="transparent"
          style={{ marginRight: -13, marginTop: -4 }}
          onClick={(event: any) => {
            event.stopPropagation();
          }}
        >
          <MdOutlineMoreVert size={18} />
        </ActionIcon>
      }
      //
      withinPortal={false}
    >
      <Menu.Item
        onClick={async (event: any) => {
          event.stopPropagation();
          if (!navigator.canShare) {
            console.log("navigator.canShare() not supported.");
          } else {
            const shareData = {
              text: `📣 📣
              Yuk simak kajian:
              ${station.songtitle}
              di 📻 ${station.name}`,
            };
            await navigator.share(shareData);
            console.log("navigator.canShare() supported.");
          }
        }}
      >
        Share
      </Menu.Item>
    </Menu>
  );
}
