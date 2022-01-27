import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ActionModal from '../../components/ActionModal';
import TableList from '../../components/TableList';
import SearchInput from '../../components/SearchInput';
import { getRequests, grantAccess, declineAccess } from '../../store/actions/requests';
import { getCurrentUserId, getCurrentUserType } from '../../utils/functions';
import { filterBySearchKeyword } from '../../utils/helpers';
import { isAdmin } from '../../utils/functions';
import './style.css';

function Requests() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.requests);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const availableData = filterBySearchKeyword(accountsData.requests, searchKeyword);
  const [openDeclineModal, setOpenDeclineModal] = useState(false);
  const [openGrantModal, setOpenGrantModal] = useState(false);
  const [currentParams, setCurrentParams] = useState({});

  React.useEffect(() => {
    dispatch(getRequests({
      userId: getCurrentUserId(),
      userType: getCurrentUserType(),
      limit: pageSize,
      page: pageNumber,
    }));
  }, [dispatch, pageSize, pageNumber]);

  const handleCloseDeclineModal = () => {
    setOpenDeclineModal(false);
  };

  const handleOpenDeclineModal = (params) => {
    setOpenDeclineModal(true);
    setCurrentParams(params);
  }

  const handleCloseGrantModal = () => {
    setOpenGrantModal(false);
  };

  const handleOpenGrantModal = (params) => {
    setOpenGrantModal(true);
    setCurrentParams(params);
  }

  const handleGrantAction = () => {
    if (currentParams) {
      dispatch(grantAccess({
        requesterId: getCurrentUserId(),
        ...currentParams,
      }));
    }
  }

  const handleDeclineAction = () => {
    if (currentParams) {
      dispatch(declineAccess({
        requesterId: getCurrentUserId(),
        ...currentParams,
      }));
    }
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
          type={isAdmin() ? "requests" : "my_requests"}
        />
      </Box>
      <ActionModal
        isOpenModal={openDeclineModal}
        modalTitle="Declining Request"
        questionMessage={`Are you sure you want to decline access to <b>${currentParams.targetName}</b> to <br/><b>${currentParams.targetName}</b>?`}
        successMessage={`<b>${currentParams.targetName}</b><br />The create request has been sent.`}
        handleDispatch={handleDeclineAction}
        onCloseModal={handleCloseDeclineModal}
      />
      <ActionModal
        isOpenModal={openGrantModal}
        modalTitle="Granting Request"
        questionMessage={`Are you sure you want to grant access to <b>${currentParams.targetName}</b> to <br/><b>${currentParams.targetName}</b>?`}
        successMessage={`<b>${currentParams.targetName}</b><br />The create request has been sent.`}
        handleDispatch={handleGrantAction}
        onCloseModal={handleCloseGrantModal}
      />
    </Container>
  );
}

export default Requests;
