function createData(id, name, lob, program) {
  return {
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

const rows = [
  createData('acc#1', 'Jane Wilson', 'Multiple', 'Multiple'),
  createData('acc#2', 'Kevin Ryder', 'Multiple', 'Multiple'),
  createData('acc#3', 'Matthew Gas', 'Casualty', 'CAT XOL'),
  createData('acc#4', 'Erik Bahena', 'Casualty', 'Multiple'),
  createData('acc#5', 'John Doe', 'Multiple', 'CAT XOL'),
];

function getAccounts() {
  return {
    headers: ['Name', 'LOB', 'Program'],
    rows,
  };
}

export {
  getAccounts,
}