import React from "react";
import HeroSection from "./HeroSection";

interface HomeProps {
  setSearchValue: (value: string) => void;
}

const Home: React.FC<HomeProps> = ({ setSearchValue }) => {
  return (
    <>
      <HeroSection
        bg="https://static.vecteezy.com/system/resources/thumbnails/038/999/497/small_2x/ai-generated-a-stacked-of-book-on-top-of-wooden-table-with-black-background-photo.jpg"
        title="Discover Your Next Favorite Book"
        bookmark={false}
        setSearchValue={setSearchValue}
      />
    </>
  );
};

export default Home;
