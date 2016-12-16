export interface HelloProps {
    message: string;
    framework?: string;
}

export default class Hello implements HelloProps {
    message: string ;
    framework: string;
    constructor(message:string="welcome to futureteam family !"){

        this.message = message;
        this.log();
    }

    log():void{
        console.dir(this.message);
    }

    getMessage():string{
        return this.message;
    }

}
