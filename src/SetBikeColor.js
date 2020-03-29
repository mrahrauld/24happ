'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SwatchesPicker } from 'react-color'
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';


// import './Drawers.css';
import './App.css';

class SetBikeColor extends React.Component {
  constructor(props) {
    super(props);

    //: getInitialState() method
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
  }
  getcolor = (rgb) => {
      // const {r,g,b,a} = this.state.color;
      const {r,g,b,a} = rgb;
      return "rgba("+r+','+g+','+b+','+a+')';
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    this.setState({ displayColorPicker: false })
    this.props.updateBikeColor(this.getcolor(color.rgb),this.props.b_index)
  };

  render() {
    return (
      <div>
        <IconButton color="primary" onClick={this.handleClick}>
            <DirectionsBikeIcon
                style= {{ 
                    color: this.props.color,
                    fontSize: '1em',
                }}
            />
        </IconButton>
        {/* <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div> */}
        {this.state.displayColorPicker ? <div className="popover">
            <div className="cover" onClick={ this.handleClose }/>
            <SwatchesPicker color={ this.state.color } onChange={ this.handleChange } width = {130}/>
        </div> : null }

      </div>
    )
  }
}

export default SetBikeColor