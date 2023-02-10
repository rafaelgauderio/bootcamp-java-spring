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

// mockando o servidor de backend para chamar as categorias
export const backendServer = setupServer(
    rest.get(`${BASE_URL}/categories`, (request, response, context) => {
        return response(
            context.status(200),
            context.json(findAllCategoriesResponse)
        );
    })
);



