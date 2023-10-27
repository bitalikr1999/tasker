import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { transformErrorsToRecord } from 'src/shared/helpers';
import { SignUpPayloadDto } from './sign-up.dto';

describe('SignUpPayloadDto', () => {
  it('all properties received', async () => {
    const data = {
      email: 'test@test.email',
      name: 'name',
      password: 'password',
    };
    const signUpPayloadDto = plainToInstance(SignUpPayloadDto, data);
    const errors = await validate(signUpPayloadDto);
    expect(errors.length).toBe(0);
  });

  it('email should be email', async () => {
    const data = {
      email: 'testtest.email',
      name: 'name',
      password: 'password',
    };
    const signUpPayloadDto = plainToInstance(SignUpPayloadDto, data);
    const errors = await validate(signUpPayloadDto);
    const errorsObject = transformErrorsToRecord(errors);
    expect(errorsObject.email).toBeTruthy();
  });

  it('check required properties', async () => {
    const signUpPayloadDto = plainToInstance(SignUpPayloadDto, {});
    const errors = await validate(signUpPayloadDto);
    expect(errors.length).toBe(3);
  });
});
