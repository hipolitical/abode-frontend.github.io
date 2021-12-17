import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import TableList from '../../components/TableList';
import { getAllAccounts } from '../../store/actions/all_accounts';

function Accounts() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.all_accounts);

  React.useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <TableList
          rows={accountsData.accounts}
          headers={accountsData.headers}
          isLoading={accountsData.isLoading}
          type="access"
        />
      </Box>
    </Container>
  );
}

export default Accounts;
