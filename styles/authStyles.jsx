import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    imageContainer:{
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    logoWrap:{
        position: 'absolute',
        top: 120,
        alignSelf: 'center',
    },
    logo:{
        width: 200,
        height: 200,
    },
    textInputEmail:{
        alignSelf: 'center',
        marginTop: 400,
        backgroundColor: 'white',
        width: 300,
        borderRadius: 8,
        marginVertical: 6,
    },
       textInputPassword:{
       alignSelf: 'center',
       margin: 15,
       backgroundColor: 'white',
       width: 300,
       borderRadius: 8,
       marginVertical: 6,

    },
    loginBtnContainer:{
       margin: 15,
       borderRadius: 6,
       backgroundColor: 'white',
       alignSelf: 'center',
       width: 100,
       height: 20,
    },
    loginText:{
        textAlign: 'center',
    },
    signUpContainer:{
        alignSelf: 'center'
    },
    signUp:{
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 15,
    },






});