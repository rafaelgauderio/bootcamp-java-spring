export const formatePrice = (price : number) => {

    const parameters = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2

    };
    
    return new Intl.NumberFormat('pt-BR', parameters).format(price);

};