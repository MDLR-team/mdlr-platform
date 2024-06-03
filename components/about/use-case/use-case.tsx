import { Box } from "@mui/material";
import styled from "styled-components";

const UseCase: React.FC<{
  title: string | React.ReactNode;
  description: string[];
  index: number;
  v2?: boolean;
}> = ({ title, description, index, v2 }) => {
  return (
    <Wrapper>
      <Box sx={{ display: "grid", gridTemplateColumns: "400px 1fr" }}>
        <Box sx={{ fontSize: "14px", paddingTop: "10px" }}>
          {v2 && thumbs[index]?.label}
        </Box>

        <Left>
          <Title>{title}</Title>

          <Description data-type="description">
            {description.map((desc, index) => (
              <Box key={index}>
                {!v2 && <Box>0{index + 1}</Box>}
                {v2 && (
                  <Box>
                    <i>{index === 0 ? "How:" : "What for:"}</i>
                  </Box>
                )}
                <Box>{desc}</Box>
              </Box>
            ))}
          </Description>
        </Left>
      </Box>

      <Thumbnail
        color={thumbs[index]?.color}
        src={thumbs[index]?.url}
        padding={`${(thumbs[index].size[1] / thumbs[index].size[0]) * 100}%`}
      ></Thumbnail>
    </Wrapper>
  );
};

const thumbs = [
  {
    url: "/thumbs/usecase1.png",
    size: [3333, 1290],
    label: "USE CASE 1",
    color: "#1e305b",
  },
  {
    url: "/thumbs/usecase2.png",
    size: [3380, 1363],
    label: "USE CASE 3",
    color: "#efaaaa",
  },
  {
    url: "/thumbs/usecase3.png",
    size: [2751, 1204],
    label: "USE CASE 4",
    color: "#efaaaa",
  },
  {
    url: "/thumbs/usecase4.png",
    size: [3327, 1321],
    label: "USE CASE 2",
    color: "#efaaaa",
  },
];

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 80px;
  align-items: flex-start;

  padding: 80px 180px;

  & *[data-type="description"] {
    display: flex;
    gap: 60px;
    width: 800px;

    & > div {
      display: flex;
      max-width: 350px;
      flex-direction: column;
      gap: 5px;

      & > div:first-child {
        opacity: 1;
      }
    }

    &,
    & * {
      font-size: 18px;
      line-height: 1.4;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
  max-width: 800px;

  margin-top: 0px;
`;

const Description = styled.div``;

const Thumbnail = styled.div<{
  src: string;
  padding: string;
}>`
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;

  padding: 10px;
  //border-radius: 20px;
  //border: 1px solid lightgray;
  background: white; // rgb(244, 244, 248);
  //mix-blend-mode: multiply;

  border: 1px solid orange;

  &::before {
    content: "";
    width: 100%;
    position: relative;
    padding-top: ${(props) => props.padding};
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
  }
`;

export default UseCase;
