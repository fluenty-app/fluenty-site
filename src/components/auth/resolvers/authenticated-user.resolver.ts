import { User } from '../../users/schemas/user.schema';

export function resolveAuthenticatedUser(user: User) {
  return {
    id: user._id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
  };
}
