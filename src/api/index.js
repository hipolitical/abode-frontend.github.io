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

const rowsAccount = [
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


function getAccounts() {
  return {
    headers: ['Name', 'LOB', 'Program'],
    rows: rowsAccount,
  };
}

function getPlacements() {
  return {
    headers: ['Client', 'Treaty', 'Year', 'Status', 'Published'],
    rows: rowsTreaty,
  };
}

export {
  getAccounts,
  getPlacements,
}