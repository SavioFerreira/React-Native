import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';

export function Players() {
    return (
        <Container>
          <Header showBackButton />
          <Highlight 
            title='Denúncias Group'
            subtitle='nome dos componentes da coleta coletiva'
          />
          <Input 
            placeholder='Nome da pessoa'
          />
          <ButtonIcon 
            icon='add'
          />
        </Container>
    );
}