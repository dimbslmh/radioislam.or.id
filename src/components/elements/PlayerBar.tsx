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

export default function PlayerBar() {
  const [playMarquee, setPlayMarquee] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      if (textRef.current?.offsetWidth > containerRef.current.offsetWidth) {
        setPlayMarquee(true);
      }
    }
  }, []);

  const { colorScheme } = useMantineColorScheme();

  return (
    <Group style={{ height: 58 }} noWrap spacing={8}>
      <Avatar size={42} color="red" radius={4}>
        RIL
      </Avatar>
      <div ref={containerRef} style={{ flexGrow: 1 }}>
        <Text
          ref={textRef}
          size="sm"
          style={{
            whiteSpace: "nowrap",
            paddingLeft: 8,
            display: "inline-block",
            position: "absolute",
            opacity: 0,
          }}
        >
          Al Ustadz Qomar Su&apos;aidi Lc
        </Text>
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
            }}
          >
            Al Ustadz Qomar Su&apos;aidi Lc
          </Text>
        </Marquee>
      </div>

      <ActionIcon variant="transparent">
        <MdStop size={24} />
      </ActionIcon>
    </Group>
  );
}
