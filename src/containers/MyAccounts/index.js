import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import TableList from '../../components/TableList';
import SearchInput from '../../components/SearchInput';
import { getMyAccounts } from '../../store/actions/my_accounts';
import { getCurrentUserId } from '../../utils/functions';
import { filterBySearchKeyword } from '../../utils/helpers';

function MyAccounts() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.accounts);
  const [searchKeyword, setSearchKeyword] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(0)
  const availableData = filterBySearchKeyword(accountsData.accounts, searchKeyword)

  React.useEffect(() => {
    dispatch(getMyAccounts({
      userId: getCurrentUserId(),
      limit: pageSize,
      page: pageNumber,
    }));
  }, [dispatch, pageSize, pageNumber]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <SearchInput
          value={searchKeyword}
          placeholder="Search my accounts"
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
          paginatedByServer
          setRowsPerPage={setPageSize}
          setPageNumber={setPageNumber}
          type="access"
        />
      </Box>
    </Container>
  );
}

export default MyAccounts;
