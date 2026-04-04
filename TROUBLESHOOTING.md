# Troubleshooting Guide - Multi-Tab Authentication

## Common Issues and Solutions

### Issue 1: Storage Event Not Firing

**Symptom:** Logout in Tab 1 doesn't affect Tab 2

**Causes & Solutions:**

1. **Storage event listener not attached**
   ```javascript
   // ❌ Wrong - listener inside component
   const handleLogout = () => {
     setUser(null);
     window.addEventListener('storage', handler); // TOO LATE!
   };

   // ✅ Correct - listener in useEffect
   useEffect(() => {
     window.addEventListener('storage', handler);
     return () => window.removeEventListener('storage', handler);
   }, []);
   ```

2. **localStorage disabled**
   ```javascript
   // Check if localStorage is available
   const canUseStorage = () => {
     try {
       const test = '__test__';
       localStorage.setItem(test, test);
       localStorage.removeItem(test);
       return true;
     } catch (e) {
       console.warn('localStorage not available:', e);
       return false;
     }
   };

   // Use fallback if needed
   if (canUseStorage()) {
     localStorage.setItem('user', JSON.stringify(user));
   }
   ```

3. **Private/Incognito mode**
   - Some browsers disable localStorage in private mode
   - Use the check above to detect and provide fallback

### Issue 2: Data Not Persisting Between Page Loads

**Symptom:** User stays logged in within a tab, but logging out and reloading shows login page again

**Solution:**

```javascript
// ✅ Make sure to save to localStorage on login
const login = (userData) => {
  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData)); // Don't forget!
};

// ✅ Load from localStorage on app start
useEffect(() => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      setUser(JSON.parse(stored));
    } catch (e) {
      localStorage.removeItem('user');
    }
  }
}, []);
```

### Issue 3: Multiple Tabs Not Recognizing Login

**Symptom:** Login in Tab 1, but Tab 2 shows login page

**Check List:**

1. **Is the storage event listener actually running?**
   ```javascript
   // Add debug logging
   useEffect(() => {
     const handler = (e) => {
       console.log('Storage event:', {
         key: e.key,
         newValue: e.newValue,
         oldValue: e.oldValue
       });
     };
     window.addEventListener('storage', handler);
     return () => window.removeEventListener('storage', handler);
   }, []);
   ```

2. **Are you modifying the right key?**
   ```javascript
   // ✅ Correct - same key in all places
   const STORAGE_KEY = 'user';

   // In login
   localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

   // In storage listener
   if (e.key === STORAGE_KEY) { /* ... */ }

   // ❌ Wrong - inconsistent keys
   localStorage.setItem('user', JSON.stringify(userData));
   localStorage.setItem('currentUser', JSON.stringify(userData)); // Different!
   ```

3. **Is localStorage actually being updated?**
   ```javascript
   // In console, after login in Tab 1
   console.log(localStorage.getItem('user'));
   // Should show your user data, not null
   ```

### Issue 4: Changes Not Syncing Across Tabs

**Symptom:** Add a task in Tab 1, but it doesn't appear in Tab 2

**Solution:** Add storage sync for tasks too

```javascript
// When tasks change, save to localStorage
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

// Listen for task changes from other tabs
useEffect(() => {
  const handleTaskSync = (e) => {
    if (e.key === 'tasks' && e.newValue) {
      try {
        setTasks(JSON.parse(e.newValue));
      } catch (error) {
        console.error('Failed to sync tasks:', error);
      }
    }
  };

  window.addEventListener('storage', handleTaskSync);
  return () => window.removeEventListener('storage', handleTaskSync);
}, []);
```

### Issue 5: localStorage Quota Exceeded

**Symptom:** Error: "QuotaExceededError" when saving to localStorage

**Solution:** Check and manage data size

```javascript
// Calculate localStorage usage
const getStorageSize = () => {
  let size = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      size += localStorage[key].length + key.length;
    }
  }
  return (size / 1024).toFixed(2); // KB
};

console.log('Storage used:', getStorageSize(), 'KB');

// Clean up old data
const clearOldTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const recentTasks = tasks.filter(
    task => new Date(task.createdAt).getTime() > oneWeekAgo
  );

  localStorage.setItem('tasks', JSON.stringify(recentTasks));
};
```

### Issue 6: JSON Parsing Errors

**Symptom:** Console error: "SyntaxError: Unexpected token in JSON"

**Solution:** Add proper error handling

```javascript
// ✅ Safe parsing
const safeJSONParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return fallback;
  }
};

// ✅ Use it everywhere
const user = safeJSONParse(localStorage.getItem('user'), null);
const tasks = safeJSONParse(localStorage.getItem('tasks'), []);
```

### Issue 7: Performance Issues - Too Many Updates

**Symptom:** App is slow, too many re-renders

**Solution:** Debounce localStorage writes

```javascript
// Debounce tasks saving to avoid too many writes
const [debouncedTasks, setDebouncedTasks] = useState([]);

useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, 500); // Wait 500ms after last change

  return () => clearTimeout(timer);
}, [tasks]);
```

