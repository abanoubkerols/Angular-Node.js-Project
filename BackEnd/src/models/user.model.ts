import { Schema  , model} from "mongoose";

export interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    password: string;
    isAdmin: Boolean;

   
}

export const UserSchema = new Schema<User>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true , unique :true },
        password: { type: String , required :true },
      
     
        address: { type: String, required: true },
      
        isAdmin: { type: Boolean , required: true },
    }, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
}
)

 export const UserModel = model<User>('user' ,UserSchema)