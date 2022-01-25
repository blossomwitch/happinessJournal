export interface ComponentProps {
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface Token {
    token: string;
}
