import {StyleSheet} from 'react-native';

export default {
  container: {
    flex:1,
    backgroundColor:"#333",
    justifyContent:"center",
    alignItems:"center",
    paddingTop:64,
  },


  navCloseIcon: {
    paddingLeft:10,
  },

  headerStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  },

  listItem: {
    backgroundColor:"#bbb",
    height:50,
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:10,
  },

  listItemText: {
    fontSize:20,
  },

  deleteButtonWrapperView: {
    width:100,
    backgroundColor:"#FF0800",
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    right:0,
  },

  deleteButton: {
    color:"white",
    fontWeight:"bold"
  }
}
