export const environment = {
  production: false,
  url: 'https://dynamixbot.onrender.com/',
  loginRedirect:
    'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=bhwlcwuvtg51226poslegrqdcm8naz&redirect_uri=https://dynamixbot.onrender.com/register&scope=viewing_activity_read channel:moderate channel:manage:redemptions channel:read:redemptions moderation:read moderator:manage:banned_users user:read:chat user:write:chat channel:read:predictions channel:manage:predictions chat:edit chat:read&state=localhost',
  kickLoginRedirect: `https://id.kick.com/oauth/authorize?response_type=code&client_id=01K0VRXPBR7SFN7GR0ZYQMX709&scope=user:read channel:read channel:write chat:write events:subscribe moderation:ban&code_challenge_method=S256&state=local&code_challenge=`,
};
