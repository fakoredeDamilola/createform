import styled from "styled-components";
import { colors } from "../../styles/colors";
import { Box } from "@mui/material";

export const Container = styled.div`
  overflow-x: hidden;
  background-color: ${colors.black};
`;

export const HomeStackStyles = styled.div<{ mobile?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 40px;
  padding-top: ${({ mobile }) => (mobile ? "140px" : "200px")};

  position: relative;
  z-index: 5;
  &:before {
    display: ${({ mobile }) => (mobile ? "none" : "block")};
    content: "";
    width: 800px;
    height: 800px;
    border-radius: 50%;
    position: absolute;
    top: -370px;
    left: -360px;
    z-index: 1;
    background: ${colors.softBeige};
  }
  &:after {
    display: ${({ mobile }) => (mobile ? "none" : "block")};
    content: "";
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    position: absolute;
    top: -270px;
    right: -250px;
    z-index: 1;
    background: ${colors.softMint};
  }
`;

export const StartButtonStyle = styled.button<{ mobile?: boolean }>`
  width: ${({ mobile }) => (mobile ? "140px" : "180px")};
  height: ${({ mobile }) => (mobile ? "40px" : "60px")};
  background-color: ${colors.lightSage};
  color: ${colors.white};
  font-size: ${({ mobile }) => (mobile ? "14px" : "16px")};
  border-radius: 30px;
  border: none;
  position: relative;
  transition: ease-in 0.3s all;
  cursor: pointer;
  &:hover {
    background-color: ${colors.black};
    color: ${colors.primaryColor};
  }
  &:before {
    content: "";
    width: ${({ mobile }) => (mobile ? "146px" : "188px")};
    background-color: transparent;
    border: 1px solid ${colors.primaryColor};
    border-radius: 40px;
    height: ${({ mobile }) => (mobile ? "48px" : "68px")};
    position: absolute;
    left: -5px;
    top: -5px;
  }
`;
export const ScheduleButtonStyle = styled.button<{ mobile?: boolean }>`
  display: flex;
  gap: ${({ mobile }) => (mobile ? "4px" : "10px")};
  background: transparent;
  border: 1px solid ${colors.white};
  transition: all 0.3s;
  cursor: pointer;
  transition: 0.3s all;
  box-sizing: border-box;
  padding: ${({ mobile }) => (mobile ? "10px" : "20px")};
  border-radius: 30px;
  &:hover {
    border: 1px solid ${colors.primaryColor};
  }

  &:hover span {
    color: ${colors.primaryColor};
  }

  & span {
    font-size: ${({ mobile }) => (mobile ? "11px" : "16px")};
    color: ${colors.white};
  }
`;

export const FeatureStyle = styled(Box)`
  position: relative;
  width: 100%;
  margin: 40px 0;
  background: radial-gradient(
      circle at top left,
      rgba(35, 40, 45, 0.6) 30%,
      rgba(5, 9, 9, 0) 70%
    ),
    radial-gradient(
      circle at top right,
      rgba(35, 40, 45, 0.6) 30%,
      rgba(5, 9, 9, 0) 70%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(35, 40, 45, 0.6) 30%,
      rgba(5, 9, 9, 0) 70%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(35, 40, 45, 0.6) 30%,
      rgba(5, 9, 9, 0) 70%
    );
  background-size: 300px 300px;
  background-position: top left, top right, bottom left, bottom right;
  background-repeat: no-repeat;
`;
export const StudioImgStyle = styled.div`
  margin: 40px auto;
  width: 80%;
`;
