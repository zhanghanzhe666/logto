import { Prompt } from '@logto/js';
import { InteractionEvent, demoAppApplicationId } from '@logto/schemas';

import { assignRolesToUser, putInteraction } from '#src/api/index.js';
import { createRole } from '#src/api/role.js';
import MockClient from '#src/client/index.js';
import { demoAppRedirectUri } from '#src/constants.js';
import { processSession } from '#src/helpers/client.js';
import { createUserByAdmin } from '#src/helpers/index.js';
import { OrganizationApiTest } from '#src/helpers/organization.js';
import { enableAllPasswordSignInMethods } from '#src/helpers/sign-in-experience.js';
import { generatePassword, generateUsername } from '#src/utils.js';

describe('OpenID Connect ID token', () => {
  const organizationApi = new OrganizationApiTest();
  const username = generateUsername();
  const password = generatePassword();
  // eslint-disable-next-line @silverhand/fp/no-let
  let userId = '';

  const fetchIdToken = async (scopes: string[], expectClaims?: Record<string, unknown>) => {
    const client = new MockClient({
      appId: demoAppApplicationId,
      prompt: Prompt.Login,
      scopes,
    });
    await client.initSession(demoAppRedirectUri);
    await client.successSend(putInteraction, {
      event: InteractionEvent.SignIn,
      identifier: { username, password },
    });
    const { redirectTo } = await client.submitInteraction();
    await processSession(client, redirectTo);
    const idToken = await client.getIdTokenClaims();
    if (expectClaims) {
      expect(idToken).toMatchObject(expectClaims);
    }
    return idToken;
  };

  beforeAll(async () => {
    const { id } = await createUserByAdmin(username, password);
    // eslint-disable-next-line @silverhand/fp/no-mutation
    userId = id;
    await enableAllPasswordSignInMethods();
  });

  afterEach(async () => {
    await Promise.all([
      organizationApi.cleanUp(),
      organizationApi.roleApi.cleanUp(),
      organizationApi.scopeApi.cleanUp(),
    ]);
  });

  it('should be issued with correct `username` and `roles` claims', async () => {
    const role = await createRole({});
    await assignRolesToUser(userId, [role.id]);
    await fetchIdToken(['username', 'roles'], {
      username,
      roles: [role.name],
    });
  });

  it('should be issued with `organizations` claim', async () => {
    const [org1, org2] = await Promise.all([
      organizationApi.create({ name: 'org1' }),
      organizationApi.create({ name: 'org2' }),
    ]);

    await Promise.all([
      organizationApi.addUsers(org1.id, [userId]),
      organizationApi.addUsers(org2.id, [userId]),
    ]);

    const role = await organizationApi.roleApi.create({ name: 'member' });
    await organizationApi.addUserRoles(org1.id, userId, [role.id]);

    const idToken = await fetchIdToken(['urn:logto:scope:organizations']);

    // @ts-expect-error type definition needs to be updated
    const organizations = idToken.organizations as unknown;

    expect(organizations).toHaveLength(2);
    expect(organizations).toContainEqual({
      id: org1.id,
      roles: ['member'],
    });
    expect(organizations).toContainEqual({
      id: org2.id,
      roles: [],
    });
  });
});
