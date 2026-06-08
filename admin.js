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
    },
    {
      username: "developer",
      password: "@piyush89",
      role: "Developer",
      name: "Piyush Sharma"
    },
    {
      username: "Ashish",
      password: "@ashish0512",
      role: "Developer",
      name: "Ashish Ram Sharma"
    },
    {
      username: "salabh.varshney",
      password: "@9650474041",
      role: "CEO Balaji Hitech Pvt. Ltd.",
      name: "Salabh Varshney"
    }
  ],
  sessionKey: "bh_admin_session",
  sessionDuration: 2 * 60 * 60 * 1000  /* 2 hours in ms */
};
