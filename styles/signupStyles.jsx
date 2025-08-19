import { StyleSheet } from "react-native";

export const signupStyles = StyleSheet.create ({
    title:{
        color: 'white',
        fontSize: 30,
    },
    imageContainer :{
        flex: 1,
    },
    safeArea:{
        flex:1,
    },
    screenCenter:{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',     
    },
    inputContainer:{
        width: 300,
        borderRadius: 6,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical: 8,
    },
    loginBtnWrapper:{
        borderRadius: 6,
        backgroundColor: 'white',
        width: 70,
    },
    loginText:{
        textAlign: 'center',
    },
    backToLogin:{
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 15,
    },

})