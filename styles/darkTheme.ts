import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* Layout */
  container: {
    flex: 1,
    backgroundColor: "#081024ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  scrollView: {
    width: "100%",
    flex: 1,
    backgroundColor: "#081024ff",
  },
  contentContainerStyle: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    flexGrow: 1,
    alignItems: "center",
  },

  /* Text */
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    userSelect: "none",
  },
  text: {
    color: "#cbd5f5",
    fontSize: 16,
    marginBottom: 10,
    userSelect: "none",
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 18,
    marginBottom: 10,
    userSelect: "none",
  },
  link: {
    color: "#06275cff",
    textDecorationLine: "underline",
    userSelect: "none",
  },

  /* Buttons */
  button: {
    backgroundColor: "#042f8bff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    margin: 5,
    borderWidth: 2,
    borderColor: "#4ca0ffff",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    userSelect: "none",
  },

  /* Secondary / outline button */
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  secondaryButtonText: {
    color: "#83bae6ff",
    fontSize: 16,
    fontWeight: "600",
    userSelect: "none",
  },

  /* Cards / surfaces */
  card: {
    backgroundColor: "#020617",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginVertical: 8,
  },
  projectCard: {
    backgroundColor: "#0a1a2eff",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    minWidth: "100%",
    marginBottom: 12,
    outlineColor: "#1e293b",
    outlineWidth: 2,
  },

  /* Inputs */
  input: {
    backgroundColor: "#020617",
    color: "#aeaeaeff",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    marginBottom: 16,
    userSelect: "contain",
    maxWidth: 400,
  },

  /* Dropdown */
  dropdown: {
    flex: 1,
    height: 50,
    backgroundColor: "#020617",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    paddingHorizontal: 12,
  },
  popupContainer: {
    backgroundColor: "#020617",
    borderColor: "#1e293b",
    borderWidth: 1,
    borderRadius: 12,
  },
});
