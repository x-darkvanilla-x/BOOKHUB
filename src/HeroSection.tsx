import { Search } from "@mui/icons-material";
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  bg: string;
  title: string;
  bookmark: boolean;
  setSearchValue: (value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ bg, title, bookmark, setSearchValue }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputRef.current) {
        const value = inputRef.current.value.trim();
        if (value) {
          setSearchValue(value);
          navigate('/books');
        }
      }
    }
  };

  const handleSearchClick = () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      if (value) {
        setSearchValue(value);
        navigate('/books');
      }
    }
  };

  return (
    <>
      <Stack
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: isMobile ? "9/16" : "16/9",
          overflow: "hidden",
        }}
      >
        <img
          src={bg}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Background"
        />

        <Stack
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: "50px",
            textShadow: "2px 2px 100px rgba(0, 0, 0, 1)",
            textAlign: "center",
          }}
          gap={3}
          data-aos="fade-up"
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            color="white"
            sx={{ mixBlendMode: "luminosity" }}
          >
            {title}
          </Typography>

          <Typography
            variant={isMobile ? "body2" : "body1"}
            color="white"
            sx={{ maxWidth: "700px", mixBlendMode: "luminosity" }}
          >
            Explore a World of Stories and Knowledge, One Page at a Time. Dive
            into Bestsellers, Classics, and Hidden Gems. Join a Community of
            Book Lovers and Share Your Passion
          </Typography>

          {!bookmark && (
            <Stack>
              <TextField
                variant="standard"
                placeholder="Search..."
                inputRef={inputRef}
                onKeyDown={handleKeyPress}
                sx={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  "& .MuiInputBase-root": {
                    borderRadius: "30px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ cursor: "pointer" }}>
                      <Search onClick={handleSearchClick} />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default HeroSection;
