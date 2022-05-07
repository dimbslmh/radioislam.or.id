import { createStyles } from "@mantine/core";

export default createStyles(theme => ({
  wrapper: {
    minHeight: "100vh",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
  },
  card: { width: 450 },
  cardHeader: {
    padding: "24px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  input: { marginBottom: 24 },
  footer: {
    display: "flex",
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));
