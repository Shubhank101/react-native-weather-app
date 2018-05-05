import {StyleSheet} from 'react-native';

export default style = StyleSheet.create({
  gestureContainer: {
    flex:1,

  },

  container: {
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:30,
    paddingRight:30,
  },

  navBarRightButton: {
    color:"white",
    fontSize: 19,
    paddingRight:8,
  },
  
  stack:{
    margin:10,
    top:0,
    flex:0.2,
    width:'100%',
  },


  stackInsideWrapperview: {
    width:'100%',
    height:'100%',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255, 255, 255, 0.3)'
  },

  cityTitle: {
    fontSize:22, color:"white"
  },

  cityWeatherInfo: {
    fontSize:70,
    color:"white"
  }

});
