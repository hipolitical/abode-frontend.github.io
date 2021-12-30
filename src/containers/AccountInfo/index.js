import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ChartView from './chart'
import { getSingleAccount } from '../../store/actions/single_account';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.grey.light}`,
  backgroundColor: theme.palette.grey.lighter,
}));

const StyledContainer = styled(TableContainer)(({ theme }) => ({
  border: '1px solid rgb(224, 224, 224)',
  margin: theme.spacing(2),
  maxWidth: '480px',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

function AccountInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleAccountData = useSelector(state => state.single_account);
  const isLoading = singleAccountData.isLoading;
  const displayName = singleAccountData.single_account?.display_name;
  const attributes = singleAccountData.single_account?.attributes;
  const roles = attributes?.role &&
    attributes?.role.replaceAll(';', ', ');

  useEffect(() => {
    dispatch(getSingleAccount(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography variant="h4" color="primary" gutterBottom>
            {displayName}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate(`/accounts/${id}/edit`)}
          >
            Edit
          </Button>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <StyledBox>
          <StyledContainer aria-label="a dense table">
            <Table aria-label="collapsible table" stickyHeader>
              <TableBody>
                <TableRow>
                  <StyledTableCell>Last Contract Year:</StyledTableCell>
                  <TableCell>{attributes?.last_contract_year}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>First Contract Year:</StyledTableCell>
                  <TableCell>{attributes?.first_contract_year}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Entity Type:</StyledTableCell>
                  <TableCell>{attributes?.entity_type}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Company Type:</StyledTableCell>
                  <TableCell>{attributes?.company_type}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Role:</StyledTableCell>
                  <TableCell>{roles}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledContainer>
          <StyledContainer size="small" aria-label="a dense table">
            <Table aria-label="collapsible table" stickyHeader>
              <TableBody>
                <TableRow>
                  <StyledTableCell>Legal Status:</StyledTableCell>
                  <TableCell>{attributes?.legal_status}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>DUNS:</StyledTableCell>
                  <TableCell>{attributes?.duns_number}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>AM Best:</StyledTableCell>
                  <TableCell>{attributes?.ambest_number}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Standard and Poor's:</StyledTableCell>
                  <TableCell>{attributes?.standard_poors_number}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Address:</StyledTableCell>
                  <TableCell>{attributes?.default_address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledContainer>
        </StyledBox>
        <Box>
          <ChartView />
        </Box>
      </Box>
    </Container>
  );
}

export default AccountInfo;
