export interface ComponentProps {
    setToken: (userToken: Token) => void
}

export interface Token {
    token: string;
}
