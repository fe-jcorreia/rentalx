import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IAuthenticateResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IAuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("email or password incorrect");
    }

    const token = sign({}, "ec42dcacc46f1a3ce447abcd8607d435", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: { name: user.name, email: user.email },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
