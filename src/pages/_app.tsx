import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const preferredColorScheme = useColorScheme();

  const [queryClient] = useState(() => new QueryClient());
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme,
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (!props.colorScheme) {
      setColorScheme(preferredColorScheme);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Radio Islam Indonesia</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <link
          href="https://fonts.cdnfonts.com/css/google-sans"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#c0102b" />
        <meta
          name="theme-color"
          content="#860b1e"
          media="(prefers-color-scheme: dark)"
        ></meta>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: "brand",
            colors: {
              brand: [
                "#f4e6e7",
                "#e3c1c2",
                "#d29b9d",
                "#c17678",
                "#b15154",
                "#a02b2f",
                "#8f060a",
                "#7a0509",
                "#640407",
                "#4f0306",
              ],
            },
            headings: {
              fontFamily: "'Product Sans Medium', sans-serif",
              fontWeight: 400,
            },
          }}
          defaultProps={{
            Button: { color: "red" },
            Badge: { size: "xl", radius: 0 },
            // ... default props for other components
          }}
          styles={{
            ActionIcon: {
              root: { "&:not(:disabled):active": { transform: "none" } },
            },
            Button: {
              root: {
                height: 32,
                minWidth: 80,
                padding: "0 12px",
                "&:not(:disabled):active": { transform: "none" },
              },
            },
          }}
        >
          <Global
            styles={theme => ({
              "*, *::before, *::after": {
                boxSizing: "border-box",
              },

              body: {
                ...theme.fn.fontStyles(),
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
                lineHeight: theme.lineHeight,
                overscrollBehavior: "none",
              },
            })}
          />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return {
    colorScheme: ctx?.req?.cookies?.["mantine-color-scheme"],
    pageProps: {},
  };
};

export default App;
