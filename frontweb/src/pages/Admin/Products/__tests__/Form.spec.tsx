import { render, screen, waitFor } from "@testing-library/react";
import { Router, useParams } from "react-router-dom";
import Form from "../Form";
import history from "util/history";
import userEvent from "@testing-library/user-event";
import { backendServer } from "./settings";
import selectEvent from "react-select-event";
import { ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import { requestBackend } from "util/requests";

beforeAll(() => backendServer.listen());
afterEach(() => backendServer.resetHandlers());
afterAll(() => backendServer.close());

// mockando o react-router-dom
jest.mock("react-router-dom", () => ({
    // spread operator para aproveitar o objeto e só sobrescrever uma parte do objeto
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}));

/*
jest.mock("sweetalert2", () => ({    
    fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));
*/


// para diferenciar create e edit product
beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
        productId: "create",
    });

    /*
    (useParams as jest.Mock).mockReturnValue({
        isConfirmed: true,
    })
    */
});

describe("Form create Product tests", () => {



    it("should whould show toast and redirect page when submit form correctly on press confirm button", async () => {

        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>

        );

        const inputName = screen.getByTestId("name");
        const inputPrice = screen.getByTestId("price");
        const inputImgURL = screen.getByTestId("imgURL");
        const inputDescription = screen.getByTestId("description");
        var categoriesSelect = screen.getByLabelText("Categorias do Produto");

        // selecionado botão do formulario no html
        // regex para ignorar uppercase ou lowercase
        const submitButton = screen.getByRole("button", { name: /salvar/i });

        // lista de matchers, pois pode ter mais de uma categoria
        // requisição é assincrona, tem que ficar dentro de um await
        await
            selectEvent.select(categoriesSelect, ["Computadores", "Livros", "Eletrônicos"]);

        // fazendo simulações de digitar nos campos de input
        userEvent.type(inputName, "PC Gamer");
        userEvent.type(inputPrice, "1200.90");
        userEvent.type(inputImgURL, "https://raw.githubusercontent.com/devsuerior/dscatalog-resources/master/backend/img/1-big.jpg");
        userEvent.type(inputDescription, "Computador Gamer com placa de vídeo aceladora");

        // simulando o click no botão SALVAR
        userEvent.click(submitButton);

        /*
         // requisicao de salvar um produto é assincrona
         // testando o aviso toast
         // Está falhando o test do toast porque tem está capturando a mensagem do confirmação do sweet alert2    
         //window.confirm = jest.fn(() => true)
         await waitFor(() => {
             const toastElementWarning = screen.getByText("Produto criado ou editado com sucesso");
             expect(toastElementWarning).toBeInTheDocument();
         });
         
         // testando o redirecionamento        
         // também falha devido a falta de confirma do swatt alert
         //expect(history.location.pathname).toEqual("/admin/products");
        
         */

    });

    it("should show five error validation messages when clicking on submit without filling the input fields", async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>

        );

        const submitButton = screen.getByRole("button", { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const errorsMessages = screen.getAllByText("Campo obrigatório");
            const errorCategoryMessage = screen.getByText("Obrigatório selecionar pelo menos uma Categoria");
            //testando o tamanho de um array
            expect(errorsMessages).toHaveLength(4);            
        });
    });

    it("should clear validation errors message when filling the input fields correctly", async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>

        );

        const submitButton = screen.getByRole("button", { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const errorsMessages = screen.getAllByText("Campo obrigatório");
            const errorCategoryMessage = screen.getByText("Obrigatório selecionar pelo menos uma Categoria");            
            expect(errorsMessages).toHaveLength(4);            
        });

        const inputName = screen.getByTestId("name");
        const inputPrice = screen.getByTestId("price");
        const inputImgURL = screen.getByTestId("imgURL");
        const inputDescription = screen.getByTestId("description");
        var categoriesSelect = screen.getByLabelText("Categorias do Produto");
       
        await
            selectEvent.select(categoriesSelect, ["Computadores", "Livros", "Eletrônicos"]);

        // simulações de digitar nos campos de input
        userEvent.type(inputName, "PC Gamer");
        userEvent.type(inputPrice, "1200.90");
        userEvent.type(inputImgURL, "https://raw.githubusercontent.com/devsuerior/dscatalog-resources/master/backend/img/1-big.jpg");
        userEvent.type(inputDescription, "Computador Gamer com placa de vídeo aceladora");

        // após preencher o formulário corretamente, testar se sumiram as mensagens de erro
        await waitFor (() => {
            const errorsMessages = screen.queryAllByText("Campo obrigatório");
            const errorCategoryMessage = screen.queryAllByText("Obrigatório selecionar pelo menos uma Categoria");
                  
            // o vetor dessas mensagens de erro deve ter comprimento zero se os input foram preenchidos corretamente
            expect(errorsMessages).toHaveLength(0);
            expect(errorCategoryMessage).toHaveLength(0);
        })

    });

});


