import { Container, Title, Logo } from './styles';

const logo = '../../assets/skull-flower.png';
export function Groups() {
    return (
      <Container>
        <Logo source={require(logo)} />
        <Title>Projeto 002</Title>
        <Title>React Native - SFC</Title>
      </Container>
    );
  }
  