import { send } from '@utils/request';
import { setHeaders } from '@utils/auth';

let userService = {
  getMe: async () => {
    let uri = 'api/users/me';
    return await send(process.env.SERVER_URL, uri, 'GET', setHeaders());
  },
};

export default userService;
