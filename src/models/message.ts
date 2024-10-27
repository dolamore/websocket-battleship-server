export const successfulRegMessage = (name: string) => {
    return JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
            name: `${name}`,
            error: false,
            errorText: ""
        }),
        id: 0,
    });
}

export const errorRegMessage = () => {
    return JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
            name: "",
            error: true,
            errorText: "User already exists"
        }),
        id: 0,
    });
}