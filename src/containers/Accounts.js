import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import AutoComplete from '../components/AutoComplete';
import TabPanel from '../components/TabPanel';
import AccountsTable from './AccountsTable';
import { getAccounts } from '../api'

function Accounts() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [rows, setRows] = React.useState([])
  const [headers, setHeaders] = React.useState([])

  React.useEffect(() => {
    const accountsData = getAccounts()
    setRows(accountsData.rows)
    setHeaders(accountsData.headers)
  }, []);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <AutoComplete suggestions={rows} />
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
          <AccountsTable rows={rows} headers={headers} />
        </TabPanel>
        <TabPanel value={currentTab} index={1} dir={theme.direction}>
          <AccountsTable rows={rows} headers={headers} />
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}

export default Accounts;
