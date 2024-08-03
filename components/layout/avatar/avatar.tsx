import React, { useMemo } from "react";
import stc from "string-to-color";
import styled, { css } from "styled-components";
import chroma from "chroma-js";

const Avatar: React.FC<{
  username: string;
  size: "large" | "small";
}> = ({ username, size }) => {
  const initials = useMemo(() => {
    const nameParts = username!.split(" ");
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      );
    } else {
      return nameParts[0].charAt(0).toUpperCase();
    }
  }, [username]);

  const color = stc(username);
  const secondColor = chroma(color)
    .set("hsl.h", "+40") // Shift hue by 40 degrees
    .set("hsl.l", "-0.1") // Increase lightness
    .hex();

  return (
    <AvatarWrapper color={secondColor} secondColor={color} size={size}>
      {initials}
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div<{
  color: string;
  secondColor: string;
  size: "large" | "small";
}>`
  min-width: 36px;
  min-height: 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${(props) => props.color} 0%,
    ${(props) => props.secondColor} 100%
  );

  ${(props) =>
    props.size === "large"
      ? css``
      : css`
          & {
            min-width: 24px;
            min-height: 24px;
            width: 24px;
            height: 24px;

            & {
              &,
              & * {
                font-size: 10px;
              }
            }
          }
        `}

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 12px;

  border: 1px solid #333333;
  color: black;

  cursor: pointer;

  & * {
    pointer-events: none;
  }
`;

export default Avatar;
