import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // General Containers
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Light background for overall app
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Text Styles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F', // A shade of red for titles
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 5,
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  // Form Elements
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    fontSize: 16,
    color: '#212121',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#D32F2F', // Red button
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    color: '#1976D2', // A shade of blue for links
    fontSize: 16,
  },
  // Specific list item style (can be adapted)
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  listItemText: {
    fontSize: 16,
    color: '#212121',
  },
  // Flex utilities (simplified/renamed from previous, keep as needed)
  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Removed specific colored blocks (top, middle, bottom, secondary) as they are likely for old placeholder screens
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#D32F2F', // Red accent
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
