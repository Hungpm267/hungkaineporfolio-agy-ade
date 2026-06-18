/* ============================================================
   AUTH MODULE - auth.js
   Portfolio Website Authentication using Supabase Auth
   ============================================================ */

const Auth = {
  /* ── Configuration ─────────────────────────────────────── */
  LOGIN_PAGE: 'login.html',
  ADMIN_PAGE: 'admin.html',

  /* ── Internal Helpers ──────────────────────────────────── */
  _getLoginUrl() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return prefix + this.LOGIN_PAGE;
  },

  _getAdminUrl() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return prefix + this.ADMIN_PAGE;
  },

  _isLoginPage() {
    const path = window.location.pathname.toLowerCase();
    return path.includes(this.LOGIN_PAGE.toLowerCase()) || 
           path.endsWith('/login') || 
           path.endsWith('/login/');
  },

  /**
   * Helper to get local session synchronously from localStorage.
   * Supabase stores session under the key `sb-[project-ref]-auth-token`.
   */
  _getLocalSession() {
    if (typeof localStorage === 'undefined') return null;
    const keys = Object.keys(localStorage);
    const authKey = keys.find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
    if (!authKey) return null;
    try {
      return JSON.parse(localStorage.getItem(authKey));
    } catch (e) {
      return null;
    }
  },

  /* ── Public API ────────────────────────────────────────── */
  init() {
    this.requireAuth();
  },

  /**
   * Attempt to log in with Supabase Auth.
   * Note: This is now asynchronous.
   */
  async login(email, password, remember = false) {
    if (typeof window.supabaseClient === 'undefined') {
      console.error('[Auth] Supabase client is not available.');
      return false;
    }

    try {
      const { data, error } = await window.supabaseClient.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        console.error('[Auth] Login error:', error.message);
        return false;
      }

      console.log('[Auth] Login successful.');
      return true;
    } catch (err) {
      console.error('[Auth] Unexpected login error:', err);
      return false;
    }
  },

  /**
   * Log out.
   */
  async logout() {
    if (typeof window.supabaseClient !== 'undefined') {
      await window.supabaseClient.auth.signOut();
    }
    window.location.href = this._getLoginUrl();
  },

  /**
   * Redirect if not logged in.
   */
  requireAuth() {
    if (this._isLoginPage()) return;

    if (!this.isLoggedIn()) {
      const intended = encodeURIComponent(window.location.href);
      window.location.href = this._getLoginUrl() + '?next=' + intended;
    }
  },

  /**
   * Check if a session is currently active (synchronously via localStorage).
   */
  isLoggedIn() {
    return !!this._getLocalSession();
  },

  /**
   * Get the currently logged-in username (email).
   */
  getCurrentUser() {
    const session = this._getLocalSession();
    return session?.user?.email || null;
  },

  currentUser() {
    return this.getCurrentUser();
  },

  /**
   * Handle the login form submission from login.html.
   * Note: This is now async.
   */
  async handleLoginSubmit(username, password) {
    const success = await this.login(username, password);

    if (success) {
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next');

      if (next) {
        try {
          const decoded = decodeURIComponent(next);
          const url = new URL(decoded, window.location.origin);
          if (url.origin === window.location.origin) {
            window.location.href = url.href;
            return true;
          }
        } catch (e) {
          // Fall through
        }
      }

      window.location.href = this._getAdminUrl();
      return true;
    }

    return false;
  },

  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      window.location.href = this._getAdminUrl();
    }
  }
};

/* Expose globally */
window.Auth = Auth;
