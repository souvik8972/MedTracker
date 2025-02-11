import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'


const index = () => {



const router=useRouter();

  return (
    <View style={
        {
            position:"relative"
        }
    }>
      <View>
        <Image style={{width:"100%",height:"100%",objectPosition:'top'}} source={require("../../assets/images/doctor.png")}/>
      </View>
      <View style={
        {
            padding:20,
            position:'absolute',
            bottom:0,
            height:'30%',
            width:"100%",
            borderRadius:20,
            backgroundColor:'white'
        }
      }>
        <Text style={{ fontSize:30,
            fontWeight:'bold',
            textAlign:'center',
            color:'#4361ee'
        }} >
            Stay on Track , Stay Healthy!
        </Text>
        <Text style={
            {
                textAlign:'center',
                marginTop:10,
                fontSize:16,
                color:'#4361ee'
            }
        }>
            Track Your Meds, take control of your health. Stay Consistant ,stay Confident 
        </Text>
        <TouchableOpacity onPress={()=>router.push('login/SignIn')} style={{display:"flex",justifyContent:'center',textAlign:'center',height:60 ,alignItems:'center',marginTop:20  }}>
            <Text style={{backgroundColor:"#4361ee",textAlign:'center',color:'white',fontSize:19,textAlignVertical:'center',borderRadius:99,display:'flex',alignItems:'center' ,width:'60%',height:50 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default index