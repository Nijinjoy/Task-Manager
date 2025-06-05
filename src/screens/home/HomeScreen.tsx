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

type Task = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
};

const initialTasks: Task[] = [
  { id: '1', title: 'Finish React Native project', completed: false, description: 'Complete the React Native project by the end of the week.' },
  { id: '2', title: 'Prepare meeting notes', completed: true, description: 'Summarize key points for Monday’s meeting.' },
  { id: '3', title: 'Buy groceries', completed: false, description: 'Milk, Bread, Eggs, and Vegetables.' },
  { id: '4', title: 'Call client', completed: true, description: 'Discuss project requirements and timeline.' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [refreshing, setRefreshing] = useState(false);
  const [fabScale] = useState(new Animated.Value(1));
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const toggleTaskCompleted = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
      setRefreshing(false);
    }, 1500);
  }, []);

  // Animated Task Item Component
  const AnimatedTaskItem: React.FC<{ item: Task; isExpanded: boolean; onPress: () => void }> = ({
    item,
    isExpanded,
    onPress,
  }) => {
    const [height] = React.useState(new Animated.Value(60)); // initial height (collapsed)

    React.useEffect(() => {
      Animated.timing(height, {
        toValue: isExpanded ? 140 : 60, // height for expanded/collapsed
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
  }> = ({ number, label, color = '#333', onPress }) => {
    const [pressed, setPressed] = useState(false);

    return (
      <TouchableOpacity
        style={[
          styles.summaryBox,
          pressed && { backgroundColor: '#d0f0d0' },
          { borderColor: color, borderWidth: 1 },
        ]}
        activeOpacity={0.8}
        onPress={() => {
          setPressed(true);
          onPress && onPress();
          setTimeout(() => setPressed(false), 200);
        }}
      >
        <Text style={[styles.summaryNumber, { color }]}>{number}</Text>
        <Text style={[styles.summaryLabel, { color }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome back!</Text>

      {/* Task Summary */}
      <View style={styles.summaryContainer}>
        <SummaryBox number={totalTasks} label="Total Tasks" />
        <SummaryBox
          number={completedTasks}
          label="Completed"
          color="#4CAF50"
          onPress={() => Alert.alert('Completed Tasks', 'You completed tasks!')}
        />
        <SummaryBox
          number={pendingTasks}
          label="Pending"
          color="#F44336"
          onPress={() => Alert.alert('Pending Tasks', 'You have pending tasks!')}
        />
      </View>

      {/* Tasks List */}
      <Text style={styles.sectionTitle}>Your Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTaskItem}
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#999' }}>
            No tasks available.
          </Text>
        }
      />

      {/* Floating Add Task Button */}
      <Animated.View style={[styles.fab, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity onPress={pressFab} activeOpacity={0.7}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 6,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  taskList: {
    flexGrow: 0,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 14,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  taskCompleted: {
    backgroundColor: '#E0F7E9',
  },
  taskTitle: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  taskDescription: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});
