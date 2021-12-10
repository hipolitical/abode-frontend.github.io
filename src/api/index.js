function createAccountData(id, name, lob, program) {
  return {
    id,
    name,
    lob,
    program,
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

const rowsClient = [
  createAccountData('acc#1', 'Jane Wilson', 'Multiple', 'Multiple'),
  createAccountData('acc#2', 'Kevin Ryder', 'Multiple', 'Multiple'),
  createAccountData('acc#3', 'Matthew Gas', 'Casualty', 'CAT XOL'),
  createAccountData('acc#4', 'Erik Bahena', 'Casualty', 'Multiple'),
  createAccountData('acc#5', 'John Doe', 'Multiple', 'CAT XOL'),
];

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

const rowsAllAccounts = [
  {
    id: 'accc1',
    name: 'Market',
    companyType: 'Company',
    entityType: 'Company',
    role: 'Client',
    legalStatus: 'Active',
    status: 'approved',
    requesterName: 'Mike Dibble',
    requesterEmail: 'mikedibble@guycarp.com',
    requestedDate: '10/31/2021',
  },
  {
    id: 'accc2',
    name: 'AIG',
    companyType: 'Branch',
    entityType: 'Other',
    role: 'Client',
    legalStatus: 'In Liquidation',
    status: 'approved',
    requesterName: 'Mike Dibble',
    requesterEmail: 'mikedibble@guycarp.com',
    requestedDate: '11/13/2021',
  },
  {
    id: 'accc3',
    name: 'Chubb',
    companyType: 'Group',
    entityType: 'Agency',
    role: 'Client',
    legalStatus: 'Liquidated',
    status: 'pending',
    requesterName: 'Mike Dibble',
    requesterEmail: 'mikedibble@guycarp.com',
    requestedDate: '08/22/2021',
  },
  {
    id: 'accc4',
    name: 'Swiss Re',
    companyType: 'Business Division',
    entityType: 'Broker',
    role: 'Market',
    legalStatus: 'In Runoff/Ceased',
    status: 'pending',
    requesterName: 'Mike Dibble',
    requesterEmail: 'mikedibble@guycarp.com',
    requestedDate: '10/15/2021',
  },
  {
    id: 'accc5',
    name: 'Goldman Sachs',
    companyType: 'Insured',
    entityType: 'Investment Manager',
    role: 'Injured',
    legalStatus: 'In Rehab/Supervision',
    status: 'unapproved',
    requesterName: 'Mike Dibble',
    requesterEmail: 'mikedibble@guycarp.com',
    requestedDate: '11/27/2021',
  },
];

function getMyClients() {
  return {
    headers: [
      { label: 'Name', field: 'name' },
      { label: 'LOB', field: 'lob' },
      { label: 'Program', field: 'program' },
    ],
    rows: rowsClient,
  };
}

function getAllAccounts() {
  return {
    headers: [
      { label: 'Name', field: 'name', isLink: true },
      { label: 'Company Type', field: 'companyType' },
      { label: 'Entity Type', field: 'entityType' },
      { label: 'Role', field: 'role' },
      { label: 'Legal Status', field: 'legalStatus' },
    ],
    rows: rowsAllAccounts,
  };
}

function getRequests() {
  return {
    headers: [
      { label: 'Name', field: 'name', isLink: true },
      { label: 'Role', field: 'role' },
      { label: 'Requester', field: 'requesterName' },
      { label: 'Email', field: 'requesterEmail' },
      { label: 'Requested', field: 'requestedDate' },
    ],
    rows: rowsAllAccounts.filter(row => row.status === 'pending'),
  };
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
  getMyClients,
  getAllAccounts,
  getRequests,
  getPlacements,
}