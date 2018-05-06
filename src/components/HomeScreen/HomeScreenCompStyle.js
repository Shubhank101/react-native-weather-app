import {StyleSheet,Platform} from 'react-native';

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
    paddingRight:8,
    paddingLeft:8,
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
    fontSize:22,
    color:"white",
    fontWeight:"bold"
  },

  cityWeatherInfo: {
    fontSize:70,
    color:"white",
    fontWeight:"100",
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined    
  },
  
  weatherView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"  
  },
  
  icon: {
    padding:10
  },
  
  
  //onboarding
  onBoardContainer: {
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#333",
    paddingLeft:30,
    paddingRight:30,
  },
  
  onboardingText:{
    fontSize:18,
    color:"white",
    textAlign:'center',
    marginBottom:10,
  },
  
  modalContainer: {
    flex:1,
    paddingTop:50,
    backgroundColor:"#333",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  }
  

});
