import React, { useMemo } from "react";
import stc from "string-to-color";
import chroma from "chroma-js";
import { Avatar as MuiAvatar } from "@mui/material";

const Avatar: React.FC<{
  username: string;
  size: "xxl" | "large" | "small";
  isCount?: boolean;
  isCopilot?: boolean;
}> = ({ username, size, isCount, isCopilot }) => {
  const initials = useMemo(() => getInitials(username), [username]);
  const color = useMemo(() => getColor(username), [username]);

  const avatarSize = {
    xxl: 52,
    large: 32,
    small: 24,
  };

  const avatarFontSize = {
    xxl: 22,
    large: 14,
    small: 10,
  };

  return (
    <MuiAvatar
      sx={{
        width: avatarSize[size],
        height: avatarSize[size],
        fontSize: avatarFontSize[size],
        ...(isCopilot
          ? {
              background:
                "linear-gradient(97deg, #4168FF 0%, #AB62F8 58%, #F4A700 100%)",
            }
          : isCount
          ? { backgroundColor: "darkgrey" }
          : { backgroundColor: color }),
        color: "#FFFFFF", // Ensure the text color is white
      }}
    >
      {isCount ? username : initials}
    </MuiAvatar>
  );
};

export const getColor = (username: string) => {
  let color = stc(username);

  let chromaColor = chroma(color).hsl();
  let [hue, saturation, lightness] = chromaColor;

  saturation = Math.min(0.7, Math.max(0.3, saturation));
  lightness = Math.min(0.7, Math.max(0.4, lightness));

  color = chroma.hsl(hue, saturation, lightness).hex();

  const luminance = chroma(color).luminance();
  if (luminance > 0.6) {
    color = chroma(color).darken(1.5).hex();
  }

  return color;
};

export const getInitials = (username: string) => {
  const nameParts = username!.split(" ");
  if (nameParts.length > 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else {
    return nameParts[0].charAt(0).toUpperCase();
  }
};

export default Avatar;
