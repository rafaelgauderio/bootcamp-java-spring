import { formatPrice } from "util/formatters";

test("formatPrice_should_format_number_pt-BR_when_given_19.90", () => {
    // pattern AAA
    // Arrange
    const value = 19.90;
    let sum = (50.50 + 3);  

    // Act
    const testResult = formatPrice(value);
    const testResultSum = formatPrice(sum);

    // Assert
    expect(testResult).toEqual("19,90");
    expect(testResultSum).toEqual("53,50");
})