import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import TableList from '../../components/TableList';
import SearchInput from '../../components/SearchInput';
import { getAllAccounts } from '../../store/actions/all_accounts';
import { getCurrentUserId } from '../../utils/functions';
import { createRequest } from '../../store/actions/all_accounts';

function Accounts() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.all_accounts);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [openCreateRequestModal, setOpenCreateRequestModal] = useState(false);
  const [currentParams, setCurrentParams] = useState({});
  const [createStatus, setCreateStatus] = useState(0);
  const UNDO_LIMIT = 5;

  React.useEffect(() => {
    dispatch(getAllAccounts({
      userId: getCurrentUserId(),
      query: searchKeyword,
      limit: pageSize,
      page: pageNumber,
    }));
  }, [dispatch, searchKeyword, pageSize, pageNumber]);

  const handleOpenCreateRequestModal = (params) => {
    setOpenCreateRequestModal(true);
    setCurrentParams(params);
  }

  const handleCreateAction = () => {
    setCreateStatus(createStatus + 1);
    if (createStatus === 1 && currentParams) {
      dispatch(createRequest({
        requesterId: getCurrentUserId(),
        ...currentParams,
      }));
    }
  }

  const handleCloseCreateModal = () => {
    setOpenCreateRequestModal(false);
    setCreateStatus(0);
  };

  const handleUndoCreateAction = () => {
    setCreateStatus(0);
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }
  
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <SearchInput
          value={searchKeyword}
          placeholder="Search accounts"
          onChange={setSearchKeyword}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <TableList
          rows={accountsData.accounts}
          headers={accountsData.headers}
          totalCount={accountsData.count}
          isLoading={accountsData.isLoading}
          pageSize={pageSize}
          page={pageNumber}
          paginatedByServer
          setRowsPerPage={setPageSize}
          setPageNumber={setPageNumber}
          onOpenCreateRequestModal={handleOpenCreateRequestModal}
          type="search"
        />
      </Box>
      <Dialog open={openCreateRequestModal} onClose={handleCloseCreateModal} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>Creating Request Modal</DialogTitle>
        <DialogContent dividers>
          {createStatus === 0 &&
            <div
              dangerouslySetInnerHTML={{
              __html:
                `Are you sure you want to create request to <b>${currentParams.targetName}</b>?`
              }}
              style={{ lineHeight: '1.5rem' }}
            />
          }
          {createStatus === 1 &&
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CountdownCircleTimer
                size={60}
                strokeWidth={6}
                isPlaying={createStatus === 1}
                duration={UNDO_LIMIT}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                onComplete={handleCreateAction}
              >
                {renderTime}
              </CountdownCircleTimer>
              <Typography variant="body" sx={{ ml: 3 }}>
                You can undo this request in the remaining time.
              </Typography>
            </Box>
          }
          {createStatus === 2 &&
            <div dangerouslySetInnerHTML={{
              __html:
                `The create request has been sent.<br/><b>${currentParams.requesterName}</b> to <b>${currentParams.targetName}</b>`
              }}
              style={{ lineHeight: '1.5rem' }}
            />
          }
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            onClick={handleCreateAction}
            disabled={createStatus === 2}
          >
            {createStatus === 1 ? 'Proceed' : 'Ok'}
          </Button>
          {createStatus === 1 && (
            <Button
              variant="contained"
              type="submit"
              onClick={handleUndoCreateAction}
              disabled={createStatus !== 1}
            >
              Cancel
            </Button>
          )}
          <Button onClick={handleCloseCreateModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Accounts;
