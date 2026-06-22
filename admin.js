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
      role: "Developer's Mama",
      name: "Ashish Ram Sharma"
    },
    {
      username: "shalabh.varshney",
      password: "@9650474041",
      role: "CEO Balaji Hitech Pvt. Ltd.",
      name: "Salabh Varshney"
    }

  ],
  sessionKey: "bh_admin_session",
  sessionDuration: 2 * 60 * 60 * 1000  /* 2 hours in ms */
};

/* ═══════════════════════════════════════════════════════════════
   FIREBASE — login_history collection schema
   Collection name : login_history
   Each document is auto-ID'd by addDoc() on every successful login.

   FIELD             TYPE      EXAMPLE VALUE                     NOTES
   ──────────────────────────────────────────────────────────────
   username          string    "salabh.varshney"                 Credential username
   name              string    "Salabh Varshney"                 Display name
   role              string    "CEO Balaji Hitech Pvt. Ltd."     Role at login time
   timestamp         number    1717829402000                     Date.now() (ms since epoch)
   loginDate         string    "08 Jun 2025"                     Human-readable date (auto-set)
   loginTime         string    "03:30 PM"                        Human-readable time (auto-set)
   ipAddress         string    "103.21.58.12"                    Client IP (fetched from api.ipify.org)
   userAgent         string    "Mozilla/5.0 …"                   navigator.userAgent
   sessionId         string    "bh_sess_1717829402000_admin"     Unique session token
   status            string    "success"                         Always "success" on login
═══════════════════════════════════════════════════════════════ */

/**
 * Call this from the Firebase module (bhSaveLoginHistory) to write
 * a full login_history record with all extra fields.
 *
 * Usage (inside the Firebase <script type="module">):
 *
 *   window.bhSaveLoginHistory = async function(user) {
 *     const now    = Date.now();
 *     const dt     = new Date(now);
 *     const ip     = await fetch('https://api.ipify.org?format=json')
 *                          .then(r => r.json()).then(d => d.ip).catch(() => 'unknown');
 *     await addDoc(collection(db, 'login_history'), {
 *       username  : user.username,
 *       name      : user.name,
 *       role      : user.role,
 *       timestamp : now,
 *       loginDate : dt.toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'}),
 *       loginTime : dt.toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit', hour12:true}),
 *       ipAddress : ip,
 *       userAgent : navigator.userAgent,
 *       sessionId : 'bh_sess_' + now + '_' + user.username,
 *       status    : 'success'
 *     });
 *   };
 */
