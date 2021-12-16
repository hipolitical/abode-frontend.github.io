import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import TableList from '../../components/TableList';
import { getMyAccounts } from '../../store/actions/my_accounts'
import { getCurrentUserId } from '../../utils/functions';

function Users() {
  const dispatch = useDispatch();
  const myAccountsData = useSelector(state => state.accounts);

  React.useEffect(() => {
    dispatch(getMyAccounts(getCurrentUserId()));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Jenn Paretchan
        </Typography>
        <Typography variant="h6" color="secondary.light" gutterBottom>
          My Accounts
        </Typography>
        <Box sx={{ mt: 4 }}>
          <TableList
            rows={myAccountsData.accounts}
            headers={myAccountsData.headers}
            isLoading={myAccountsData.isLoading}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Users;
