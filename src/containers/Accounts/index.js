import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import TableList from '../../components/TableList';
import SearchInput from '../../components/SearchInput';
import { getAllAccounts } from '../../store/actions/all_accounts';
import { filterBySearchKeyword } from '../../utils/helpers';

function Accounts() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.all_accounts);
  const [searchKeyword, setSearchKeyword] = useState('')
  const availableData = filterBySearchKeyword(accountsData.accounts, searchKeyword)

  React.useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

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
          rows={availableData}
          headers={accountsData.headers}
          isLoading={accountsData.isLoading}
          type="access"
        />
      </Box>
    </Container>
  );
}

export default Accounts;
