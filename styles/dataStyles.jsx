import { StyleSheet } from "react-native";

export const dataStyles = StyleSheet.create({
  // Main container + background
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bgImage: {
    resizeMode: "cover",
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0)", // wave is visible now
  },

  // Modal & popup
  modalStyle: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",

  },
  popUpMenu: {
    backgroundColor: "rgba(230,245,255,0.95)",
    width: 350,
    height: 590,
    borderRadius: 12,
    paddingVertical: 16,
  },

  // Inputs
  salt: {
    marginHorizontal: 20,
    backgroundColor: "#e8e8e8",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  chlorine: {
    marginHorizontal: 20,
    backgroundColor: "#e8e8e8",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  PH: {
    marginHorizontal: 20,
    backgroundColor: "#e8e8e8",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  Cyanuric: {
    marginHorizontal: 20,
    backgroundColor: "#e8e8e8",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  Alkalinity: {
    marginHorizontal: 20,
    backgroundColor: "#e8e8e8",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },

  // Camera
  cameraBtn: {
    alignItems: "center",
    padding: 20,
  },
  optionText: {
    color: "#041c4a",
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  cameraMessage: {
    textAlign: "center",
    paddingBottom: 10,
    color: "#fff",
  },
  cameraPreview: {
    width: "100%",
    height: "80%",
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 10,
    borderRadius: 5,
  },

  // Upload/Save buttons
  uploadBtnWrapper: {
    alignItems: "center",
    marginVertical: 12,
  },
  uploadBtn: {
    backgroundColor: "#041c4a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 140,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  uploadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveBtnWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  saveBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#041c4a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    minWidth: 140,
    alignItems: "center",
    justifyContent: "center",
  },

  // List & items
  list: {
    flex: 1,
    backgroundColor: "transparent", // let wave show through
  },
  listItem: {
    backgroundColor: "rgba(255,255,255,0.9)", // slightly see-through
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  listText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: 160,
    marginTop: 8,
    borderRadius: 8,
    resizeMode: "cover",
  },

  // Floating Action Button
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#041c4a",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emptyContent:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});
