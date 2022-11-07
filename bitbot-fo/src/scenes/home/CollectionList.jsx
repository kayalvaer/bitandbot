import React, { useEffect, useState } from "react";
import Game from "../../components/Game";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
// import { Typography } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../../state";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";

const CollectionList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const games = useSelector((state) => state.cart.games);
  const notMobileResponsive = useMediaQuery("(min-width:600px)");
  console.log("games", games);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function getGames() {
    const games = await fetch(
      "http://localhost:1337/api/games?populate=image",
      { method: "GET" }
    );
    const gamesJson = await games.json();
    dispatch(setGames(gamesJson.data));
  }
  useEffect(() => {
    getGames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const turnBasedGames = games.filter(
    (game) => game.attributes.category === "turnBased"
  );
  const realTimeGames = games.filter(
    (game) => game.attributes.category === "realTime"
  );
  const firstPersonGames = games.filter(
    (game) => game.attributes.category === "firstPerson"
  );
  const thirdPersonGames = games.filter(
    (game) => game.attributes.category === "thirdPerson"
  );
  const adventureGames = games.filter(
    (game) => game.attributes.category === "adventure"
  );
  const rolePlayingGames = games.filter(
    (game) => game.attributes.category === "rolePlaying"
  );

  return (
    <Box width="80%" margin="70px auto">
      <Typography variant="h3" textAlign="center">
        Popular Games <b>Games</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          sx: { display: notMobileResponsive ? "block" : "none" },
        }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="TURNBASED" value="turnBased" />
        <Tab label="REALTIME" value="realTime" />
        <Tab label="FIRSTPERSON" value="firstPerson" />
        <Tab label="THIRDPERSON" value="thirdPerson" />
        <Tab label="ADVENTURE" value="adventure" />
        <Tab label="ROLEPLAYING" value="rolePlaying" />
      </Tabs>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 350px)"
        justifyContent="space-around"
        margin="0 auto"
        rowGap="25px"
        columnGap="1.40%"
      >
        {value === "all" &&
          games.map((game) => (
            <Game game={game} key={`${game.name}-${game.id}`} />
          ))}
        {value === "turnBased" &&
          turnBasedGames.map((game) => (
            <Game game={game} key={`${game.name}-${game.id}`} />
          ))}
        {value === "realTime" &&
          realTimeGames.map((game) => (
            <Game game={game} key={`${game.name}-${game.id}`} />
          ))}
        {value === "firstPerson" &&
          firstPersonGames.map((game) => (
            <Game game={game} key={`${game.name}-${game.id}`} />
          ))}
        {value === "thirdPerson" &&
          thirdPersonGames.map((game) => (
            <Game game={game} key={`${game.name}-${game.id}`} />
          ))}
        {value === "adventure" &&
          adventureGames.map((game) => (
            <Game game={game} key={`${game.name}-${game.id}`} />
          ))}
        {value === "rolePlaying" &&
          rolePlayingGames.map((game) => (
            <Game game={game} key={`${game.name}-${game.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default CollectionList;
