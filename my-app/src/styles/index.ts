import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  innerContainer: {
    width: "100%",
    maxWidth: 420, // Limite para UI mais elegante em telas grandes
    alignItems: "center",
  },

  // Texts
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#C62828",
    marginBottom: 24,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#424242",
    marginBottom: 14,
  },

  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },

  errorText: {
    color: "#D32F2F",
    fontSize: 15,
    marginBottom: 12,
    textAlign: "center",
  },

  // Inputs
  input: {
    width: "100%",
    maxWidth: 420,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    fontSize: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 1,
  },

  // Buttons
  button: {
    width: "100%",
    maxWidth: 420,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#C62828",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  linkButton: {
    marginTop: 10,
  },

  linkButtonText: {
    color: "#1976D2",
    fontSize: 16,
    fontWeight: "600",
  },

  // List items / cards
  listItem: {
    width: "80%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginVertical: 8,
    borderRadius: 14,
    justifyContent: "space-around",
    flexDirection: "row",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  listItemText: {
    fontSize: 16,
    color: "#333",
  },

  // Floating button (FAB)
  floatingButton: {
    position: "absolute",
    bottom: 28,
    right: 28,
    backgroundColor: "#C62828",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },

  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalView: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
