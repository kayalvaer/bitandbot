import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseQuantity,
  increaseQuantity,
  deleteFraCart,
  setCheckOpenCart,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const checkOpenCart = useSelector((state) => state.cart.checkOpenCart);

  const grandTotal = cart.reduce((total, game) => {
    return total + game.count * game.attributes.price;
  }, 0);

  return (
    <Box //overlay
      display={checkOpenCart ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
      zIndex={10}
    >
      {/* MODAL */}
      <Box
        width="max(300px, 30%"
        height="100%"
        right="0"
        bottom="0"
        position="fixed"
        backgroundColor="#cfcdcd"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">CHECKOUT LIST ({cart.length}) </Typography>
            <IconButton onClick={() => dispatch(setCheckOpenCart({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CHECKOUT LIST */}
          <Box>
            {cart.map((game) => (
              <Box key={`${game.attributes.name}-${game.id}`}>
                <FlexBox p="16px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={game?.name}
                      width="125px"
                      height="164px"
                      src={`http://localhost:1337${game?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    {/* GAME NAME/TITLE */}
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {game.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() => dispatch(deleteFraCart({ id: game.id }))}
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{game.attributes.shortDescription}</Typography>
                    {/* AMOUNT */}
                    <FlexBox m="16px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseQuantity({ id: game.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{game.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseQuantity({ id: game.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Cost */}
                      <Typography fontWeight="bold">
                        ${game.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${grandTotal}</Typography>
            </FlexBox>
            <Button
              sx={{
                m: "25px 0",
                minWidth: "100%",
                padding: "25px 45px",
                color: "#ffffff",
                backgroundColor: shades.bright[900],
                borderRadius: 0,
                letterSpacing: 5,
                fontWeight: 700,
              }}
              onClick={() => {
                navigate("/cart");
                dispatch(setCheckOpenCart({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartList;
