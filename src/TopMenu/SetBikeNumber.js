import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import Cached from '@material-ui/icons/Cached';
import './Drawers.css';

export default function SetBikeNumber(updateBikeNumber,bikeInfos){
    const [newBikeNumber, setNewBikeNumber] = useState(bikeInfos.number);

    const handleChange = event => {
        setNewBikeNumber(event.target.value);
        updateBikeNumber(event.target.value,bikeInfos.index);
    };
    const handleClick = () => {
        updateBikeNumber(newBikeNumber,bikeInfos.index)
    }
    return(
        <div className="bikeNumberSet">
            <TextField 
            id="standard-basic" 
            label={"Numéro du vélo " + (bikeInfos.index+1).toString()}
            color="primary"
            value={newBikeNumber}
            onChange={handleChange} />
            {/* <IconButton color="primary" onClick={handleClick}>
                <Cached/>
            </IconButton> */}
      </div>
    )
}