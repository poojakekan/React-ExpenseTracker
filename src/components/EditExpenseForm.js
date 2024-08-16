import { ref, update } from 'firebase/database';
import {React, useState} from 'react';


const EditExpenseForm = ({ id, currentExpense, onSubmit }) => {
  const [amount, setAmount] = useState(currentExpense.amount);
  const [description, setDescription] = useState(currentExpense.description);
  const [category, setCategory] = useState(currentExpense.category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseRef = ref(database, `expenses/${id}`);
      await update(expenseRef, { amount, description, category });
      onSubmit(id, { amount, description, category });
      console.log("Expense successfully updated");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
        {/* Add more options as needed */}
      </select>
      <button type="submit">Update Expense</button>
    </form>
  );
};

export default EditExpenseForm;