import React, { useState, useEffect } from 'react';
import { ref, push, set, onValue } from 'firebase/database';
import { database } from '../firebase';
import './AddExpense.css';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from Firebase on component mount
    const expensesRef = ref(database, 'expenses');
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedExpenses = Object.entries(data).map(([id, expense]) => ({
          id,
          ...expense,
        }));
        setExpenses(loadedExpenses);
      }
    });
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = {
      amount,
      description,
      category,
    };

    try {
      const newExpenseRef = push(ref(database, 'expenses'));
      await set(newExpenseRef, newExpense);
      setAmount('');
      setDescription('');
      setCategory('Food');
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="expense-container">
      <h2>Add Daily Expense</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type="number"
          placeholder="Enter amount spent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.category}</strong>: ${expense.amount} - {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddExpense;
