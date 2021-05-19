import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const showProfile = container.resolve(ShowProfileService);
        const user = await showProfile.execute({ user_id });
        delete user.password;
        return response.status(200).json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id: user_id } = request.user;

        const { name, email, old_password, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });
        delete user.password;
        return response.json(user);
    }
}

export default ProfileController;
