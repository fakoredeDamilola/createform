import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiBackground = ({ children }: { children: React.ReactNode }) => {
  const { width, height } = useWindowSize();

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <Confetti
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
};

export default ConfettiBackground;
