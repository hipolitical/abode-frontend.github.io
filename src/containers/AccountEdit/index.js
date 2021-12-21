import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableList from '../../components/TableList';
import { getMyAccounts } from '../../store/actions/my_accounts';
import { getCurrentUserId } from '../../utils/functions';

function AccountEdit() {
  const navigate = useNavigate();
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
