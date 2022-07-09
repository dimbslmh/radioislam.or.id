import { createStyles } from "@mantine/core";

export default createStyles(theme => ({
  wrapper: {
    minHeight: "100vh",
  },
  actionButton: {
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    "&:active": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  },
}));
