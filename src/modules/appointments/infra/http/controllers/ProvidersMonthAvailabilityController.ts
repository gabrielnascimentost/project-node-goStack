import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProvidersMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.query;

        const listProviderMonthAvailabiltiy = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const availability = await listProviderMonthAvailabiltiy.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}

export default ProvidersMonthAvailabilityController;
