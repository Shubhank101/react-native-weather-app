import {StyleSheet} from 'react-native';

export default style = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:30,
    paddingRight:30,
  },

  stack1:{
    margin:10,
    top:0,
    flex:0.2,
    width:'100%',
  },

  stack2:{
    width:'100%',
    margin:10,
    flex:0.2,
  },

  stack3:{
    width:'100%',
    margin:10,
    flex:0.2,
  },

  stackInsideWrapperview: {
    width:'100%',
    height:'100%',
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
