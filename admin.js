/**
 * ═══════════════════════════════════════════════
 *  Balaji Hitech — Admin Credentials (admin.js)
 *  Keep this file secure — do not expose publicly
 * ═══════════════════════════════════════════════
 */

const BH_ADMIN_CONFIG = {
  credentials: [
    {
      username: "admin",
      password: "balaji@2024",
      role: "Super Admin",
      name: "Administrator"
    }
  ],
  sessionKey: "bh_admin_session",
  sessionDuration: 8 * 60 * 60 * 1000  /* 8 hours in ms */
};
