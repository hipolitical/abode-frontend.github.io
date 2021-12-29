import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TableList from '../../components/TableList';
import SearchInput from '../../components/SearchInput';
import { getAllAccounts } from '../../store/actions/all_accounts';

function Accounts() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.all_accounts);
  const [searchKeyword, setSearchKeyword] = useState('')
  const [pageSize, setPageSize] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  React.useEffect(() => {
    dispatch(getAllAccounts({
      query: searchKeyword,
      limit: pageSize,
      page: pageNumber,
    }));
  }, [dispatch, searchKeyword, pageSize, pageNumber]);

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
          setRowsPerPage={setPageSize}
          setPageNumber={setPageNumber}
          type="access"
        />
      </Box>
    </Container>
  );
}

export default Accounts;
