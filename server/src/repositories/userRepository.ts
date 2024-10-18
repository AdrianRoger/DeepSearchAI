import { IUser, IUserRepository } from '../types/user';
import { db }  from '../database/knex';
import { IUserTheme, ITheme } from '../types/user';

export default class UserRepository implements IUserRepository {

    public async createUser(user: IUser): Promise<Partial<IUser>> {
        const newUser = await db('users')
            .insert({ email: user.email, password: user.password })
            .returning('*');
        return newUser[0];
    }

    public async getUserByID(userID: string): Promise<Partial<IUser> | undefined > {

        const user = await db('users')
            .select('id', 'email')
            .where({id: userID})
            .first();
        
        return user
    }

    public async getUserByEmail(userEmail: string): Promise<Partial<IUser> | undefined > {

        const user = await db('users')
            .select('id', 'password', 'email')
            .where({email: userEmail})
            .first();
        
        return user
    }

    public async resetPassword(password: string, email: string): Promise<Partial<IUser> | undefined> {
        const user = await db('users')
            .where('email', email)
            .update({
                password
            })
            .returning('*');
            
        return user[0];
    }

    public async insertUsersTheme(userID: string, themesIDs:Array<string>):Promise<Array<IUserTheme>> {

        const usersThemeData = themesIDs.map(themeID => ({
            user_id: userID,
            theme_id: themeID
        }));

        return await db('users_theme').insert(usersThemeData).returning('*');
    }

    public async getUsersThemes(userID: string): Promise<Array<string>> {

        const usersThemesIDs = await db('users_theme')
            .pluck('theme_id')
            .where('user_id', userID);
        
        const themesNames = await db('themes')
            .pluck('name')
            .whereIn('id', usersThemesIDs);

        return themesNames;
    }

    public async getThemes(): Promise<Array<ITheme>> {
        return await db('themes');
    }
}