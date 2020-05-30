import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {vibrate} from './utils'
import Todo from './Todo.js'

class Count extends React.Component {
  shouldComponentUpdate(){
    return !this.props.comp
  }
  render() {
    return (
        <Text style={{ fontSize: 100 }}>{this.props.min}:{this.props.sec}</Text>
    );
  }
}

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      min : '00',
      resetprev : '00',
      sec : '00',
      isOn : false,
      completed : false,
    }
  }
  componentDidMount(){
    this.interval = setInterval(this.dec, 1000)
  }
  // componentWillUnmount() {
  // 	clearInterval(this.interval)
  // }
  dec = () => {
    // console.log(this.state.isOn & !this.state.completed)
    if(this.state.isOn & !this.state.completed){
      if(this.state.sec > 0){
        this.setState(prevState => ({ sec : String(parseInt(prevState.sec) - 1) }))
        if(parseInt(this.state.sec) < 10){
          this.setState({ sec : '0' + String(this.state.sec)  })
        }
      }
      else{
        this.setState(prevState => ({ min : String(parseInt(prevState.min) - 1), sec : '59' }))
        if(parseInt(this.state.min) < 10){
          this.setState({ min : '0' + String(this.state.min) })
        }
      }
      if(parseInt(this.state.min) == '00' && parseInt(this.state.sec) == '00' ){
        this.setState({ completed : true })
        this.setState({ isOn : false })
        // clearInterval(this.interval)
        vibrate()
      }
    }
  }
  handleReset = () => {
    this.setState(prevState => ({ min : prevState.resetprev, sec : '00' }))
    this.setState({ completed : false })
    this.setState({ isOn : false })
  }
  handlePlay = () => {
    if(parseInt(this.state.min) > '00' || parseInt(this.state.sec) > '00' ){
    this.setState({ isOn : true })
    }
    // console.log(this.state.isOn);
  }
  handlePause = () => {
    this.setState({ isOn : false })
  }
  setPomodoro = () => {
    this.setState({ min: '25', sec: '00', resetprev: '25', completed : false, isOn : false })
  }
  setShortbr = () => {
    this.setState({ min: '05', sec: '00', resetprev: '05', completed : false, isOn : false })
  }
  setLongbr = () => {
    this.setState({ min: '15', sec: '00', resetprev: '15', completed : false, isOn : false })
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.timeText}>
            <Count min={this.state.min} sec={this.state.sec} comp={this.state.completed}/>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={this.handleReset} >
         <Text> Reset </Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={this.handlePlay} >
         <Text> Play </Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={this.handlePause} >
         <Text> Pause </Text>
       </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity style={styles.button} onPress={this.setPomodoro} >
         <Text> Pomodoro </Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={this.setShortbr} >
         <Text> Short-break </Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={this.setLongbr} >
         <Text> Long-break </Text>
       </TouchableOpacity>
          </View>
          <View style={{ flex: 7 }}>
            <Todo/>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  timeText: {
		color: '#999999',
    fontSize: 150,
    alignItems: 'center',
     flex: 3,
      justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});
