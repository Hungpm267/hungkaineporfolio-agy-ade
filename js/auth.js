/* ============================================================
   AUTH MODULE - auth.js
   Portfolio Website Authentication
   ============================================================
   Depends on: data.js (window.DB must be available)
   ============================================================ */

const Auth = {
  /* ── Configuration ─────────────────────────────────────── */

  /** Path to the login page (relative to site root) */
  LOGIN_PAGE: 'login.html',

  /** Path to the admin dashboard (relative to site root) */
  ADMIN_PAGE: 'admin.html',

  /* ── Internal Helpers ──────────────────────────────────── */

  /**
   * Resolve the correct path to the login page regardless of
   * current page depth in the directory structure.
   * @returns {string}
   */
  _getLoginUrl() {
    // Try to detect relative depth from the current URL
    // For flat (root-level) sites this just returns 'login.html'
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return prefix + this.LOGIN_PAGE;
  },

  /**
   * Resolve the correct path to the admin page.
   * @returns {string}
   */
  _getAdminUrl() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return prefix + this.ADMIN_PAGE;
  },

  /**
   * Check whether the current page is the login page itself.
   * @returns {boolean}
   */
  _isLoginPage() {
    return window.location.pathname.includes(this.LOGIN_PAGE);
  },

  /* ── Public API ────────────────────────────────────────── */

  /**
   * Initialize auth on protected (admin) pages.
   *
   * Call this at the top of any admin script. If the user is not
   * logged in they will be immediately redirected to login.html.
   *
   * Usage:
   *   <script src="js/data.js"></script>
   *   <script src="js/auth.js"></script>
   *   <script> Auth.init(); </script>
   */
  init() {
    if (!window.DB) {
      console.error('[Auth] init(): window.DB is not available. Make sure data.js is loaded first.');
      return;
    }
    this.requireAuth();
  },

  /**
   * Attempt to log in with the given credentials.
   *
   * @param {string} username - The username to attempt login with
   * @param {string} password - The plain-text password
   * @param {boolean} remember - The remember-me state
   * @returns {boolean} true if credentials are valid, false otherwise
   */
  login(username, password, remember = false) {
    if (!window.DB) {
      console.error('[Auth] login(): window.DB is not available.');
      return false;
    }

    if (!username || !password) {
      return false;
    }

    const user = DB.verifyUser(username.trim(), password);

    if (user) {
      DB.setSession(user.username, remember);
      return true;
    }

    return false;
  },

  /**
   * Log out the current user.
   *
   * Clears the session and redirects to the login page.
   */
  logout() {
    if (window.DB) {
      DB.clearSession();
    }
    window.location.href = this._getLoginUrl();
  },

  /**
   * Check whether a session is active.
   *
   * If no active session is found the user is redirected to login.html.
   * Does nothing if the current page is already the login page.
   */
  requireAuth() {
    if (this._isLoginPage()) return;

    if (!window.DB) {
      console.error('[Auth] requireAuth(): window.DB is not available.');
      window.location.href = this._getLoginUrl();
      return;
    }

    if (!this.isLoggedIn()) {
      // Preserve intended destination so login page can redirect back
      const intended = encodeURIComponent(window.location.href);
      window.location.href = this._getLoginUrl() + '?next=' + intended;
    }
  },

  /**
   * Check if a session is currently active.
   * @returns {boolean}
   */
  isLoggedIn() {
    if (!window.DB) return false;
    return DB.isLoggedIn();
  },

  /**
   * Get the currently logged-in username, or null if not authenticated.
   * @returns {string|null}
   */
  getCurrentUser() {
    if (!window.DB) return null;
    return DB.getSession();
  },

  /**
   * Alias for getCurrentUser to match admin.html expectations.
   * @returns {string|null}
   */
  currentUser() {
    return this.getCurrentUser();
  },

  /**
   * Handle the login form submission from login.html.
   *
   * Attempts login and either:
   *   - Redirects to the 'next' query parameter URL, or
   *   - Redirects to admin.html on success
   *   - Returns false on failure (caller should show an error)
   *
   * @param {string} username
   * @param {string} password
   * @returns {boolean} true on success, false on failure
   */
  handleLoginSubmit(username, password) {
    const success = this.login(username, password);

    if (success) {
      // Check for a 'next' redirect parameter
      const params = new URLSearchParams(window.location.search);
      const next   = params.get('next');

      if (next) {
        try {
          const decoded = decodeURIComponent(next);
          // Safety check: only redirect to same origin
          const url = new URL(decoded, window.location.origin);
          if (url.origin === window.location.origin) {
            window.location.href = url.href;
            return true;
          }
        } catch (e) {
          // Fall through to default redirect
        }
      }

      window.location.href = this._getAdminUrl();
      return true;
    }

    return false;
  },

  /**
   * If the user is already logged in and visits the login page,
   * redirect them straight to the admin panel.
   *
   * Call this inside login.html's script.
   */
  redirectIfLoggedIn() {
    if (window.DB && DB.isLoggedIn()) {
      window.location.href = this._getAdminUrl();
    }
  }
};

/* Expose globally */
window.Auth = Auth;
