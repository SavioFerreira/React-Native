import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';




export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation(); 

  function handleNewGroup() {
    navigation.navigate('new');
  };

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch(error) {
      error;
    }
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
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
          
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={(
          <ListEmpty
            message="Nenhuma denúncia disponível"/>
        )}
        showsVerticalScrollIndicator={false}
        
      />
      <Button  
        title="Iniciar Denúncia"
        onPress={handleNewGroup}  
      />
    </Container>
  );
}
