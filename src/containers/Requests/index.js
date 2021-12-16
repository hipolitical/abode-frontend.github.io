import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import AutoComplete from '../../components/AutoComplete';
import TableList from '../../components/TableList';
import { getRequests } from '../../store/actions/requests';
import { getCurrentUserId } from '../../utils/functions';

function Requests() {
  const dispatch = useDispatch();
  const accountsData = useSelector(state => state.requests);

  React.useEffect(() => {
    dispatch(getRequests(getCurrentUserId()));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        {accountsData.requests && (
          <AutoComplete suggestions={accountsData.requests} />
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        <TableList
          rows={accountsData.requests}
          headers={accountsData.headers}
          isLoading={accountsData.isLoading}
          type="access"
        />
      </Box>
    </Container>
  );
}

export default Requests;
