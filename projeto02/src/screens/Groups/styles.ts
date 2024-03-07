import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.GRAY_600};
  align-items: center;
  justify-content: initial;
`;

export const Title = styled.Text`
  margin: 10px;
  font-size: 25px;
  color: #F00;
`;