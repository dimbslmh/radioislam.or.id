import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { MdStop } from "react-icons/md";

import {
  ActionIcon,
  Avatar,
  Group,
  Text,
  useMantineColorScheme
} from "@mantine/core";

export default function PlayerBar({ state, setOpened }: any) {
  const [playMarquee, setPlayMarquee] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      if (textRef.current?.offsetWidth > containerRef.current.offsetWidth) {
        setPlayMarquee(true);
      } else {
        setPlayMarquee(false);
      }
    }
  }, [state]);

  const { colorScheme } = useMantineColorScheme();

  const metadata = [state.artist, state.title].join(" - ");

  return (
    <Group style={{ height: 58 }} noWrap spacing={8}>
      <Avatar src={state.logo} size={42} />
      <div
        ref={containerRef}
        style={{ minWidth: "calc(100% - 86px)", overflow: "hidden" }}
      >
        <Text
          ref={textRef}
          size="sm"
          style={{
            whiteSpace: "nowrap",
            paddingLeft: 8,
            display: "inline-block",
            position: playMarquee ? "absolute" : "relative",
            opacity: playMarquee ? 0 : 1,
          }}
        >
          {metadata}
        </Text>
        {playMarquee && (
          <Marquee
            speed={30}
            play={playMarquee}
            pauseOnClick={!playMarquee}
            pauseOnHover={!playMarquee}
            gradientColor={
              colorScheme === "dark" ? [26, 27, 30] : [255, 255, 255]
            }
            gradientWidth={8}
            onCycleComplete={() => {
              console.log("Stop");
              setPlayMarquee(false);
              setTimeout(() => {
                console.log("Move");
                setPlayMarquee(true);
              }, 3000);
            }}
          >
            <Text
              size="sm"
              style={{
                whiteSpace: "nowrap",
                paddingLeft: 8,
                paddingRight: 100,
              }}
            >
              {metadata}
            </Text>
          </Marquee>
        )}
      </div>

      <ActionIcon variant="transparent" onClick={() => setOpened(false)}>
        <MdStop size={24} />
      </ActionIcon>
    </Group>
  );
}
