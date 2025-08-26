class Login {

    postLogin(payload) {
        const envi = Cypress.env("ENV");
        const HOST = Cypress.env(`${envi}`).url_api;
        const path = "/login";

        const headers = {
            "content-type": "application/json",
            "x-api-key": "reqres-free-v1"
        };
        

        return cy
            .api({
                method: "POST",
                url: HOST + path,
                headers: headers,
                body: payload,
                failOnStatusCode: false,
            })
            .then((response) => {
                return response;
            })
            .as("responseLogin");
    }
}

export default Login;
