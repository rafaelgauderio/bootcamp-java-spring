import { screen, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import Catalog from "..";
import history from "util/history";


it("Catalog should render Catalog with products", () => {

    render (
        <Router history={history}>
            <Catalog />
        </Router>
    );

    // retornar apenas o texto dentro do h1
    expect(screen.getByText("Catálogo de Produtos")).toBeInTheDocument();
})