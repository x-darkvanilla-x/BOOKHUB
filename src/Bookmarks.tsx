import {Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  docs?: string[];
  cover_i: number;
}

const Bookmarks: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [bookmarks, setBookmarks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const removeBookmark = (key: string) => {
    const updatedBookmarks = bookmarks.filter((book) => book.key !== key);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return ( 

    <Stack padding={"70px 30px"} justifyContent={"center"}>
      <Stack sx={{ padding: "70px 30px" }} gap={3}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: "700" }}
          textAlign={"center"}
        >
          My Bookmarks
        </Typography>
        {bookmarks.length === 0 ? (
          <Typography textAlign={"center"}>No bookmarks found</Typography>
        ) : (
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            gap={3}
          >
            {bookmarks.map((book) => (
              <Card
                sx={{
                  width: 200,
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                key={book.key}
              >
                <IconButton
                  onClick={() => removeBookmark(book.key)}
                  sx={{
                    position: "absolute",
                    padding: "5px",
                    margin: "5px",
                    zIndex: 1,
                    color: "#bb2124",
                  }}
                >
                  <Delete />
                </IconButton>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      className="rotate"
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
                          : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      }
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        transition: "1s",
                      }}
                      alt={book.title}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bolder",
                      textAlign: "center",
                      marginTop: 2,
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="caption" sx={{ textAlign: "center" }}>
                    Author:{" "}
                    {book.author_name ? book.author_name.join(", ") : "Unknown"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
      </Stack>
     
  );
};

export default Bookmarks;
