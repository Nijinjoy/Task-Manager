import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../../components/HeaderComponent';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fabScale] = useState(new Animated.Value(1));
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks(prev => prev.filter(task => task.id !== id));
          if (expandedTaskId === id) {
            setExpandedTaskId(null);
          }
        },
      },
    ]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setTasks([]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const AnimatedTaskItem: React.FC<{ item: Task; isExpanded: boolean; onPress: () => void }> = ({
    item,
    isExpanded,
    onPress,
  }) => {
    const [height] = React.useState(new Animated.Value(60));

    React.useEffect(() => {
      Animated.timing(height, {
        toValue: isExpanded ? 140 : 60,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [isExpanded]);

    return (
      <Animated.View style={[styles.taskItem, isExpanded && styles.taskCompleted, { height }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
          onPress={onPress}
          onLongPress={() => deleteTask(item.id)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
            size={22}
            color={item.completed ? '#4CAF50' : '#999'}
          />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[styles.taskTitle, item.completed && styles.completedText]}>{item.title}</Text>
            {isExpanded && item.description && (
              <Text style={styles.taskDescription}>{item.description}</Text>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const pressFab = () => {
    Animated.sequence([
      Animated.timing(fabScale, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fabScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    navigation.navigate('AddTask' as never);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const renderTaskItem = ({ item }: { item: Task }) => {
    const isExpanded = expandedTaskId === item.id;

    const handlePress = () => {
      setExpandedTaskId(prevId => (prevId === item.id ? null : item.id));
    };

    return (
      <AnimatedTaskItem
        item={item}
        isExpanded={isExpanded}
        onPress={handlePress}
      />
    );
  };

  const SummaryBox: React.FC<{
    number: number;
    label: string;
    color?: string;
    onPress?: () => void;
    fullWidth?: boolean;
  }> = ({ number, label, color = '#333', onPress, fullWidth = false }) => {
    return (
      <TouchableOpacity
        style={[
          styles.summaryBox,
          fullWidth && { width: '100%' },
          { borderColor: color, borderWidth: 1 },
        ]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text style={[styles.summaryNumber, { color }]}>{number}</Text>
        <Text style={[styles.summaryLabel, { color }]}>{label}</Text>
      </TouchableOpacity>
    );
  };  

  return (
<SafeAreaView style={styles.container}>
  <HeaderComponent
    title="My Tasks"
    leftIcon={<Icon name="menu" size={24} color="#000" />}
    rightIcon={<Icon name="log-out-outline" size={24} color="#000" />}
    onLeftPress={() => navigation.openDrawer()}
    onRightPress={() => console.log('Logout')}
  />

  <View style={styles.contentContainer}>
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <SummaryBox number={totalTasks} label="Total" color="#6c5ce7" />
        <SummaryBox number={completedTasks} label="Completed" color="#00b894" />
      </View>
      <SummaryBox number={pendingTasks} label="Pending" color="#fdcb6e" fullWidth />
    </View>

    {tasks.length > 0 && (
      <>
        <Text style={styles.header}>Today</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </>
    )}
  </View>

  <Animated.View style={[styles.fab, { transform: [{ scale: fabScale }] }]}>
    <TouchableOpacity onPress={pressFab}>
      <MaterialIcons name="add" size={28} color="#fff" />
    </TouchableOpacity>
  </Animated.View>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 16, 
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 5,
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  taskCompleted: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6c5ce7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default HomeScreen;
