import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
    return (
      <Container>
        <Header />
        <Highlight title='O senhor dos Aneis' subtitle='lá ele, só se for o seu' />
        <GroupCard title='Lacrimosa' />
      </Container>
    );
  }
  