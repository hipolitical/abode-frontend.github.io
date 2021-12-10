import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

import AutoComplete from '../../components/AutoComplete';
import TabPanel from '../../components/TabPanel';
import TableList from '../../components/TableList';
import AddEditModal from './modal';
import {
  getPlacements,
  addPlacement,
  updatePlacement,
} from '../../store/actions/placements'

function Placements() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentPlacement, setCurrentPlacement] = React.useState(null);
  const [openPlacementModal, setOpenPlacementModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(getPlacements());
  }, [dispatch]);

  const placementsData = useSelector(state => state.placements);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleClickOpenPlacementModal = () => {
    setOpenPlacementModal(true);
  };

  const handleClosePlacementModal = () => {
    setOpenPlacementModal(false);
    setCurrentPlacement(null);
  };

  const handlePlacementInfoSubmit = (values) => {
    if (values.id || currentPlacement) {
      dispatch(updatePlacement(values));
    } else {
      dispatch(addPlacement(values));
    }
    handleClosePlacementModal()
  }

  const handleOpenEdit = (rowData) => {
    setCurrentPlacement(rowData);
    setOpenPlacementModal(true);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        {placementsData.placements && (
          <AutoComplete suggestions={placementsData.placements} />
        )}
      </Box>
      <Box sx={{ mt: 8 }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
        >
          <Tab
            value={0}
            label="My Placements"
            wrapped
          />
          <Tab
            value={1}
            label="All Placements"
            wrapped
          />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currentTab}
        onChangeIndex={handleChange}
      >
        <TabPanel value={currentTab} index={0} dir={theme.direction}>
          <Box sx={{ mb: 2 }}>
            <Button variant="outlined" onClick={handleClickOpenPlacementModal}>
              Add a new treaty
            </Button>
          </Box>
          <TableList
            rows={placementsData.placements}
            headers={placementsData.headers}
            type="editing"
            openEdit={handleOpenEdit}
          />
          <AddEditModal
            open={openPlacementModal}
            initData={currentPlacement}
            handleClose={handleClosePlacementModal}
            handleSubmit={handlePlacementInfoSubmit}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={1} dir={theme.direction}>
          <TableList
            rows={placementsData.placements}
            headers={placementsData.headers}
            type="editing"
          />
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}

export default Placements;
