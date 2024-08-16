import React, { useState, useEffect } from 'react';
import { ref, remove } from 'firebase/database';
import { database } from '../firebase';

const ExpenseItem = ({ id, expense, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      const expenseRef = ref(database, `expenses/${id}`);
      await remove(expenseRef);
      onDelete(id);
      console.log("Expense successfully deleted");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <p>{expense.description} - {expense.amount} - {expense.category}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => onEdit(id)}>Edit</button>
    </div>
  );
};

export default ExpenseItem;
