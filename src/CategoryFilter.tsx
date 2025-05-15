interface Category {
    id: number;
    name: string;
}

interface CategoryFilterProps {
    categories: Category[];
    onSelect: (categoryId: string) => void;
}

export default function CategoryFilter({categories, onSelect}: CategoryFilterProps) {
    return (
        <select
            id="categorySelect"
            className="form-control"
            onChange={(event) => onSelect(event.target.value)}
        >
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}
