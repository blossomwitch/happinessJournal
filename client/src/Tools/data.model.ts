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
    _id:         string;
    firstName:   string;
    lastName:    string;
    email:       string;
    saved:       Reflection[];
    reflections: Reflection[];
}

export interface Reflection {
    date?:        string;
    exerciseTime: string;
    exerciseType: string;
    meditation:   string;
    kindness:      string;
    gratitude:    string;
    journal:      string;
    final?:       string;
}
