import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonField from "../components/common/ButtonField";

type DeleteConfirmProps = {
  header: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirm = ({
  header,
  message,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.message}>{message}</Text>
      <ButtonField title="Delete" variant="danger" onPress={onConfirm} />
      <ButtonField title="Cancel" variant="outline" onPress={onCancel} />
    </View>
  );
};

export default DeleteConfirm;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
  },

  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },

  message: {
    textAlign: "center",
    color: "#6B7280",
  },
});
