import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id: provider_id } = request.user;
        const { day, month, year } = request.body;

        const listProviderAppointments = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.status(200).json(appointments);
    }
}

export default ProviderAppointmentsController;
