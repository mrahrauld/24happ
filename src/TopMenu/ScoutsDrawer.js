import React from 'react';
import './Drawers.css';

import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Delete from '@material-ui/icons/Delete';



export default function ScoutDrawer(side,toggleDrawer,scouts,update_scouts){
  const [scoutToAdd, setScoutToAdd] = React.useState('');
  const [scoutToDelete, setScoutToDelete] = React.useState('');

  const handleAddChange = event => {
    setScoutToAdd(event.target.value);
  };
  const handleAddClick = event => {
    add_scout(scoutToAdd)
    setScoutToAdd('');

  };

  const handleDeleteChange = event => {
    setScoutToDelete(event.target.value);
  };
  const handleDeleteClick = event => {
    delete_scout(scoutToDelete)
  };

  const add_scout = (newScout) => {
    let newScouts = scouts;
    if (newScouts.includes(newScout)){
      return;
    }
    newScouts.push(newScout)
    update_scouts(newScouts)
  }
  const delete_scout = (newScout) => {
    let newScouts = scouts;
    var index = newScouts.indexOf(newScout);
    if (index !== -1) {
      newScouts.splice(index, 1);
      update_scouts(newScouts);
    }
    setScoutToDelete('');
  } 
  return(
    <div
      className= "drawer"
      role="presentation"
    >
      <div
        className = "addScout">
        <Fab color="primary" onClick={handleAddClick}>
          <Add/>
        </Fab>
        <TextField 
          className = "textField"
          id="standard-basic" 
          label="Nom du Scout" 
          color="primary"
          value={scoutToAdd}
          onChange={handleAddChange} />
      </div>
      <div
        className = "deleteScout">
        <Fab color="primary" onClick={handleDeleteClick}>
            <Delete/>
        </Fab>
        <FormControl style={{minWidth: 120}}>
          <InputLabel id="demo-simple-select-label">Choose scout</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={scoutToDelete}
            onChange={handleDeleteChange}
            autoWidth = {true}
          >
            {scouts.map(name => (
              <MenuItem key={name} value={name} >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
};


