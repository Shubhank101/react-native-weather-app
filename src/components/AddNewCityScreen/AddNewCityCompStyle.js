import {StyleSheet,Platform} from 'react-native';

export default style = StyleSheet.create({

  container: {
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },

  modalContainer: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:50,
    width:"100%",
    paddingLeft:30,
    paddingRight:30,
  },

  doneButtonWrapper: {
    backgroundColor:"#222",
    width:"100%",
    height:50,
    alignItems:"center",
    justifyContent:"center"
  },

  doneText: {
    fontSize:22,
    color:"white"
  },

  textInput: {
    backgroundColor:"white",
    backgroundColor:"#f00",
    width:"80%"
  }

});
