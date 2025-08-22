import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models: {
      expense: Model,
    },

    seeds(server) {
      // Load from localStorage if available, otherwise use default seeds
      const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [
        { id: 1, title: 'Groceries', amount: 50, category: 'Food', account: 'Cash', note: 'Weekly vegetables' },
        { id: 2, title: 'Internet', amount: 75, category: 'Utilities', account: 'Bank', note: 'Monthly bill' }
      ];

      savedExpenses.forEach(expense => server.create('expense', expense));
    },

    routes() {
      this.namespace = 'api';

      // GET all expenses
      this.get('/expenses', (schema) => {
        return schema.expenses.all();
      });

      // GET single expense by id
      this.get('/expenses/:id', (schema, request) => {
        const id = request.params.id;
        return schema.expenses.find(id);
      });

      // POST new expense
      this.post('/expenses', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const expense = schema.expenses.create(attrs);

        // Save updated list to localStorage
        const allExpenses = schema.expenses.all().models.map(e => e.attrs);
        localStorage.setItem('expenses', JSON.stringify(allExpenses));

        return expense;
      });

      // PUT update expense by id
      this.put('/expenses/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        const expense = schema.expenses.find(id);
        expense.update(attrs);

        // Save updated list to localStorage
        const allExpenses = schema.expenses.all().models.map(e => e.attrs);
        localStorage.setItem('expenses', JSON.stringify(allExpenses));

        return expense;
      });

      // DELETE expense
      this.delete('/expenses/:id', (schema, request) => {
        const id = request.params.id;
        const expense = schema.expenses.find(id);
        expense.destroy();

        // Save updated list to localStorage
        const allExpenses = schema.expenses.all().models.map(e => e.attrs);
        localStorage.setItem('expenses', JSON.stringify(allExpenses));

        return { message: 'Expense deleted successfully' };
      });
    },
  });
}
