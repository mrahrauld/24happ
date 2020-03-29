import React from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import ScoutDrawer from './ScoutsDrawer';
import SettingsDrawer from './SettingsDrawer'
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsIcon from '@material-ui/icons/Settings';
import './TopMenu.css'

export default function TopMenu({scouts,update_scouts,setEndTime,updateBikeNumber,updateBikeColor,bikesInfos}) {
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [side]: open });
    };

    return (
        <Box className="topMenu" boxShadow={4} borderRadius={0}>
            <Box className = {"topButton"}>
                <Button 
                    onClick={toggleDrawer('top', true)}
                    startIcon={<SettingsIcon />}
                    // variant="outlined"
                    variant="contained"
                    color="primary"
                    component="span"
                >
                    24H
                </Button>
                <Drawer open={state.top} onClose={toggleDrawer('top', false)}>
                    {SettingsDrawer('top',setEndTime,updateBikeNumber,updateBikeColor,bikesInfos)}
                </Drawer>
            </Box>
            <Box className = {"topButton"}>
                <Button 
                    onClick={toggleDrawer('left', true)}
                    startIcon={<SettingsIcon />}
                    // variant="outlined"
                    variant="contained"
                    color="primary"
                    component="span"
                >
                    Scouts
                </Button>
                <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                    {ScoutDrawer('left',toggleDrawer,scouts,update_scouts)}
                </Drawer>
            </Box>
        </Box>
    );
}