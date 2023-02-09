import { screen, render } from "@testing-library/react";
import Pagination from "..";


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
});