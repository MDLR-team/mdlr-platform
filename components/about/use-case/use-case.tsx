import { Box } from "@mui/material";
import styled from "styled-components";

const UseCase: React.FC<{
  title: string;
  description: string[];
  index: number;
}> = ({ title, description, index }) => {
  return (
    <Wrapper>
      <Left>
        <Title>{title}</Title>

        <Description data-type="description">
          {description.map((desc, index) => (
            <Box key={index}>
              <Box>0{index + 1}</Box>
              <Box>{desc}</Box>
            </Box>
          ))}
        </Description>
      </Left>

      <Thumbnail
        color={thumbs[index].color}
        src={thumbs[index].url}
        padding={`${(thumbs[index].size[1] / thumbs[index].size[0]) * 100}%`}
      ></Thumbnail>
    </Wrapper>
  );
};

const thumbs = [
  {
    url: "/thumbs/usecase1.png",
    size: [3333, 1290],
    color: "#1e305b",
  },
  {
    url: "/thumbs/usecase2.png",
    size: [3380, 1363],
    color: "#efaaaa",
  },
  {
    url: "/thumbs/usecase3.png",
    size: [2751, 1204],
    color: "#beaaef;",
  },
];

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  gap: 120px;
  align-items: flex-start;

  padding: 80px 80px;

  & *[data-type="description"] {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 300px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 5px;

      & > div:first-child {
        opacity: 1;
      }
    }

    &,
    & * {
      font-size: 14px;
      line-height: 1.4;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
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
  background: rgb(244, 244, 248);
  //mix-blend-mode: multiply;

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
