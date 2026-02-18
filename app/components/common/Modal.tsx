import {
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Modal as RNModal,
  StyleSheet,
  View,
} from "react-native";

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
  containerStyle?: object;
};

export const Modal = ({
  isOpen,
  withInput,
  containerStyle = { width: "80%" },
  children,
  ...rest
}: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>
      <View style={[styles.modalArea, containerStyle]}>{children}</View>
    </View>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 3,
  },

  modalArea: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
});
