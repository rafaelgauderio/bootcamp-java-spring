import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ButtonIcon from "..";

//it.only("ButtonIcon should render button with informed text",  () => {
it("ButtonIcon should render button with informed text", () => {
    // Arrange ( preparar os dados)
    const textButton = "Buscar produtos agora";

    // Act ( renderizar o html)
    render(
        <ButtonIcon text={textButton} />
    )
    //screen.debug();
    // Assert
    // procurar na DOM o elemento que tem o conteudo da variável textButton
    expect(screen.getByText(textButton)).toBeInTheDocument();
});