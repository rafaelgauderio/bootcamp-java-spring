import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import Form from "../Form";
import history from "util/history";

it("should render Form component", () => {



    render(
        <Router history={history}>
            <Form />
                    </Router>


    )

    screen.debug();
});

