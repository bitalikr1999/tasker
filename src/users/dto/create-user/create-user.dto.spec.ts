import { plainToInstance } from 'class-transformer';
import { CreateUserPayloadDto } from './create-user.dto';
import { validate } from 'class-validator';
import { transformErrorsToRecord } from 'src/shared/helpers';

describe('CreateUserDto', () => {
  it('all properties received', async () => {
    const data = {
      email: 'test@test.email',
      name: 'name',
      password: 'password',
    };
    const createUserPayloadDto = plainToInstance(CreateUserPayloadDto, data);
    const errors = await validate(createUserPayloadDto);
    expect(errors.length).toBe(0);
  });

  it('email should be email', async () => {
    const data = {
      email: 'testtest.email',
      name: 'name',
      password: 'password',
    };
    const createUserPayloadDto = plainToInstance(CreateUserPayloadDto, data);
    const errors = await validate(createUserPayloadDto);
    const errorsObject = transformErrorsToRecord(errors);
    expect(errorsObject.email).toBeTruthy();
  });

  it('check required properties', async () => {
    const createUserPayloadDto = plainToInstance(CreateUserPayloadDto, {});
    const errors = await validate(createUserPayloadDto);
    expect(errors.length).toBe(3);
  });
});
