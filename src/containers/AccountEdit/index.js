import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import TableList from '../../components/TableList';
import { getMyAccounts } from '../../store/actions/my_accounts';
import { getCurrentUserId } from '../../utils/functions';

function AccountEdit() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.accounts);

  React.useEffect(() => {
    dispatch(getMyAccounts(getCurrentUserId()));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Markel Insurnace Company
        </Typography>
      </Box>
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

export default AccountEdit;
