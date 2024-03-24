import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styled from 'styled-components/native';

import { Container, Content } from './styles'

import { Header } from '@components/Header';
import { UsersThree } from 'phosphor-react-native';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group })   
  }
    return (
        <Container> 
            <Header showBackButton/>
            <Content>
              <Icon />
              <Highlight 
                title='Nova Denúnia'
                subtitle='Criar uma nova denúncia'/>
                <Input 
                  placeholder='Local Denúncia'
                  onChangeText={setGroup}
                />
                <Button 
                  title='Criar'
                  onPress={handleNew}
                  style={{ marginTop: 20 }} />
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