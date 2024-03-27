import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { groupsGetAll } from './groupGetAll';
import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupCreate(newGroup: string) {
    try {
      const storageGroups = await groupsGetAll();
      const groupAlredyExists = storageGroups.includes(newGroup);

      if (groupAlredyExists){
        throw new AppError("Já existe uma denúnica para esse local.")
      }
      const storage = JSON.stringify([...storageGroups, newGroup]);
      await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch(error) {
      throw error;
    }
}