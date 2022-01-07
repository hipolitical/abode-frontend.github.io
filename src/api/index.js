import axios from 'axios';
import {
  STATUS_APPROVED,
  STATUS_DENIED,
  STATUS_REQUESTED,
} from '../utils/consts';

const BASE_URL = 'http://20.97.151.40:8080';

function getSingleAccount(id) {
  return axios
    .get(`${BASE_URL}/trading_partners/${id}`)
    .then((res) => {
      return res.data;
    })
}

function getUserInfo(id) {
  return axios
  .get(`${BASE_URL}/users/${id}`)
  .then((res) => {
    return res.data;
  })
}

function grantAccess(info) {
  const { requestedById, requesterId, targetId } = info

  return axios
    .put(
      `${BASE_URL}/users/${requestedById}/related/affiliations`,
      {
        "requester_id": requesterId,
        "target_id": targetId,
      }
    )
    .then((res) => {
      return res.data;
    })
}

function getAllAccounts(params) {
  const query = params?.query || '';
  const limit = params?.limit || 10;
  const page = params?.page || 0;
  const userId = params.userId;

  return Promise.all([
    axios.get(`${BASE_URL}/trading_partners/search?query=${query}&page=${page + 1}&limit=${limit}&all_fields=true`),
    axios.get(`${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_APPROVED}`),
    axios.get(`${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_REQUESTED}`),
  ]).then((res) => {
    const responseItems = res[0].data?.items || [];
    const approvedIds = (res[1].data?.items || []).map(item => item.id);
    const requestIds = (res[2].data?.items || []).map(item => item.id);
    const rows = responseItems.map((item, index) => ({
      ...item,
      companyType: 'Insured',
      entityType: 'Investment Manager',
      role: 'Injured',
      legalStatus: 'In Rehab/Supervision',
      requesterName: 'Mike Dibble',
      requesterEmail: 'mikedibble@guycarp.com',
      requestedDate: '11/27/2021',
      status: approvedIds.includes(item.id) ? STATUS_APPROVED
        : requestIds.includes(item.id) ? STATUS_REQUESTED : STATUS_DENIED,
    }));
    return {
      headers: [
        { label: 'Name', field: 'legal_name', isLink: true },
        { label: 'Company Type', field: 'companyType' },
        { label: 'Entity Type', field: 'entityType' },
        { label: 'Role', field: 'role' },
        { label: 'Legal Status', field: 'legalStatus' },
      ],
      count: res[0].data?.count || 0,
      rows,
    };
  });
}

function getMyAccounts(params) {
  const userId = params.userId;
  const query = params?.query || '';
  const limit = params?.limit || 10;
  const page = params?.page || 0;
  return axios
    .get(`${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_APPROVED}`)
    .then((res) => {
      const responseItems = res.data?.items || [];
      const rows = responseItems
      .map((item) => ({
        ...item,
        companyType: 'Insured',
        entityType: 'Investment Manager',
        role: 'Injured',
        legalStatus: 'In Rehab/Supervision',
        requesterName: 'Mike Dibble',
        requesterEmail: 'mikedibble@guycarp.com',
        requestedDate: '11/27/2021',
      }));
      return {
        headers: [
          { label: 'Name', field: 'display_name', isLink: true },
          { label: 'Role', field: 'role' },
          { label: 'Requester', field: 'requesterName' },
          { label: 'Email', field: 'requesterEmail' },
          { label: 'Requested', field: 'requestedDate' },
        ],
        rows,
      };
    });
}

function getRequests(params) {
  const userId = params.userId;
  const query = params?.query || '';
  const limit = params?.limit || 10;
  const page = params?.page || 0;
  const userType = params.userType;
  const endpointUrl = userType === 'admin' ?
    `${BASE_URL}/users/admin/affiliations?status=${STATUS_REQUESTED}`
    : `${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_REQUESTED}`;
  const headers = userType === 'admin' ? {
    "user-id": userId,
  } : {}

  return axios
    .get(endpointUrl, { headers })
    .then((res) => {
      const responseItems = res.data?.items || [];
      const rows = responseItems
        .map((item, index) => ({
          ...item,
          companyType: 'Insured',
          entityType: 'Investment Manager',
          role: 'Injured',
          legalStatus: 'In Rehab/Supervision',
          requesterId: 77777,
          requesterName: 'Mike Dibble',
          requesterEmail: 'mikedibble@guycarp.com',
          requestedDate: '11/27/2021',
        }));
      return {
        headers: [
          { label: 'Name', field: 'display_name', isLink: true },
          { label: 'Role', field: 'role' },
          { label: 'Requester', field: 'requesterName' },
          { label: 'Email', field: 'requesterEmail' },
          { label: 'Requested', field: 'requestedDate' },
        ],
        rows,
      };
    });
}

function getAccountUsers(id) {
  return axios
    .get(`${BASE_URL}/trading_partners/${id}/inverse/affiliations`)
    .then((res) => {
      const responseItems = res.data?.items || [];
      const rows = responseItems
        .map((item, index) => ({
          ...item,
          role: 'Broking Lead',
          joined_date: '8/30/2021',
          canRemove: item.status === STATUS_REQUESTED
        }));
      return {
        headers: [
          { label: 'Name', field: 'display_name' },
          { label: 'Role', field: 'role' },
          { label: 'Email', field: 'email' },
          { label: 'Joined', field: 'joined_date' },
          { label: 'Status', field: 'status' },
          { label: '', field: '' },
        ],
        rows,
      };
    });
}

// Placements MOCK

function createTreatyData(id, accountId, name, year, status, published) {
  return {
    id,
    accountId,
    name,
    year,
    status,
    published,
    details: [
      {
        date: '2020-01-05',
        amount: 3,
      },
      {
        date: '2020-01-02',
        amount: 1,
      },
    ],
  };
}

const rowsTreaty = [
  createTreatyData('treaty#1', 'acc#1', 'Casualty XOL 2021', '2021', 'Open', 'No'),
  createTreatyData('treaty#2', 'acc#2', 'Financial Lines XOL', '2020', 'Closed', 'Yes'),
  createTreatyData('treaty#3', 'acc#3', 'Workers Comp Cat 2021', '2021', 'Closed', 'Yes'),
  createTreatyData('treaty#4', 'acc#4', 'Property', '2021', 'Open', 'Yes'),
  createTreatyData('treaty#5', 'acc#5', 'Property', '2020', 'Open', 'No'),
];

function getPlacements() {
  return {
    headers: [
      { label: 'Client', field: 'accountId' },
      { label: 'Treaty', field: 'name' },
      { label: 'Year', field: 'year' },
      { label: 'Status', field: 'status' },
      { label: 'Published', field: 'published' },
    ],
    rows: rowsTreaty,
  };
}

export {
  getSingleAccount,
  getUserInfo,
  grantAccess,
  getMyAccounts,
  getAllAccounts,
  getRequests,
  getAccountUsers,
  getPlacements,
}