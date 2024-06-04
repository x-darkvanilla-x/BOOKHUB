import { ArrowBack, Bookmark } from "@mui/icons-material";
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
  subject?: string[];
  first_sentence?: string[];
  language?: string[];
}

function getRandomLightColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 21) + 80;
  const lightness = Math.floor(Math.random() * 21) + 70;
  const opacity = 0.5;
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
}

const Books: React.FC<{ search: string }> = ({ search }) => {
  const [preview, setPreview] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Book[]>([]);
  const [cardindex, setCardindex] = useState<number>(0);

  console.log(bookmarks);

  const isMobile = useMediaQuery("(max-width:600px)");

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

  const handleBookmark = () => {
    const existingBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    const newBookmark = results[cardindex];

    if (!existingBookmarks.includes(newBookmark)) {
      const updatedBookmarks = [...existingBookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    }
    console.log(existingBookmarks);
  };

  const handleCardClick = (index: number) => {
    setPreview(!preview);
    setCardindex(index);
  };

  return (
    <>
      {preview ? (
        <Stack
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <Stack
            padding={"10px"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Box>
              <IconButton
                onClick={() => {
                  setPreview(!preview);
                }}
              >
                <ArrowBack />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={handleBookmark}>
                <Bookmark />
              </IconButton>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            padding={"100px 0px"}
            gap={3}
          >
            <Stack>
              <Box>
                <img
                  src={
                    results[cardindex].cover_i
                      ? `https://covers.openlibrary.org/b/id/${results[cardindex].cover_i}.jpg`
                      : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                  }
                  width={"300px"}
                />
              </Box>
            </Stack>
            <Stack padding={"0px 20px"} width={"350px"} gap={2}>
              <Typography variant={isMobile ? "h4" : "h3"}>
                {results[cardindex].title}
              </Typography>
              <Typography variant={isMobile ? "h6" : "h5"}>
                Author : {results[cardindex].author_name}
              </Typography>

              {results[cardindex].subject && (
                <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
                  {results[cardindex].subject.map((subject, index) => (
                    <Typography
                      variant="caption"
                      key={index}
                      padding={"0px 10px"}
                      sx={{ backgroundColor: getRandomLightColor }}
                      borderRadius={"30px"}
                    >
                      {subject}
                    </Typography>
                  ))}
                </Stack>
              )}

              <Typography variant={isMobile ? "body1" : "h6"}>
                {results[cardindex].first_sentence
                  ? results[cardindex].first_sentence
                  : ""}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack
          padding={isMobile ? "70px 0px" : "70px 30px"}
          justifyContent={"center"}
        >
          {loading ? (
            <Stack
              sx={{
                width: "100%",
                minHeight: "50svh",
                alignItems: "center",
                justifyContent: "center",
              }}
              direction={isMobile ? "column" : "row"}
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
              {results.map((book, index) => (
                <Card
                  sx={{
                    width: isMobile ? 170 : 200,
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                  key={book.key}
                  onClick={() => {
                    handleCardClick(index);
                  }}
                >
                  {/* 
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
                  */}
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
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Unknown"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
};

export default Books;