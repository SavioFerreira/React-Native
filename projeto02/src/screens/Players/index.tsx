import { Header } from '@components/Header';
import { Container, Form } from './styles';
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
      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />
        <ButtonIcon
          icon='add'
        />
        
      </Form>
    </Container>
  );
}