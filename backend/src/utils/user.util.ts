import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Password should have 1 upper case, lowcase letter along with a number and special character.';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const UserUtils = {
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  VALIDATION_PIPE,
};
