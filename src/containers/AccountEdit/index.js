import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import TableList from '../../components/TableList';
import { getSingleAccount } from '../../store/actions/single_account';
import { getAccountUsers } from '../../store/actions/account_users';

function AccountEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5)
  const accountUsersData = useSelector(state => state.account_users);
  const singleAccountData = useSelector(state => state.single_account);
  const displayName = singleAccountData.single_account?.display_name;
  const isLoading = singleAccountData.isLoading;

  React.useEffect(() => {
    dispatch(getAccountUsers(id));
    dispatch(getSingleAccount(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {displayName}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <TableList
          rows={accountUsersData.account_users}
          headers={accountUsersData.headers}
          isLoading={accountUsersData.isLoading}
          pageSize={pageSize}
          setRowsPerPage={setPageSize}
          type="users"
        />
      </Box>
    </Container>
  );
}

export default AccountEdit;
