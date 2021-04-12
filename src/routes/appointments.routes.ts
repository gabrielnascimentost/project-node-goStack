import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = appointmentsRepository.find();
    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider, date } = req.body;
        const parseDate = parseISO(date);
        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({
            date: parseDate,
            provider,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
