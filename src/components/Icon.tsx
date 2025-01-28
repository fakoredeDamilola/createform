import { QuestionType } from "../utils/constants";
import { GrMultiple } from "react-icons/gr";
import { MdOutlineShortText } from "react-icons/md";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { PiTextAlignLeftLight } from "react-icons/pi";
import { GoNumber } from "react-icons/go";
import { CiTextAlignJustify } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { VscSymbolBoolean } from "react-icons/vsc";
import { colors } from "../styles/colors";
import {
  HiOutlineArrowLeftEndOnRectangle,
  HiOutlineArrowRightStartOnRectangle,
} from "react-icons/hi2";
import { FaRegEyeSlash, FaTags } from "react-icons/fa";

const Icon = ({
  iconName,
  fontSize,
  withBg,
}: {
  iconName: string;
  fontSize: string;
  withBg?: boolean;
}) => {
  const style = {
    fontSize,
    padding: "5px",
    borderRadius: "5px",
  };

  const RenderIcon = () => {
    switch (iconName) {
      case QuestionType.short_text:
        return (
          <MdOutlineShortText
            style={{
              backgroundColor: !withBg ? "transparent" : colors.softBeige,
              ...style,
            }}
          />
        );
      case QuestionType.multiple_choice:
        return (
          <GrMultiple
            style={{
              backgroundColor: !withBg ? "transparent" : colors.coolGray,
              ...style,
            }}
          />
        );
      case QuestionType.multiple_selection:
        return (
          <BiSolidSelectMultiple
            style={{
              backgroundColor: !withBg ? "transparent" : colors.lightSage,
              ...style,
            }}
          />
        );
      case QuestionType.long_text:
        return (
          <PiTextAlignLeftLight
            style={{
              backgroundColor: !withBg ? "transparent" : colors.mistBlue,
              ...style,
            }}
          />
        );
      case QuestionType.number:
        return (
          <GoNumber
            style={{
              backgroundColor: !withBg ? "transparent" : colors.pastelLavender,
              ...style,
            }}
          />
        );
      case QuestionType.statement:
        return (
          <CiTextAlignJustify
            style={{
              backgroundColor: !withBg ? "transparent" : colors.softMint,
              ...style,
            }}
          />
        );
      case QuestionType.email:
        return (
          <AiOutlineMail
            style={{
              backgroundColor: !withBg ? "transparent" : colors.paleMauve,
              ...style,
            }}
          />
        );
      case QuestionType.boolean:
        return (
          <VscSymbolBoolean
            style={{
              backgroundColor: !withBg ? "transparent" : colors.mutedCoral,
              ...style,
            }}
          />
        );
      case "Tag":
        return (
          <FaTags
            style={{
              backgroundColor: !withBg ? "transparent" : colors.paleMauve,
              ...style,
            }}
          />
        );
      case "Hidden":
        return (
          <FaRegEyeSlash
            style={{
              backgroundColor: !withBg ? "transparent" : colors.paleMauve,
              ...style,
            }}
          />
        );
      case "start":
        return (
          <HiOutlineArrowRightStartOnRectangle
            style={{
              backgroundColor: !withBg ? "transparent" : colors.paleMauve,
              ...style,
            }}
          />
        );
      case "end":
        return (
          <HiOutlineArrowLeftEndOnRectangle
            style={{
              backgroundColor: !withBg ? "transparent" : colors.paleMauve,
              ...style,
            }}
          />
        );
      default:
        break;
    }
  };

  return <>{RenderIcon()}</>;
};

export default Icon;
