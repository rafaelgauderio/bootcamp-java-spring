import { render, screen } from "@testing-library/react";
import { Product } from "types/product";
import ProductCard from "..";


it("shoud render ProductCard", () => {

    const testProduct: Product = {
        id: 0,
        name: "Tablet Sangung",
        description: "Tablet da Sansung",
        price: 19.9,
        imgURL: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg",
    } as Product

    const testProduct2: Product = {
        name: "Celuar Nokia",
        price: 2019.9,
        imgURL: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg",
    } as Product

    render(
        <ProductCard product={testProduct} />
    );
    render(
        <ProductCard product={testProduct2} />
    );

    // assertions
    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getByAltText(testProduct.name)).toBeInTheDocument(); // alt da imagem é o nome do produto    
    //expect(screen.getByText("19,90")).toBeInTheDocument();

    expect(screen.getByText(testProduct2.name)).toBeInTheDocument();
    expect(screen.getByAltText(testProduct2.name)).toBeInTheDocument(); // alt da imagem é o nome do produto    
    expect(screen.getByText("2.019,90")).toBeInTheDocument();

    expect(screen.getAllByText("R$")).toBeCalledTimes; // getAll e CalledTimes porque vai aparecer mais de uma vez nas renderizações





})