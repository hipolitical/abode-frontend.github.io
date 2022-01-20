import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TableList from '../../components/TableList';
import SearchInput from '../../components/SearchInput';
import ActionModal from '../../components/ActionModal';
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
    if (currentParams) {
      dispatch(createRequest({
        requesterId: getCurrentUserId(),
        ...currentParams,
      }));
    }
  }

  const handleCloseCreateModal = () => {
    setOpenCreateRequestModal(false);
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
      <ActionModal
        isOpenModal={openCreateRequestModal}
        modalTitle="Creating Request"
        questionMessage={`Are you sure you want to create request to <b>${currentParams.targetName}</b>?`}
        successMessage={`<b>${currentParams.targetName}</b><br />The create request has been sent.`}
        handleDispatch={handleCreateAction}
        onCloseModal={handleCloseCreateModal}
      />
    </Container>
  );
}

export default Accounts;
