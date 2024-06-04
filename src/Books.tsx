import { Bookmark } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  docs?: string[];
  cover_i: number;
}

const Books: React.FC<{ search: string }> = ({ search }) => {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Book[]>([]);

  const isMobile = useMediaQuery("(max-width:600px)");

  console.log(bookmarks);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?title=${search}&limit=20&page=1`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResults(data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search]);

  const handleBookmark = (book: Book) => {
    const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const updatedBookmarks = [...existingBookmarks, book];
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <Stack padding={isMobile?"70px 0px": "70px 30px"} justifyContent={"center"}>
      {loading ? (
        <Stack
          sx={{ width: "100%", minHeight: "50svh", alignItems: "center", justifyContent: "center" }}
          direction={isMobile?"column" : "row"}
          gap={3}
        >
          <img
            style={{ maxHeight: "100px", maxWidth: "100px" }}
            src="https://cdn-icons-gif.flaticon.com/12743/12743787.gif"
            alt="Loading"
          />
          <img
            style={{ maxHeight: "100px", maxWidth: "100px" }}
            src="https://cdn-icons-gif.flaticon.com/12035/12035079.gif"
            alt="Loading"
          />
          <img
            style={{ maxHeight: "100px", maxWidth: "100px" }}
            src="https://cdn-icons-gif.flaticon.com/12743/12743716.gif"
            alt="Loading"
          />
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          gap={3}
        >
          {results.map((book) => (
            <Card
              sx={{
                width: isMobile? 150 : 200,
                height: "auto",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              key={book.key}
            >
              <IconButton
                onClick={() => handleBookmark(book)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  color: "#22bb33",
                }}
              >
                <Bookmark />
              </IconButton>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
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
                    style={{ maxHeight: "100%", maxWidth: "100%", transition: "1s" }}
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
                  Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Books;
