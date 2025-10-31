import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AddFishModal } from '../components/AddFishModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { EditFishModal } from '../components/EditFishModal';
import { FishCard } from '../components/FishCard';
import { useFishList } from '../hooks/useFishList';
import { useTanks } from '../hooks/useTanks';
import { Fish } from '../types/Fish';

export default function FishListScreen() {
  const { fishes, isLoading, addFish, editFish, deleteFish } = useFishList();
  const { tanks } = useTanks();
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

  // Debug: verificar tanks carregados
  React.useEffect(() => {
    console.log('FishListScreen - Tanks:', tanks);
    console.log('FishListScreen - Quantidade de tanks:', tanks.length);
  }, [tanks]);

  function handleEditFish(fish: Fish) {
    setSelectedFish(fish);
    setEditModalVisible(true);
  }

  function handleCloseEditModal() {
    setEditModalVisible(false);
    setSelectedFish(null);
  }

  function openDeleteFish(id: number) {
    const fish = fishes.find((f) => f.id === id);
    if (fish) {
      setSelectedFish(fish);
      setDeleteModalVisible(true);
    }
  }

  function handleDeleteFish() {
    if (selectedFish) {
      deleteFish(selectedFish.id);
      setDeleteModalVisible(false);
      setSelectedFish(null);
    }
  }

  function cancelDelete() {
    setDeleteModalVisible(false);
    setSelectedFish(null);
  }

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando peixes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const tank = item.tankId ? tanks.find(t => t.id === item.tankId) : undefined;
          return (
            <FishCard
              fish={item}
              tankName={tank?.name}
              onDelete={openDeleteFish}
              onEdit={handleEditFish}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AddFishModal
        visible={addModalVisible}
        tanks={tanks}
        onClose={() => setAddModalVisible(false)}
        onAdd={addFish}
      />

      <EditFishModal
        visible={editModalVisible}
        fish={selectedFish}
        tanks={tanks}
        onClose={handleCloseEditModal}
        onEdit={editFish}
      />

      <ConfirmDeleteModal
        visible={deleteModalVisible}
        title="Deletar Peixe"
        message={`Tem certeza que deseja deletar o peixe da espécie "${selectedFish?.species}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteFish}
        onCancel={cancelDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
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
