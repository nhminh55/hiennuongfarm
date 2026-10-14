/** Edit mode: the admin's sign-in and the "editing" flag for this tab. */

/** Where Sveltia CMS keeps its sign-in ({ backendName, token, … }). */
const CMS_USER = 'sveltia-cms.user';

/** sessionStorage flag: edit mode stays on while moving between pages. */
export const EDITING = 'hn-edit';

/** The GitHub token of the admin signed in at /admin, if any. */
export function adminToken(): string | undefined {
  try {
    const user = JSON.parse(localStorage.getItem(CMS_USER) ?? 'null');
    return user?.backendName === 'github' && typeof user.token === 'string' && user.token ? user.token : undefined;
  } catch {
    return undefined;
  }
}
