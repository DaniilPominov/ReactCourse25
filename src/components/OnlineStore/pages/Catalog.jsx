import { React, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SupabaseContext from "../SupabaseContext";
import { StyleContext } from "../StyleProvider";
import "../../../styles/Catalog.scss";

function Catalog() {
  const { theme } = useContext(StyleContext);
  const supabase = useContext(SupabaseContext);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select("*");

        if (error) throw error;
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchCategories();
  }, [supabase]);

  if (error) {
    return (
      <div className={`error-message ${theme}-theme`}>
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className={`catalog ${theme}-theme`}>
      <div className="container">
        <h1>Product Catalog</h1>
        
        {categories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <p>No categories found</p>
          </div>
        ) : (
          <ul className="categories-grid">
            {categories.map(category => (
              <li className="category-card" key={category.id}>
                <Link 
                  to={`/category/${category.id}`} 
                  className="category-link"
                >
                  <div className="category-content">
                    <h2 className="category-name">{category.name}</h2>
                    {category.price && (
                      <p className="category-price">
                        From ${parseFloat(category.price).toFixed(2)}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Catalog;