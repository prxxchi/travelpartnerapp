import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  TextField,
  ListItemText,
  ListItem,
  List,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import sxStyle from "./styles";
import { useTheme } from "@mui/material/styles";
import ModeOfTravelRoundedIcon from "@mui/icons-material/ModeOfTravelRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

const Header = ({ onPlaceChanged, onLoad, onSearch }) => {
  const nav = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };
  const theme = useTheme();
  const { title, search, searchIcon, inputRoot, inputInput, toolbar } = sxStyle(
    { theme }
  );

  const [suggestions, setSuggestions] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const handleinputchange = async (event) => {
    const value = event.target.value;
    fetchsuggestion(value);
  };
  const fetchsuggestion = debounce(async (value) => {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/autocomplete.php?limit=5&key=pk.7efcaa71f2a50f6c1d52a87397ec031e&q=${value}`
      );
      console.log(response.data);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);
    }
  }, 500);
  const handleSearch = (selectedValue) => {
    setSelectValue(selectedValue);
    onSearch(selectedValue);
    setSuggestions([]); // Clear suggestions after search
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={[
            toolbar,
            { my: -1 },
            {
              background:
                "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(142,6,232,1) 0%, rgba(252,210,69,1) 100%)",
            },
          ]}
        >
          <Typography variant="h4" sx={title}>
            Travel Partner
            <ModeOfTravelRoundedIcon fontSize="large" />
          </Typography>
          <Box display="flex">
            <Typography variant="h6" sx={title}>
              Explore New Places
            </Typography>
            <TextField
              id="searchInput"
              placeholder="Search..."
              sx={{ marginRight: 1 }}
              onChange={handleinputchange}
            />
            {suggestions.length > 0 && (
              <List
                sx={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  zIndex: 1,
                  backgroundColor: "white",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    button
                    key={index}
                    sx={{ color: "black" }}
                    onClick={() => handleSearch(suggestion)}
                  >
                    <ListItemText primary={suggestion.display_name} />
                  </ListItem>
                ))}
              </List>
            )}
            {/* <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <Box sx={search}>
                <Box sx={searchIcon}>
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search..."
                  sx={{ "&": inputRoot, input: inputInput }}
                />
              </Box>
            </Autocomplete> */}
            <button onClick={handelLogout}>Logout</button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
