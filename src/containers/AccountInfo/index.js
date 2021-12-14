import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ChartView from './chart'
import { getSingleAccount } from '../../store/actions/single_account';
import {  } from '../../utils/helpers.js';

function AccountInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleAccountData = useSelector(state => state.single_account);
  const displayName = singleAccountData.single_account?.display_name;
  const attributes = singleAccountData.single_account?.attributes;
  const roles = attributes?.role &&
    attributes?.role.replaceAll(';', ', ')

  useEffect(() => {
    dispatch(getSingleAccount(id));
  }, [id, dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {displayName}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 4 }}>
          <Box sx={{ pr: 8 }}>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Last Contract Year:</b> {attributes?.last_contract_year}
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>First Contract Year:</b> {attributes?.first_contract_year}
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Entity Type:</b> {attributes?.entity_type}
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Company Type:</b> {attributes?.company_type}
            </Typography>
          </Box>
          <Box sx={{ pr: 8 }}>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Legal Status:</b> {attributes?.legal_status}
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Role:</b> {roles}
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>DUNS:</b> {attributes?.duns_number}
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>AM Best:</b> {attributes?.ambest_number}
            </Typography>
          </Box>
          <Box sx={{ pr: 8 }}>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Standard and Poor's:</b> {attributes?.standard_poors_number}
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Address:</b> {attributes?.default_address}
            </Typography>
          </Box>
        </Box>
        <Box>
          <ChartView />
        </Box>
      </Box>
    </Container>
  );
}

export default AccountInfo;
