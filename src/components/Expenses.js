import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import ExpenseItem from './ExpenseItem';
import EditExpenseForm from './EditExpenseForm';

const Expenses = () => {
  const [expenses, setExpenses] = useState({});
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  useEffect(() => {
    const expensesRef = ref(database, 'expenses');
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      setExpenses(data || {});
    });
  }, []);

  const handleDelete = (id) => {
    setExpenses((prevExpenses) => {
      const newExpenses = { ...prevExpenses };
      delete newExpenses[id];
      return newExpenses;
    });
  };

  const handleEdit = (id) => {
    setEditingExpenseId(id);
  };

  const handleUpdate = (id, updatedExpense) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [id]: updatedExpense,
    }));
    setEditingExpenseId(null);
  };

  return (
    <div>
      {Object.entries(expenses).map(([id, expense]) =>
        editingExpenseId === id ? (
          <EditExpenseForm
            key={id}
            id={id}
            currentExpense={expense}
            onSubmit={handleUpdate}
          />
        ) : (
          <ExpenseItem
            key={id}
            id={id}
            expense={expense}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )
      )}
    </div>
  );
};

export default Expenses;
