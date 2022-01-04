import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableList from '../../components/TableList';
import SearchInput from '../../components/SearchInput';
import { getRequests } from '../../store/actions/requests';
import { getCurrentUserId } from '../../utils/functions';
import { filterBySearchKeyword } from '../../utils/helpers';

function Requests() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.requests);
  const [searchKeyword, setSearchKeyword] = useState('')
  const [pageSize, setPageSize] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)
  const availableData = filterBySearchKeyword(accountsData.requests, searchKeyword)
  const [openDeclineModal, setOpenDeclineModal] = useState(false)
  const [openGrantModal, setOpenGrantModal] = useState(false)

  React.useEffect(() => {
    dispatch(getRequests({
      userId: getCurrentUserId(),
      limit: pageSize,
      page: pageNumber,
    }));
  }, [dispatch, pageSize, pageNumber]);

  const handleCloseDeclineModal = () => {
    setOpenDeclineModal(false);
  };

  const handleOpenDeclineModal = () => {
    setOpenDeclineModal(true);
  }

  const handleCloseGrantModal = () => {
    setOpenGrantModal(false);
  };

  const handleOpenGrantModal = () => {
    setOpenGrantModal(true);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <SearchInput
          value={searchKeyword}
          placeholder="Search requests"
          onChange={setSearchKeyword}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <TableList
          rows={availableData}
          headers={accountsData.headers}
          totalCount={availableData.length}
          isLoading={accountsData.isLoading}
          pageSize={pageSize}
          page={pageNumber}
          setRowsPerPage={setPageSize}
          setPageNumber={setPageNumber}
          onOpenDeclineModal={handleOpenDeclineModal}
          onOpenGrantModal={handleOpenGrantModal}
          type="requests"
        />
      </Box>
      <Dialog open={openDeclineModal} onClose={handleCloseDeclineModal} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>Declining Request Modal</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure to decline access?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeclineModal}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openGrantModal} onClose={handleCloseGrantModal} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>Granting Request Modal</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure to grant access?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGrantModal}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Requests;
