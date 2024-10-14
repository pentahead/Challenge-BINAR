const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetStudents = (req, res, next) => {
    // Validate the query
    const validateQuery = z.object({
        name: z.string(),
        nickName: z.string().optional(),
        bachelor: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};