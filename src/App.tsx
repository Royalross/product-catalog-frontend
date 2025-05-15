import './App.css';
import * as React from "react";
import {useEffect, useState} from "react";
import ProductList from "./ProductList";
import CategoryFilter from "./CategoryFilter";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface Category {
    id: number;
    name: string;
}

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        fetch('http://localhost:8080/api/categories')
            .then(res => {
                if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
                return res.json();
            })
            .then((data: Category[]) => setCategories(data))
            .catch(err => {
                console.error(err);
                setCategories([]); // fallback so .map won’t blow up
            });
    }, []);

    useEffect(() => {
        const baseUrl = 'http://localhost:8080/api/products';
        const url =
            selectedCategory !== null
                ? `${baseUrl}/category/${selectedCategory}`
                : baseUrl;

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`Products fetch failed: ${res.status}`);
                return res.json();
            })
            .then((data: Product[]) => setProducts(data))
            .catch(err => {
                console.error(err);
                setProducts([]); // fallback
            });
    }, [selectedCategory]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setSortOrder(e.target.value as "asc" | "desc");

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId ? Number(categoryId) : null);
    };


    const filteredProducts = products
        .filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

    return (
        <div className="container">
            <h1 className="my-4">Product Catalog</h1>

            <div className="row align-items-center mb-4">
                <div className="col-md-3 col-sm-12 mb-2">
                    <CategoryFilter
                        categories={categories}
                        onSelect={handleCategorySelect}
                    />
                </div>

                <div className="col-md-5 col-sm-12 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for products..."
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </div>

                <div className="col-md-4 mb-2">
                    <select
                        className="form-control"
                        onChange={handleSortChange}
                        value={sortOrder}
                    >
                        <option value="asc">Sort by Price: Low to High</option>
                        <option value="desc">Sort by Price: High to Low</option>
                    </select>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts}/>
            ) : (
                <h1>No products found</h1>
            )}
        </div>
    );
}

export default App;
