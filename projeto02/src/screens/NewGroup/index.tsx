import styled from 'styled-components/native';
import { Container, Content } from './styles'
import { Header } from '@components/Header';
import { UsersThree } from 'phosphor-react-native';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';


export function NewGroup() {
    return (
        <Container> 
            <Header showBackButton/>
            <Content>
              <Icon />
              <Highlight 
                title='Nova Denúnia'
                subtitle='Criar uma nova denúncia'/>
                <Button title='Criar'/>
            </Content>
        </Container>
    );
}

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 56,
  color: theme.COLORS.GREEN_700
}))`
  align-self: center;
`;