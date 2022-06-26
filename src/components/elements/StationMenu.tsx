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
        onClick={async () => {
          if (!navigator.canShare) {
            console.log("navigator.canShare() not supported.");
          } else {
            const shareData = {
              title: "MDN",
              text: "Learn web development on MDN!",
              url: "https://developer.mozilla.org",
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
