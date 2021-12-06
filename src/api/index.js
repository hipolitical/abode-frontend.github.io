function createData(name, lob, program) {
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
  createData('Jane Wilson', 'Multiple', 'Multiple'),
  createData('Kevin Ryder', 'Multiple', 'Multiple'),
  createData('Matthew Gas', 'Casualty', 'CAT XOL'),
  createData('Erik Bahena', 'Casualty', 'Multiple'),
  createData('John Doe', 'Multiple', 'CAT XOL'),
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