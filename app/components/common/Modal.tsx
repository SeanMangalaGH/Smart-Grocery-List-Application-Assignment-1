import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
  containerStyle?: object;
  closable?: boolean;
  onPressClose?: () => void;
};

export const Modal = ({
  isOpen,
  withInput,
  containerStyle = { width: "80%" },
  closable = false,
  onPressClose,
  children,
  ...rest
}: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.modalArea, containerStyle]} pointerEvents="auto">
        {closable && (
          <TouchableOpacity style={styles.closeButton} onPress={onPressClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
        {children}
      </View>
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container} pointerEvents="auto">
      <View style={[styles.modalArea, containerStyle]}>
        {closable && (
          <TouchableOpacity style={styles.closeButton} onPress={onPressClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
        {children}
      </View>
    </View>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onPressClose}
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
    backgroundColor: "#f2f3f5",
    padding: 20,
    borderRadius: 12,
  },

  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
