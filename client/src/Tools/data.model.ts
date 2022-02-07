export interface ComponentProps {
    setToken: (userToken: Token) => void;
    studentInfo: Student[];
    studentEmail: string | undefined
    setStudentEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
    setStudentInfo: React.Dispatch<React.SetStateAction<Student[]>>;
}

export interface Token {
    token: string;
}

export interface JSONData {
    students: Student[];
}

export interface Student {
    firstName: string;
    lastName: string;
    email: string;
}
