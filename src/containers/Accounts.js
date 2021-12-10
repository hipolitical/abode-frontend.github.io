import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

import AutoComplete from '../components/AutoComplete';
import TabPanel from '../components/TabPanel';
import AccountsTable from './AccountsTable';
import AllAccountsTable from './AllAccountsTable';
import AddEditModal from './AccountsTable/modal';
import {
  getMyClients,
  addClientAccount,
  updateClientAccount,
} from '../store/actions/accounts'
import { getAllAccounts } from '../store/actions/all_accounts'

function Accounts() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentAccount, setCurrentAccount] = React.useState(null);
  const [openAccountModal, setOpenAccountModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(getMyClients());
  }, [dispatch]);

  const accountsData = useSelector(state => state.accounts);
  const allAccountsData = useSelector(state => state.all_accounts);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 1) {
      dispatch(getAllAccounts());
    }
  };

  const handleClickOpenAccountModal = () => {
    setOpenAccountModal(true);
  };

  const handleCloseAccountModal = () => {
    setOpenAccountModal(false);
    setCurrentAccount(null);
  };

  const handleAccountInfoSubmit = (values) => {
    if (values.id || currentAccount) {
      dispatch(updateClientAccount(values));
    } else {
      dispatch(addClientAccount(values));
    }
    handleCloseAccountModal()
  }

  const handleOpenEdit = (rowData) => {
    setCurrentAccount(rowData);
    setOpenAccountModal(true);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        {accountsData.accounts && (
          <AutoComplete suggestions={accountsData.accounts} />
        )}
      </Box>
      <Box sx={{ mt: 8 }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
        >
          <Tab
            value={0}
            label="My Accounts"
            wrapped
          />
          <Tab
            value={1}
            label="All Accounts"
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
            <Button variant="outlined" onClick={handleClickOpenAccountModal}>
              Add a new client
            </Button>
          </Box>
          <AccountsTable
            rows={accountsData.accounts}
            headers={accountsData.headers}
            openEdit={handleOpenEdit}
          />
          <AddEditModal
            open={openAccountModal}
            initData={currentAccount}
            handleClose={handleCloseAccountModal}
            handleSubmit={handleAccountInfoSubmit}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={1} dir={theme.direction}>
          <AllAccountsTable
            rows={allAccountsData.accounts}
            headers={allAccountsData.headers}
          />
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}

export default Accounts;
