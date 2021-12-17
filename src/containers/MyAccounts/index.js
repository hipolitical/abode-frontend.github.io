import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import TableList from '../../components/TableList';
import { getMyAccounts } from '../../store/actions/my_accounts';
import { getCurrentUserId } from '../../utils/functions';

function MyAccounts() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.accounts);

  React.useEffect(() => {
    dispatch(getMyAccounts(getCurrentUserId()));
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

export default MyAccounts;
