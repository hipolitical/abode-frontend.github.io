import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import AutoComplete from '../../components/AutoComplete';
import TabPanel from '../../components/TabPanel';
import TableList from '../../components/TableList';
import { getMyAccounts } from '../../store/actions/my_accounts';
import { getAllAccounts } from '../../store/actions/all_accounts';
import { getRequests } from '../../store/actions/requests';

function Accounts() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState(0);
  const myAccountsData = useSelector(state => state.accounts);
  const allAccountsData = useSelector(state => state.all_accounts);
  const requestsData = useSelector(state => state.requests);

  React.useEffect(() => {
    dispatch(getMyAccounts());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 1) {
      dispatch(getAllAccounts());
    } else if (newValue === 2) {
      dispatch(getRequests());
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        {allAccountsData.accounts && (
          <AutoComplete suggestions={allAccountsData.accounts} />
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
          <Tab
            value={2}
            label="Requests"
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
          <TableList
            rows={myAccountsData.accounts}
            headers={myAccountsData.headers}
            isLoading={myAccountsData.isLoading}
            type="access"
          />
        </TabPanel>
        <TabPanel value={currentTab} index={1} dir={theme.direction}>
          <TableList
            rows={allAccountsData.accounts}
            headers={allAccountsData.headers}
            isLoading={allAccountsData.isLoading}
            type="access"
          />
        </TabPanel>
        <TabPanel value={currentTab} index={2} dir={theme.direction}>
          <TableList
            rows={requestsData.requests}
            headers={requestsData.headers}
            isLoading={requestsData.isLoading}
            type="requests"
          />
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}

export default Accounts;
