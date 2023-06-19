const { z } = require("zod");

// client_id, barber_id, data, hour
const createSchedule = z.object({
    client_id: z.string().nonempty('O campo "name" é obrigatório.'),
    barber_id: z.string().nonempty('O campo "name" é obrigatório.'),
    data: z.string().nonempty('O campo "name" é obrigatório.'),
    hour: z.string().nonempty('O campo "name" é obrigatório.'),
  });

class ZodValidations {
    static async createSchedule (req, res, next){
        const { error } = createSchedule.safeParse(req.body);
        if (error) {
           const err  = JSON.parse(error.message)
           res.status(400).send({errors: err, fieldsValidated:false})
           return
        }

       next()
    }
}

module.exports = ZodValidations;
