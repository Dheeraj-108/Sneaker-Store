import ProductForm from "@/app/components/ProductForm";

export default function NewProductPage() {
    return (
        <div className="max-w-lg">
            <h1 className="text-xl font-semibold mb-6">Add product</h1>
            <ProductForm />
        </div>
    );
}
