import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const verifyNewTaskTitle = tasks.find(task => task.title === newTaskTitle)
    if (!verifyNewTaskTitle) {
      const data = {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldState => [...oldState, data])
    } else {
      Alert.alert('Você não pode cadastrar um task com o mesmo nome.')
    }
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const toggleTaskDone = updatedTasks.find(task => task.id === id)

    if (!toggleTaskDone)
      return;
    toggleTaskDone.done = !toggleTaskDone.done;
    setTasks(updatedTasks)

    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ))
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})