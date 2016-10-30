import React, { Component } from 'react'

export default class Wrapper extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {};
  }

  loadAndShowComponent(){
    var that = this;
    require.ensure([{{import_components}}], function(require){
      {{import_component_set}}
    });
  }

  componentWillMount(){
    this.loadAndShowComponent()
  }

  render() {
    if(!this.state.components || !this.state.components[this.props.route.routeId]){
      return (
        <div>
          This is a placeholder
        </div>
      )
    }
    else{
      var state = {component: this.state.components[this.props.route.routeId]};
      return <state.component {...this.props}/>
    }

  }
}