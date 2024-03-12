import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;
