import { useState } from 'react';
import { Button, StyleSheet, TextInput, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [goalKey, setGoalKey] = useState(0);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [clearGoalsIsVisible, setClearGoalsIsVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText !== '') {
      setGoalKey((prevGoalKey) => {
        return prevGoalKey + 1;
      });

      setCourseGoals((prevCourseGoals) => [
        ...prevCourseGoals,
        { key: goalKey, goal: enteredGoalText },
      ]);

      setModalIsVisible(false);
      setClearGoalsIsVisible(true);
    }
  }

  function deleteGoalHandler(goalKey) {
    setCourseGoals((prevCourseGoals) => {
      return prevCourseGoals.filter((goal) => goal.key != goalKey);
    });

    /* *****
       check for length 1 because state refresh has not been applied yet 
       if length is 1 here, that means after state is evaluated, the length
       will actually be 0 (since the above setCourseGoals is removing the last 
       and only goal 
    ***** */
    if (courseGoals.length == 1) {
      setClearGoalsIsVisible(false);
    }
  }

  function clearGoalsHandler() {
    setCourseGoals([]);
    setGoalKey(0);
    setClearGoalsIsVisible(false);
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function cancelAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#a065ec'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancelModal={cancelAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.goal}
                  onDeleteGoal={deleteGoalHandler}
                  goalKey={itemData.item.key}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.key;
            }}
          />
        </View>
        {clearGoalsIsVisible && (
          <View style={styles.clearGoalsContainer}>
            <Button
              title='Clear Goals'
              onPress={clearGoalsHandler}
              color='#f31282'
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
  },

  clearGoalsContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 36,
    paddingTop: 8,
  },

  goalsContainer: {
    flex: 13,
  },
});
