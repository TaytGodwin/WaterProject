import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void; // Says what type of value we are going to recieve and it won't return anything
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      // This gets all category types
      try {
        const response = await fetch(
          'https://thankful-coast-074415f1e.6.azurestaticapps.net/api/Water/GetProjectTypes'
        );
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error('error fetching categories', error);
      }
    };

    fetchCategories(); // Call the function
  }, []);

  // Function to use in this component
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    // See which boxes are checked
    const updatedCategory = selectedCategories.includes(target.value) // Set if checked box is in list
      ? selectedCategories.filter((x) => x !== target.value) // if it is in list, filter out anything not equal to the target value
      : [...selectedCategories, target.value]; // If it is not already in the list, add to list

    // Update the selected categories (in parent)
    setSelectedCategories(updatedCategory);
  }

  return (
    <>
      <div className="category-filter">
        <h5>Project Types:</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange}
              />
              {/*Each checkbox will get this function*/}
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default CategoryFilter;
