import { Box, Paper, Stack, styled } from '@mui/material';
import backImg from '../../images/backImg.png';

export const CustomLogin = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
  `;

export const CustomForm = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 30%;
  height: 40%;
  `;

export const CustomStack = styled(Stack)`
  width: 90%;
  height: 90%;
  justify-content: center;
  align-items: center;
  display: flex;
  width:270px
`;
