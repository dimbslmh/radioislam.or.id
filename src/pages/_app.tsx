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
        <meta name="theme-color" content="#fff" />
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
                "#f9e7ea",
                "#efc3ca",
                "#e69faa",
                "#dc7c8a",
                "#d3586b",
                "#c9344b",
                "#c0102b",
                "#a30e25",
                "#860b1e",
                "#6a0918",
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
