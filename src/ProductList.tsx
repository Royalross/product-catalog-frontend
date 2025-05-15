interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface ProductListProps {
    products: Product[];
}

export default function ProductList({products}: ProductListProps) {
    return (
        <div className="row">
            {products.map((product) => (
                <div className="col-lg-4 col-mid-6 col-sm-12 mb-4" key={product.id}>
                    <div className="card h-100">
                        <img alt={"Image of the products"}
                             src={product.imageUrl || 'https://placehold.co/600x400'}
                             className={"card-img-top"}/>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text"><strong>${product.price}</strong></p>

                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}
