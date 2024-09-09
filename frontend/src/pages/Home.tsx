import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim.js";
import Footer from "../components/footer/footer.js";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const isBelowSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box width={"100%"} height={"100%"} mx={"auto"} px={isBelowMd ? 2 : 4}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        {/* Typing Animation */}
        <Box>
          <TypingAnim />
        </Box>

        {/* Images Section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: isBelowMd ? 3 : 5,
            my: isBelowMd ? 5 : 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="robot.png"
            alt="robot"
            style={{
              width: isBelowMd ? "150px" : "200px",
              margin: isBelowMd ? "10px auto" : "auto",
            }}
          />
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{
              width: isBelowMd ? "150px" : "200px",
              margin: isBelowMd ? "10px auto" : "auto",
            }}
          />
        </Box>

        {/* Chat Image Section */}
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowSm ? "80%" : isBelowMd ? "70%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: isBelowMd ? 10 : 20,
              marginBottom: isBelowMd ? 10 : 20,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
