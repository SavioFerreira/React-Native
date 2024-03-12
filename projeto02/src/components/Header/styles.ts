import styled from 'styled-components/native';
import {  CaretLeft } from 'phosphor-react-native';

export const Container = styled.View` 
  width: 100%;
  margin-top: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 65px;
  height: 75px;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`;

export const BackIcon = styled(CaretLeft).attrs(({ theme}) => ({
  size: 36,
  color: theme.COLORS.WHITE
}))``;