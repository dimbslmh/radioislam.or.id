import { createStyles } from "@mantine/core";

export default createStyles(theme => ({
  wrapper: {
    minHeight: "100vh",
  },
  actionButton: {
    color: "#fff",
    "&:active": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  },
}));
