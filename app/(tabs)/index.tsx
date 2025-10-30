import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { ErrorView } from '../components/ErrorView';
import { LoadingView } from '../components/LoadingView';
import { TankLevelDisplay } from '../components/TankLevelDisplay';
import { useTankLevel } from '../hooks/useTankLevel';
import { useTankLevelAnimation } from '../hooks/useTankLevelAnimation';

export default function MonitoringScreen() {
  const { level, isLoading, error, refreshing, lastUpdate, onRefresh } = useTankLevel();
  const { animatedBarStyle } = useTankLevelAnimation(level);

  function renderContent() {
    if (isLoading) {
      return <LoadingView />;
    }

    if (error) {
      return <ErrorView message={error} />;
    }

    if (level !== null) {
      return <TankLevelDisplay
        level={level}
        animatedBarStyle={animatedBarStyle}
        lastUpdate={lastUpdate}
      />;
    }

    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

