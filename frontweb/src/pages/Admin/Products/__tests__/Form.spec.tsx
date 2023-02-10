import { render, screen } from "@testing-library/react";
import { Router, useParams } from "react-router-dom";
import Form from "../Form";
import history from "util/history";
import userEvent from "@testing-library/user-event";

// mockando o react-router-dom
jest.mock("react-router-dom", () => ({
    // spread operator para aproveitar o objeto e só sobrescrever uma parte do objeto
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}));

// para diferenciar create e edit product
beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
        productId: "create",
    });
});

describe("Form create Product tests", () => {


    it("should render Form component and select input fields", () => {

        render(
            <Router history={history}>
                <Form />
            </Router>

        );

        const inputName = screen.getByTestId("name");
        const inputPrice = screen.getByTestId("price");
        const inputImgURL = screen.getByTestId("imgURL");
        const inputDescription = screen.getByTestId("description");
        var categoriesSelect = screen.getByLabelText("Categorias do Produto");

        // fazendo simulações de digitar nos campos de input
        userEvent.type(inputName, "PC Gamer");
        userEvent.type(inputPrice, "1200.90");
        userEvent.type(inputImgURL, "ttps://raw.githubusercontent.com/devsuerior/dscatalog-resources/master/backend/img/1-big.jpg");
        userEvent.type(inputDescription, "Computador Games com placa de vídeo aceladora");
    });

});


