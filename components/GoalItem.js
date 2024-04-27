import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function GoalItem(props) {
  function deleteGoalHandler() {
    props.onDeleteGoal(props.goalKey);
  }

  return (
    <TouchableOpacity onPress={deleteGoalHandler}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e08cc",
    color: "white",
  },
  goalText: {
    color: "white",
  },
});
