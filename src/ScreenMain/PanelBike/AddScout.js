import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PostAdd from '@material-ui/icons/PostAdd';
import Fab from '@material-ui/core/Fab';
import './AddScout.css';

const ITEM_HEIGHT = 48;

export default function AddScout(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState('');
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSelect = (selected) => () => {
    setSelected(selected);
    setAnchorEl(null);
    props.waitingListAdd(selected)
  }

  return (
    <div>
      <Fab color="primary" onClick={handleClick}>
          <PostAdd                             
            style={{
              shadowColor: 'black',
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }} 
          />
      </Fab>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        // open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
            // overflow: 'auto',
          },
        }}
      >
        {/* {options.map((item,index) => (
          <MenuItem className = "scoutName" key={index} selected={index === selected} onClick={onSelect(index)}>
              {item}
          </MenuItem>
        ))} */}
        {props.scouts.map((item,index) => (
          <MenuItem className = "scoutName" key={item} selected={item === selected} onClick={onSelect(item)}>
              {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}