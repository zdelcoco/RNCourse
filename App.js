import { useState } from "react";
import { Button, StyleSheet, TextInput, View, FlatList } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [goalKey, setGoalKey] = useState(0);

  function addGoalHandler(enteredGoalText) {
    setGoalKey((prevGoalKey) => {
      return prevGoalKey + 1;
    });

    if (enteredGoalText !== "") {
      setCourseGoals((prevCourseGoals) => [
        ...prevCourseGoals,
        { key: goalKey, goal: enteredGoalText },
      ]);
    }
  }

  function deleteGoalHandler(goalKey) {
    const newCourseGoals = courseGoals.filter((goal) => goal.key != goalKey);

    setCourseGoals(newCourseGoals);
  }

  function clearGoalsHandler() {
    setCourseGoals([]);
    setGoalKey(0);
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
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
      <View style={styles.clearGoalsContainer}>
        <Button title="Clear Goals" onPress={clearGoalsHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  clearGoalsContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 36,
    paddingTop: 8,
  },

  goalsContainer: {
    flex: 13,
  },
});
