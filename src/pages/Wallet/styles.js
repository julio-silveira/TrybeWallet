import { Box, styled } from '@mui/material';
import backImg from '../../images/backImg.png';

const CustomWalletContainer = styled(Box)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
`;

export default CustomWalletContainer;
