import styled from "styled-components";
import { colors } from "../../styles/colors";

const ContentActionTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.borderTwoText};
  flex-direction: row;
  padding: 8px;
  border-radius: 8px;
  width: fit-content;
  gap: 5px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export { ContentActionTab };
