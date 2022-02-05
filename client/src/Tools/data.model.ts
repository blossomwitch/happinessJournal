export interface ComponentProps {
    setToken: (userToken: Token) => void;
    studentInfo: Student[]

}

export interface Token {
    token: string;
}

export interface JSONData {
    students: Student[];
}

export interface Student {
    firstname: string;
    lastname: string;
    email: string;
}
