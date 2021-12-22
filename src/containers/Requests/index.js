import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
  const availableData = filterBySearchKeyword(accountsData.requests, searchKeyword)

  React.useEffect(() => {
    dispatch(getRequests(getCurrentUserId()));
  }, [dispatch]);

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
          isLoading={accountsData.isLoading}
          pageSize={pageSize}
          setRowsPerPage={setPageSize}
          type="requests"
        />
      </Box>
    </Container>
  );
}

export default Requests;
