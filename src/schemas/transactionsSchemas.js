import joi from "joi";

export const valueSchema = joi.object({
  value: joi.number().integer().required()
});