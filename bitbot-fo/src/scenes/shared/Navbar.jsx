import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { Badge, Box, IconButton } from "@mui/material";
import {
  ShoppingBagOutlined,
  SearchOutlined,
  MenuOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { setCheckOpenCart } from "../../state";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Box
      display="flex"
      width="100%"
      height="60px"
      position="fixed"
      top="0"
      left="0"
      alignItems="center"
      color="#ffffff"
      backgroundColor="rgba(0, 154, 182, 0.4 )"
      zIndex="1"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="80%"
        margin="auto"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[700]}
          fontSize="65"
        >
          Bits & Bots
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "#0f0f0f" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "#0f0f0f" }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setCheckOpenCart({}))}
              sx={{ color: "#0f0f0f" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "#0f0f0f" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
