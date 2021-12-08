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

function getAccounts() {
  return {
    headers: ['Name', 'LOB', 'Program'],
    rows: rowsAccount,
  };
}

function getPlacements() {
  return {
    headers: ['Name', 'LOB', 'Program'],
    rows: rowsAccount,
  };
}

export {
  getAccounts,
  getPlacements,
}