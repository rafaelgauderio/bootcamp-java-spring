import { formatPrice } from "util/formatters";


describe("format price with positive nummbers ", () => {
    test("formatPrice should format number pt-BR when given 19.90", () => {
        // pattern AAA
        // Arrange
        const value = 19.90;
        // Act
        const testResult = formatPrice(value);
        // Assert
        expect(testResult).toEqual("19,90");

    });

    test("formatPrice should format number pt-BR when sum interger and double", () => {
        let sum = (50.50 + 3);

        const testResultSum = formatPrice(sum);

        expect(testResultSum).toEqual("53,50");
    });

    test("formatPrice should format number pt-BR when given zero", () => {
        let zero = 0;

        const testResult = formatPrice(zero);

        expect(testResult).toEqual("0,00");
    });


});

describe("format price whit negative numbers", () => {

    test("Format should format number pt-BR when given -17.12", () => {
        const negative = -17.12;
        const testResult = formatPrice(negative);
        expect(testResult).toEqual("-17,12");
    });

})



