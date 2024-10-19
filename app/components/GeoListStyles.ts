import { StyleSheet } from "react-native";
import Colors from "../Colors.utils";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  listItemImage: {
    height: 30,
    width: 40,
  },
  listItemText: {
    flex: 1,
    color: Colors.black,
  },
  trashIcon: {
    height: 25,
    width: 25,
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    height: 50,
    width: 50,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.black + '34',
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
  },
  modalTitle: {
    fontWeight: '500',
    fontSize: 18,
    color: Colors.black,
    flex: 1,
  },
  closeButton: {
    backgroundColor: Colors.grey,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '500',
    transform: [{ rotate: '45deg' }],
  },
});