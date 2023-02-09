import { screen, render } from "@testing-library/react";
import Pagination from "..";
import userEvent from "@testing-library/user-event";
import { isRegularExpressionLiteral } from "typescript";


describe("Paginations tests", () => {

    it("Pagination should render paginations icons with informed text", () => {

        const range = 5; // número de bolas do paginatios;
        const pageCount = 5;

        render(
            <Pagination range={range} pageCount={pageCount} />
        );

        // verificar se vai ter as o texto dentro das 5 bolinhas com os números das páginas
        expect(screen.getByText("1")).toBeInTheDocument;
        // apenas a primeira página deve ter o classe de link activo
        expect(screen.getByText("1")).toHaveClass("pagination-link-active");

        expect(screen.getByText("2")).toBeInTheDocument;
        expect(screen.getByText("2")).not.toHaveClass("pagination-link-active");

        expect(screen.getByText("3")).toBeInTheDocument;
        expect(screen.getByText("3")).not.toHaveClass("pagination-link-active");

        expect(screen.getByText("4")).toBeInTheDocument;
        expect(screen.getByText("4")).not.toHaveClass("pagination-link-active");

        expect(screen.getByText("5")).toBeInTheDocument;
        expect(screen.getByText("5")).not.toHaveClass("pagination-link-active");

        // número 6 não deve aparecer, queryBy não lança exeção ao não encontar o texto              
        expect(screen.queryByText("6")).not.toBeInTheDocument;
    });

    it("next arrow should call onChange to the next page", () => {

        const range = 5; // número de bolas do pagination;
        const pageCount = 5;
        const onChange = jest.fn();


        render(
            <Pagination
                range={range}
                pageCount={pageCount}
                onChange={onChange} />
        );

        const next = screen.getByTestId("arrow-next");
        userEvent.click(next);

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toBeCalledWith(1) ; // começa no zero a contagem das páginas, next = 1

    });

    it("next arrow should call onChange to the previous page", () => {

        const range = 5;
        const pageCount = 5;
        const onChange = jest.fn();
        const forcePage = 2;

        render(
            <Pagination
            forcePage={forcePage}
                range={range}
                pageCount={pageCount}
                onChange={onChange} />
        );

        const previous = screen.getByTestId("arrow-previous");
        userEvent.click(previous);        

        expect(onChange).toHaveBeenCalled();
        // para que a bolinha do previous estaja habilitada, tem que ser a partir da página 2
        // forçar ir para a página 2 e depois voltar para 1 no click previous
        expect(onChange).toBeCalledWith(1) ; 

    });

    it("page link should call onChange", () => {


        const range = 4;
        const pageCount=4;
        const onChange = jest.fn();

        render (
            <Pagination range={range} pageCount={pageCount} onChange={onChange}/>            
        ); 

        // a pagina interna é um número a menos do que mostra, se clincar no texto exibido 3 internamento é a página 2
        userEvent.click(screen.getByText("3"));
        expect(onChange).toHaveBeenCalledWith(2);
    })    

});