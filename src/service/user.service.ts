import { DocumentDefinition } from 'mongoose';
import User, { userDocument } from '../model/user.model'

export async function createUser(input: DocumentDefinition<userDocument>) {
    try {
        return await User.create(input);
    } catch (error) {
        throw new Error(error as string);
    }
}

function findUser() { }