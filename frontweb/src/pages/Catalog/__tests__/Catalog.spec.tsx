import { screen, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import Catalog from "..";
import history from "util/history";
import { serverBackend } from "./settings";


// chamando o servidor mockando para não depender do backend
beforeAll(() => {
    serverBackend.listen();
});

afterEach(() => {
    serverBackend.resetHandlers()
});

afterAll(() => {
    serverBackend.close();
});



it("Catalog should render Catalog with no products", () => {

    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    // retornar apenas o texto dentro do h1
    expect(screen.getByText("Catálogo de Produtos")).toBeInTheDocument();

})

it("Catalog should render Catalog with products", async () => {

    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    // retornar apenas o texto dentro do h1
    expect(screen.getByText("Catálogo de Produtos")).toBeInTheDocument();
    // a exibição dos produtos depende de uma requisição ao backend. A requisição é assincrona.
    // Senão houverem espeficicações assincronas, os testes vão pegar apenas dados da renderização imediata
    // agora vai esperar o resultado da função assincrona para continuar a executar o teste
    await waitFor(() => {
        expect(screen.getByText("The Lord of the Rings"));
        expect(screen.getByText("Macbook Pro"));
        expect(screen.getByText("PC Gamer"));
    });


})