export interface UserRegister {
    error : boolean;
    message : string;
}
export interface UserLogin {
    error : boolean;
    message : string;
    userId : number;
    token : string;
}
