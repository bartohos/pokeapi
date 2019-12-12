class Helper {
    static fetch = async (query:string) => {
        const response = await fetch(query);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }

        return body;
    };
}

export default Helper;