### Issue 8: Logout Works in One Tab But Not Others

**Symptom:** Logout button in Tab 1 works, but Tab 2 doesn't logout when Tab 1 logs out

**Debug Steps:**

```javascript
// 1. Verify logout is actually called
const logout = () => {
  console.log('Logout called');
  setUser(null);
  localStorage.removeItem('user');
  console.log('After logout, user in storage:', localStorage.getItem('user'));
};

// 2. Verify storage event listener exists
useEffect(() => {
  console.log('Storage listener attached');

  const handler = (e) => {
    console.log('Storage event received:', e.key, e.newValue);
    if (e.key === 'user') {
      console.log('User data changed, updating state');
      setUser(e.newValue ? JSON.parse(e.newValue) : null);
    }
  };

  window.addEventListener('storage', handler);
  return () => {
    console.log('Storage listener removed');
    window.removeEventListener('storage', handler);
  };
}, []);

// 3. Open Tab 1 and Tab 2
// 4. Look at console logs - they should show the event chain
```

### Issue 9: State Resets on Page Refresh

**Symptom:** After refresh, user is logged out even though data was in localStorage

**Cause:** Initial state is set before useEffect loads from localStorage

**Solution:** Use a loading state

```javascript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Load from storage
  const stored = localStorage.getItem('user');
  if (stored) {
    setUser(JSON.parse(stored));
  }
  setLoading(false); // Done loading
}, []);

// In component - don't show anything until loaded
if (loading) return <p>Loading...</p>;

// Now render with correct user state
return <Dashboard user={user} />;
```

### Issue 10: Works Locally But Not In Production

**Symptom:** Multi-tab sync works in development but not on deployed site

**Common Causes:**

1. **Different domains** - localStorage is per-domain
   ```javascript
   // ❌ Won't sync
   // app.example.com stored in one localStorage
   // www.example.com stored in different localStorage
   // These are different domains!

   // ✅ Solution - use same domain for all pages
   ```

2. **CORS or security headers blocking storage**
   ```javascript
   // Check browser console for errors
   // Look for: "Access to localStorage has been blocked"

   // Make sure server allows cookies/storage
   // Check: https://example.com vs http://example.com
   // (https and http are different!)
   ```

3. **Service Worker interfering**
   ```javascript
   // If using Service Workers, make sure they don't block storage
   // Check Service Worker code for localStorage usage
   ```

## Debugging Checklist

When something isn't working:

- [ ] Open browser DevTools (F12)
- [ ] Check Console tab for errors
- [ ] Type in console: `localStorage.getItem('user')`
- [ ] Should show user data or null, not undefined
- [ ] Add debug logging to storage listener
- [ ] Open same page in 2 tabs
- [ ] Check console in both tabs
- [ ] Perform action in Tab 1
- [ ] Look for "storage event" log in Tab 2
- [ ] Verify state changed in Tab 2

## Advanced Debugging

### Monitor All Storage Changes

```javascript
// Put in browser console
window.addEventListener('storage', (e) => {
  console.table({
    'Key Changed': e.key,
    'New Value': e.newValue?.substring(0, 50) + '...',
    'Old Value': e.oldValue?.substring(0, 50) + '...',
    'Timestamp': new Date().toLocaleTimeString()
  });
});
```

### Check Storage Size

```javascript
// In console
const size = new Blob(Object.values(localStorage)).size;
console.log(`Total storage: ${(size / 1024).toFixed(2)} KB`);
console.log('Items:', Object.keys(localStorage).length);
```

### Simulate Storage Event

```javascript
// Test that listener works
const event = new StorageEvent('storage', {
  key: 'user',
  newValue: JSON.stringify({ name: 'Test' }),
  oldValue: null,
  storageArea: localStorage
});
window.dispatchEvent(event);
// Check if listener reacted
```

### Clear All Storage (if needed)

```javascript
// Clear everything (WARNING: loses all data!)
localStorage.clear();

// Or clear specific key
localStorage.removeItem('user');
localStorage.removeItem('tasks');
```

## When to Contact Support

If you've tried all above and still having issues:

1. **Document the problem**
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS version
   - Console errors

2. **Provide debug info**
   ```javascript
   // In console, provide this:
   console.log({
     localStorage: Object.entries(localStorage),
     browserSupport: 'storage' in window,
     storageQuota: navigator.storage?.estimate?.(),
     url: window.location.href
   });
   ```

3. **Check version compatibility**
   - React version
   - Browser version
   - Node version

## Summary

Most issues are caused by:
1. ❌ Forgetting to save to localStorage
2. ❌ Storage listener not attached
3. ❌ Using wrong storage keys
4. ❌ Not handling errors
5. ❌ localStorage disabled in private mode

**Solutions:**
- ✅ Always save on state change
- ✅ Attach listeners in useEffect
- ✅ Use consistent key names
- ✅ Add error handling
- ✅ Check storage availability

Follow the checklist above and most issues will be solved!
