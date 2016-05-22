import React, { Component } from 'react'

export default class Wrapper extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {};
  }

  loadAndShowComponent(){
    var that = this;
    require.ensure(['../modules/{{component_name}}'], function(require){
      that.setState({component: require('../modules/{{component_name}}')})
    });
  }

  componentWillMount(){
    this.loadAndShowComponent()
  }

  render() {
    if(!this.state.component){
      return (
        <div>
          This is a placeholder
        </div>
      )
    }
    else{
      return <this.state.component />
    }

  }
}