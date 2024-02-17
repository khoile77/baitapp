// BAI1
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  })
  .then(data => {
    data.forEach(user => {
      console.log(`ID: ${user.id}, Name: ${user.name}, Username: ${user.username}, Email: ${user.email}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
 // BAI2
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  })
  .then(data => {
    const table = new Table({
      columns: [
        { name: 'Name', alignment: 'left' },
        { name: 'Email', alignment: 'left' },
        { name: 'Address', alignment: 'left' },
        { name: 'Company', alignment: 'left' },
      ],
      hexWidth: 4,
      drawHorizontalLine: () => '',
    });

    data.forEach(user => {
      const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;
      const company = user.company.name;
      table.push([user.name, user.email, address, company]);
    });

    console.log(table.toString());
  })
  .catch(error => {
    console.error(error);
  });


function Table(options) {
  this.columns = options.columns || [];
  this.cellWidths = [];
  this.cellHeights = [];
  this.rows = [];
  this.hexWidth = options.hexWidth || 1;
  this.drawHorizontalLine = options.drawHorizontalLine || this.defaultDrawHorizontalLine;

  this.columnNames = this.columns.map(column => column.name);
  this.columnWidths = this.columnNames.map(() => 1);

  this.init();
}

Table.prototype.init = function () {
  this.cellWidths = this.columnNames.map(() => 1);
  this.cellHeights = [1];
};

Table.prototype.push = function (cells, rowSpan) {
  cells = cells || [];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (typeof cell !== 'string') {
      throw new TypeError('Cells must be strings.');
    }

    const columnIndex = this.columns.findIndex(column => column.name === this.columnNames[i]);
    const columnWidth = this.cellWidths[columnIndex];

    if (cell.length > columnWidth) {
      this.cellWidths[columnIndex] = cell.length;
    }
  }

  this.rows.push({ cells, rowSpan });
  this.cellHeights.push(this.rows.length);
};

Table.prototype.toString = function () {
  let output = '';

  this.rows.forEach((row, rowIndex) => {
    row.cells.forEach((cell, cellIndex) => {
      const columnIndex = this.columns.findIndex(column => column.name === this.columnNames[cellIndex]);
      const cellWidth = this.cellWidths[columnIndex];
      const cellHeight = this.cellHeights[rowIndex];

      output += this.padCell(cell, cellWidth);

      if (cellIndex < row.cells.length - 1) {
        output += '  ';
      }
    });

    if (rowIndex < this.rows.length - 1) {
      output += '\n';
      output += this.drawHorizontalLine();
      output += '\n';
    }
  });

  return output;
};

Table.prototype.padCell = function (cell, width) {
  const padding = ' '.repeat(Math.max(width - cell.length, 0));
  return `${cell}${padding}`;
};

Table.prototype.defaultDrawHorizontalLine = function () {
  const line = '─'.repeat(this.cellWidths.reduce((a, b) => a + b, 0)) + '\n';
  return line;
};

//BAI3
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  })
  .then(data => {
    const totalUsers = data.length;
    const gmailUsers = data.filter(user => user.email.includes('gmail.com')).length;

    console.log(`Total number of users: ${totalUsers}`);
    console.log(`Number of users with a gmail.com email: ${gmailUsers}`);
  })
  .catch(error => {
    console.error(error);
  });