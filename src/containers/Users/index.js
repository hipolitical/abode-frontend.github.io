import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import TableList from '../../components/TableList';
import { getAllAccounts } from '../../store/actions/all_accounts'

function Users() {
  const dispatch = useDispatch();
  const allAccountsData = useSelector(state => state.all_accounts);

  React.useEffect(() => {
    dispatch(getAllAccounts());
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
            rows={allAccountsData.accounts}
            headers={allAccountsData.headers}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Users;
