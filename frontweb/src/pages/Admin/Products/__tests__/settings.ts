import { rest, RestHandler } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "util/requests";


const findAllCategoriesResponse = {

    "content": [
        {
            "id": 1,
            "name": "Livros"
        },
        {
            "id": 2,
            "name": "Eletrônicos"
        },
        {
            "id": 3,
            "name": "Computadores"
        }
    ],
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 20,
        "unpaged": false,
        "paged": true
    },
    "last": true,
    "totalPages": 1,
    "totalElements": 3,
    "size": 20,
    "number": 0,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "first": true,
    "numberOfElements": 3,
    "empty": false,

};

// mockando um Produto do backend
export const saveProductResponse = {
    "id": 2,
    "name": "Smart TV",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 2190.0,
    "imgURL": "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg",
    "date": "2020-07-14T10:00:00Z",
    "categories": [
        {
            "id": 2,
            "name": "Eletrônicos"
        },
        {
            "id": 3,
            "name": "Computadores"
        }
    ]
};

// mockando o servidor de backend para chamar as categorias
export const backendServer = setupServer(

    rest.get(`${BASE_URL}/categories`, (request, response, context) => {
        return response(
            context.status(200),
            context.json(findAllCategoriesResponse)
        );
    }),
    rest.post(`${BASE_URL}/products`, (request, response, context) => {
        return response(
            context.status(201),
            context.json(saveProductResponse)
        );
    }),

    // editando
    rest.put(`${BASE_URL}/products/productId`, (request, response, context) => {
        return response(
            context.status(200),
            context.json(saveProductResponse)
        );
    }),

    rest.get(`${BASE_URL}/products/productsId`, (request, response, context) => {
        return response(
            context.status(200),
            context.json(saveProductResponse)
        );
    }),


);



