import { StyleSheet } from "react-native";

export const dataStyles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    plusLocation:{
        alignItems:'flex-end',
        paddingTop: 700,
        paddingRight: 20,
    },
    modalStyle:{
        flex:1,
        marginTop:50,
        alignItems: 'center',
    },
    popUpMenu:{
        backgroundColor: 'white',
        width: 350,
        height: 550,
    },
    salt:{
        marginHorizontal: 20,   // <-- gives you 20px on both sides
        backgroundColor: '#e8e8e8',
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,

    },
    chlorine:{
        marginHorizontal: 20,   // <-- gives you 20px on both sides
        backgroundColor: '#e8e8e8',
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
    },
    PH:{
        marginHorizontal: 20,   // <-- gives you 20px on both sides
        backgroundColor: '#e8e8e8',
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,

    },
    Cyanuric:{
        marginHorizontal: 20,   // <-- gives you 20px on both sides
        backgroundColor: '#e8e8e8',
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,

    },
    Alkalinity:{
        marginHorizontal: 20,   // <-- gives you 20px on both sides
        backgroundColor: '#e8e8e8',
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
    },
    cameraBtn:{
        alignItems: 'center',
        padding: 30,
    },
    optionText:{
        color:'#041c4a',
        padding:10,
        fontSize: 20,
        textAlign: 'center',
    },
    uploadBtnWrapper: {
        alignItems: 'center',
        marginVertical: 16,           // space above/below
    },
    uploadBtn: {
        backgroundColor: '#041c4a',
        paddingVertical: 12,          // taller hit-area
        paddingHorizontal: 24,        // wider label space
        borderRadius: 24,             // pill shape
        minWidth: 140,                // ensure consistent width
        alignItems: 'center',
        justifyContent: 'center',

        // Android shadow
        elevation: 3,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    uploadText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    

    
})