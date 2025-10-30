import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AddFishModal } from '../components/AddFishModal';
import { FishCard } from '../components/FishCard';
import { useFishList } from '../hooks/useFishList';

export default function FishListScreen() {
  const { fishes, addFish, deleteFish } = useFishList();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function renderEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🐟</Text>
        <Text style={styles.emptyTitle}>Nenhum peixe cadastrado</Text>
        <Text style={styles.emptyText}>
          Comece adicionando peixes ao seu tanque
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FishCard fish={item} onDelete={deleteFish} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AddFishModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addFish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
