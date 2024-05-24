const validator = require("../utils/validate");

const saveTask = (req, res, next) => {
    const validationRule = {
        title: "required|string",
        description: "required|string",
        due: "required|string",
        priority: "required|string",
        completed: "required|boolean"
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    status: false,
                    message: "Validation failed",
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    saveTask
};