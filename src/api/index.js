import axios from 'axios';

const BASE_URL = 'http://20.94.2.168:8080'

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

function getSingleAccount(id) {
  return axios
    .get(`${BASE_URL}/trading_partners/${id}`)
    .then((res) => {
      return res.data;
    })
}


function getAllAccounts() {
  return axios
    .get(`${BASE_URL}/trading_partners?all_fields=true`)
    .then((res) => {
      const responseItems = res.data?.items || []
      const rows = responseItems.map((item, index) => ({
        ...item,
        companyType: 'Insured',
        entityType: 'Investment Manager',
        role: 'Injured',
        legalStatus: 'In Rehab/Supervision',
        requesterName: 'Mike Dibble',
        requesterEmail: 'mikedibble@guycarp.com',
        requestedDate: '11/27/2021',
      }))
      return {
        headers: [
          { label: 'Name', field: 'display_name', isLink: true },
          { label: 'Company Type', field: 'companyType' },
          { label: 'Entity Type', field: 'entityType' },
          { label: 'Role', field: 'role' },
          { label: 'Legal Status', field: 'legalStatus' },
        ],
        rows,
      };
    })
}

function getMyAccounts() {
  return axios
    .get(`${BASE_URL}/users/77777/related/affiliations?status=APPROVED`)
    .then((res) => {
      const responseItems = res.data || []
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
      }))
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
    })
}

function getRequests() {
  return axios
    .get(`${BASE_URL}/users/77777/related/affiliations?status=REQUESTED`)
    .then((res) => {
      const responseItems = res.data || []
      const rows = responseItems
      .map((item, index) => ({
        ...item,
        companyType: 'Insured',
        entityType: 'Investment Manager',
        role: 'Injured',
        legalStatus: 'In Rehab/Supervision',
        requesterName: 'Mike Dibble',
        requesterEmail: 'mikedibble@guycarp.com',
        requestedDate: '11/27/2021',
      }))
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
    })
}

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
  getMyAccounts,
  getAllAccounts,
  getRequests,
  getPlacements,
}