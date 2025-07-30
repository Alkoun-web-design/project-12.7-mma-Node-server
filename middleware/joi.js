import joi from 'joi';

// Validation schemas
// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().allow(''),
//   subject: Joi.string().required(),
//   message: Joi.string().required(),
//   interest: Joi.string().allow(''),
// });

// const signupSchema = Joi.object({
//   serviceType: Joi.string().required(),
//   studentName: Joi.string().when('serviceType', {
//     is: Joi.string().valid('Academic Resources'),
//     then: Joi.optional(),
//     otherwise: Joi.required()
//   }),
//   studentAge: Joi.number().when('serviceType', {
//     is: Joi.string().valid('Academic Resources'),
//     then: Joi.optional(),
//     otherwise: Joi.required()
//   }),
// }).unknown(true); // Allow other fields based on service type

export const tutorSchema = joi.object({
    name: joi.string().required(),
    bio: joi.string().required(),
    education: joi.string().required(),
    subject_speciality: joi.string().required(),
    teaching_styles: joi.string().required(),
    languages: joi.string().required(),
    work_experience: joi.string().required(),
    certifications: joi.string().required(),
    achievements: joi.string().required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(8).max(24)
})

export const counsellorSchema = joi.object({
    name: joi.string().required(),
    bio: joi.string().required(),
    education: joi.string().required(),
    languages: joi.string().required(),
    work_experience: joi.string().required(),
    certifications: joi.string().required(),
    achievements: joi.string().required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(8).max(24)
})