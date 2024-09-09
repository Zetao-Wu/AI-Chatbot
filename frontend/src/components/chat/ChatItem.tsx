import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Extract code blocks and their associated languages
function extractCodeFromString(message: string) {
  const blocks = message.split("```");
  return blocks.map((block, index) => {
    if (index % 2 === 1) {
      const firstLineEndIndex = block.indexOf("\n");
      const language = block.slice(0, firstLineEndIndex).trim(); // Extract language
      const code = block.slice(firstLineEndIndex + 1); // Extract code
      return { type: "code", language, code };
    } else {
      return { type: "text", content: block }; // Plain text block
    }
  });
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: 0 }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {messageBlocks.map((block, index) =>
          block.type === "code" ? (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language={block.language || "text"} // Use "text" as fallback
            >
              {String(block.code)} {/* Ensure code is a string */}
            </SyntaxHighlighter>
          ) : (
            <Typography sx={{ fontSize: "20px" }} key={index}>
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my: 2 }}>
      <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {messageBlocks.map((block, index) =>
          block.type === "code" ? (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language={block.language || "text"} 
            >
              {String(block.code)}
            </SyntaxHighlighter>
          ) : (
            <Typography sx={{ fontSize: "20px" }} key={index}>
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;