import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import TableList from '../../components/TableList';
import { getSingleAccount } from '../../store/actions/single_account';
import { grantAccess } from '../../store/actions/requests';
import { getAccountUsers, getAllUsers } from '../../store/actions/account_users';
import { getCurrentUserId } from '../../utils/functions';
import AddNewUserModal from './NewUserModal';

function AccountEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [openNewUserModal, setOpenNewUserModal] = React.useState(false);
  const [usersToAdd, setUsersToAdd] = useState(null)

  const accountUsersData = useSelector(state => state.account_users);
  const singleAccountData = useSelector(state => state.single_account);
  const displayName = singleAccountData.single_account?.display_name;
  const allUsersData = accountUsersData.all_users;
  const availableUsers = allUsersData.filter(user =>
    !accountUsersData.account_users
      .map(item => item.id)
      .includes(user.id)
  );
  const isLoading = singleAccountData.isLoading;

  React.useEffect(() => {
    dispatch(getAccountUsers(id));
    dispatch(getSingleAccount(id));
    dispatch(getAllUsers());
  }, [dispatch, id]);

  const handleOpenNewUserModal = () => {
    setOpenNewUserModal(true);
  }

  const handleCloseNewUserModal = () => {
    if (!usersToAdd) {
      setOpenNewUserModal(false);
    }
  }

  const handleForceCloseModal = () => {
    setOpenNewUserModal(false);
  }

  const handleChangeValue = (e, value) => {
    setUsersToAdd(value);
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  const handleGrantAction = () => {
    if (usersToAdd) {
      dispatch(grantAccess({
        requesterId: getCurrentUserId(),
        requestedById: usersToAdd?.id,
        targetId: id,
      }));
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6, mb: 4 }}>
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
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          Membership List
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenNewUserModal}
        >
          Add New User
        </Button>
      </Box>
      <AddNewUserModal
        open={openNewUserModal}
        displayName={displayName}
        value={usersToAdd}
        handleClose={handleCloseNewUserModal}
        handleForceClose={handleForceCloseModal}
        data={availableUsers}
        onChange={handleChangeValue}
        handleAdd={handleGrantAction}
        property="display_name"
      />
      <Box>
        <TableList
          rows={accountUsersData.account_users}
          headers={accountUsersData.headers}
          totalCount={accountUsersData.account_users.length}
          isLoading={accountUsersData.isLoading}
          pageSize={pageSize}
          page={pageNumber}
          setRowsPerPage={setPageSize}
          setPageNumber={setPageNumber}
          type="users"
        />
      </Box>
    </Container>
  );
}

export default AccountEdit;
