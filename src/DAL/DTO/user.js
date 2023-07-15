export class User{
    constructor(user){
        this.user=user
    }
    nameOnly(){
        return {
            name:this.user.name
        
        }
    }
}
