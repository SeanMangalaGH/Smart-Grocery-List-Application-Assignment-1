import { useGrocery } from "@/contexts/GroceryContext";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const styles = createStyles(colors);
  const { categories, items, units } = useGrocery();

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(category) => category.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      ></FlatList>

      <Text>Hello world!</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>toggle the mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.bg,
    },
    content: {
      fontSize: 22,
    },
  });
  return styles;
};
