import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* Layout */
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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

  /* Inputs */
  input: {
    backgroundColor: "#020617",
    color: "#f8fafc",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    marginBottom: 16,
    userSelect: "contain",
  },
});
