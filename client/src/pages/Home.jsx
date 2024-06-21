import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import RecipeCard from "../components/RecipeCard";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [recipes, setRecipe] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/recipe/get-all-recipe");
      if (data.success) {
        setRecipe(data.recipes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategroy = async () => {
    try {
      const { data } = await axiosInstance.get("/api/recipe/get-all-category");

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/recipe/delete-recipe/${id}`
      );
      if (data.success) {
        toast.success("recipe deleted successfully");
        getData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  };

  const handleFilter = async (event) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/recipe/filter/?filter=${event.target.value}`
      );
      if (data.success) {
        setRecipe(data.recipes)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axiosInstance.get(
        `/api/recipe/search-recipe/?search=${search}`
      );
      if (data.success) {
        setRecipe(data.recipe);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCategroy();
  }, []);

  return (
    <div className="mx-36 my-10">
      <Toaster />
      <div className="flex justify-between items-center border-b-2 py-3">
        <h1 className="text-2xl font-semibold text-gray-700">Recipe List</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="search"
            className="border-2 py-2 px-3 rounded-s-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-950 p-2 text-white rounded-e-full border-2">
            Search
          </button>
        </form>

        <select
          name=""
          id=""
          onChange={handleFilter}
          className="p-3 outline-none rounded-md bg-blue-900 text-white font-semibold "
        >
          <option value="">select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>

        <div>
          <button
            onClick={() => navigate("/add-category")}
            className="bg-blue-900 text-white font-semibold py-2 px-3 rounded mx-4"
          >
            Add category
          </button>
          <button
            onClick={() => navigate("/add-recipe")}
            className="bg-blue-900 text-white font-semibold py-2 px-3 rounded"
          >
            Add recipe
          </button>
        </div>
      </div>
      <div className="py-3">
        {recipes.length === 0 && (
          <div className="flex justify-center items-center text-3xl">
            No Recipes found
          </div>
        )}
        {recipes &&
          recipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              item={recipe.item}
              image={recipe.image}
              recipe={recipe.ingredient}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
