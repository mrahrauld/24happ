import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    height: 300,
  },
});

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  // root: {
  //   color: '#3880ff',
  //   height: 2,
  //   padding: '15px 0',
  // },
  thumb: {
    height: 8,
    width: 8,
    // boxShadow: iOSBoxShadow,
    marginTop: -4,
    marginLeft: -4,
  },
})(Slider);

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: 'Vélo 1',
  },
  {
    value: 0.5,
    label: 'Off',
  },
  {
    value: 1,
    label: 'Vélo 2',
  },
];

export default function VerticalSlider({handleChange}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* <div className={classes.root}> */}
      <div className= "slider">
        <IOSSlider
        //   orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={0.5}
          max={1}
          step={0.5}
          aria-labelledby="vertical-slider"
          track={false}
          marks
          onChange = {handleChange}
        //   marks={marks}
        />
      </div>
    </React.Fragment>
  );
}