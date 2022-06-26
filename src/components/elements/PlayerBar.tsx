import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { MdPlayArrow, MdStop } from "react-icons/md";

import {
  ActionIcon,
  Avatar,
  Group,
  Image,
  Text,
  useMantineColorScheme
} from "@mantine/core";

export default function PlayerBar({ state, isPlaying, onPlayPauseClick }: any) {
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

  return (
    <Group style={{ height: 58 }} noWrap spacing={8}>
      <Avatar src={state.logo} size={42}>
        <Image src="https://apiapk.radioislam.or.id/v2/logo/rii.png" />
      </Avatar>
      <div
        ref={containerRef}
        style={{
          minWidth: "calc(100% - 82px)",
          overflow: "hidden",
          lineHeight: "12px",
        }}
      >
        <Text
          ref={textRef}
          size="sm"
          style={{
            whiteSpace: "nowrap",
            paddingLeft: 8,
            display: playMarquee ? "block" : "inline-block",
            position: playMarquee ? "absolute" : "relative",
            opacity: playMarquee ? 0 : 1,
          }}
        >
          {state.songtitle}
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
              {state.songtitle}
            </Text>
          </Marquee>
        )}
      </div>
      {/* {loading ? (
        <Loader size={28} sx={{ flexShrink: 0 }} />
      ) : ( */}
      <ActionIcon
        variant="transparent"
        onClick={() => onPlayPauseClick(!isPlaying)}
        sx={{ marginRight: -3 }}
      >
        {isPlaying ? <MdStop size={24} /> : <MdPlayArrow size={24} />}
      </ActionIcon>
      {/* )} */}
    </Group>
  );
}
