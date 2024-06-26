import { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation(); 

  function handleNewGroup() {
    navigation.navigate('new');
  };

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch(error) {
      Alert.alert('Denuncias', 'Não foi possível carregar as denúncias')
    }
    finally {
      setIsLoading(false);
    }
  }
  
  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
        title='Denuncias'
        subtitle='selecione uma denúncia e inicie sua verificação'
      />
      {
        isLoading ? <Loading /> :
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={(
            <ListEmpty
              message="Nenhuma denúncia disponível" />
          )}
          showsVerticalScrollIndicator={false}
        />
      }
      <Button  
        title="Iniciar Denúncia"
        onPress={handleNewGroup}  
      />
    </Container>
  );
}
