import { render, screen } from "@testing-library/react";
import ProductPrice from "..";


it ("shoud render ProductPrice", ()=> {
    const price = 19.9;

    render (
        <ProductPrice price={price} />
    );
    expect(screen.getByText("19,90")).toBeInTheDocument();
    expect(screen.getByText("R$")).toBeInTheDocument();
})