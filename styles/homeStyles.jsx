import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    inputPoolSize:{
        height: 40,
        margin: 16,
        marginTop: 50, 
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    inputSaltAdded:{
        height: 40,
        margin: 16,
        marginTop: 20, 
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    inputChlorineAdded:{
        height: 40,
        margin: 16,
        marginTop: 20, 
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    inputPhLevels:{
        height: 40,
        margin: 16,
        marginTop: 20, 
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    inputAcid:{
        height: 40,
        margin: 16,
        marginTop: 20, 
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    inputAlkinity:{
        height: 40,
        margin: 16,
        marginTop: 20, 
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    btnWrapper:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    calculateDosagesBtn:{
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        width: 200,
    },
    results: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    // optional shadow (iOS + Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  resultLabel: {
    fontSize: 16,
    fontWeight: '500',
  },

  resultValue: {
    fontSize: 16,
  },


})