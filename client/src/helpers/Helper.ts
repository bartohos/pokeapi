class Helper {
    public static fetch = async (query: string) => {
        const response = await fetch(query);
        const responseJson = await response.json();
        if (response.status !== 200) {
            throw Error(responseJson.message);
        }

        return responseJson;
    };

    public static post = async (url: string, body: any) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        if (response.status !== 200) {
            throw Error(responseJson.message);
        }

        return responseJson;
    };

    public static delete = async (url: string, body?: any) => {
        const requestOptions = {
            method: "DELETE",
        } as any;

        if (body) {
            requestOptions.body = body;
            requestOptions.headers = { "Content-Type": "application/json" };
        }

        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        if (response.status !== 200) {
            throw Error(responseJson.message);
        }

        return responseJson;
    };
}

export default Helper;
