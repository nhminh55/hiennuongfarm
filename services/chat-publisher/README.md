# ChatGPT → Chuyện nhà Nấm: pilot

Standalone Node 24 service for a custom GPT Action. It reuses the existing Astro article schema and Cloudflare Pages deployment workflow. No Keystatic, Firestore, or paid AI API calls. It does not change the existing Sveltia admin or Pages/legacy Worker configuration.

## What is implemented

- Authenticated `POST /articles`: structured article text plus 1–2 attached JPG/PNG/WebP photos.
- OpenAI `openaiFileIdRefs` objects, temporary download URLs, bounded downloads, no redirects, allowlisted HTTPS hosts.
- Real Sharp conversion: EXIF orientation, no crop/upscale/AI retouch, long edge ≤1800 px, WebP quality 84→81→78, metadata removed. Aim ≤300 KB; return a warning rather than silently overcompress below 78.
- Existing categories and frontmatter; the first/selected image becomes cover; image blocks place images automatically.
- Article and images in one Git commit on `main`; non-forced update; existing articles are not overwritten. Identical content retries do not duplicate posts.
- `GET /publications/{commitSha}` checks the existing Pages workflow. Saved is not deployed. No GPT/model API is called.

## Local test (no credentials required)

```sh
cd services/chat-publisher
npm ci
npm test
npm run verify:astro # needs root npm ci first; writes/removes temporary fixtures
```

Tests use generated in-memory image fixtures and mocked GitHub, not genuine farm photographs. No test article is published.

## Run / host

This service uses native Sharp, so it runs on a **Node container/server**, not the existing Cloudflare Pages Functions runtime. Hosting must offer a public HTTPS endpoint with request duration sufficient for two photos and GitHub calls. The Dockerfile is ready; no new hosting project has been created. Keep the website's existing Pages project and legacy Worker untouched.

1. Create a dedicated fine-grained GitHub token restricted to `nhminh55/hiennuongfarm`, Contents read/write + Actions read, and an expiration. The token needs to permit normal pushes to main under current repository rules. Store it only in hosting secrets as `GITHUB_TOKEN`.
2. Generate a separate random key (e.g. `openssl rand -hex 32`); store as `PUBLISHER_API_KEY`. This key is a publishing credential: anyone with it can create public articles. Do not put it in the repo, GPT Instructions, chat, or OpenAPI schema.
3. Set `HOST=0.0.0.0`, `PORT=4335` on the container host. For local testing, copy `.env.example` to `.env` and use `npm start`; local default is 127.0.0.1:4335.
4. Run behind HTTPS. Set host-level request timeout and rate limit. `/health` is public and reveals no credentials.
5. Replace `https://publisher.example.com` in the OpenAPI copy with the real HTTPS service URL. The placeholder is intentionally not a working service.

GitHub PAT commits trigger the existing push workflow; the workflow's automatic `GITHUB_TOKEN` should not be substituted, because its writes generally do not trigger another workflow. Successful deployment requires the existing repository Cloudflare secrets. If the token lacks Actions read, status checks fail honestly instead of claiming success.

## Custom GPT setup (owner account)

- Create a private GPT called **Trợ lý Hiền Nương Farm**.
- Paste `gpt-instructions.md` into Instructions.
- Add an Action and import the updated `openapi.yaml`.
- Authentication: API Key → Bearer; use **PUBLISHER_API_KEY**, never GITHUB_TOKEN.
- The publish Action is consequential; ChatGPT can show its own confirmation before executing it. The actual interaction is conversation + platform confirmation, not the custom buttons in the mockup.
- Share only with intended writers through supported GPT sharing settings. Verify access in both Minh's and chị Nương's accounts. The pilot uses a shared service credential, not per-person roles/audit; do not publish the GPT openly. For enforceable individual access, replace shared-key auth with OAuth before broader rollout.

No OpenAI API key is needed: the user's ChatGPT session writes the article, the service only publishes. ChatGPT plan/feature access and hosting costs are separate, to verify on actual accounts/provider.

## Acceptance test still required on live integration

1. Connect the hosted service to the private GPT and attach two authentic farm photos.
2. Ask it to **save a draft** first. Confirm real runtime file references arrive, both images are WebP, Markdown builds, and the draft is absent from production/search/sitemap.
3. Use a different slug and owner-approved real content to publish. Check `deploy_pending` → `deployed` for the exact commit and open the public article.
4. Ask again with the same input: no duplicate. Expired photo must return an error; existing slug must never overwrite a prior article.
5. Test from chị Nương's account/device before calling the integration ready.

Do not publish dummy content or claim that local tests prove ChatGPT file transfer works. An identical retry needs fresh file refs if the original download links expired. Updating/removing/listing old articles and durable draft previews are intentionally outside this pilot.

## References

- https://developers.openai.com/api/docs/actions/sending-files — schema uses strings, runtime injects file objects; download links last five minutes.
- https://developers.openai.com/api/docs/actions/production
- https://docs.github.com/en/rest/git/trees
- https://sharp.pixelplumbing.com/api-output/#webp
