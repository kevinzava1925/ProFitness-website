# Fix Git Push - SSH to HTTPS

## 🔴 Problem
You're getting this error:
```
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

This happens because your git remote is set to use SSH (`git@github.com`), but you don't have SSH keys configured.

## ✅ Solution: Switch to HTTPS

Run this command in your terminal:

```bash
git remote set-url origin https://github.com/kevinzava1925/ProFitness-website.git
```

Then verify it changed:
```bash
git remote -v
```

You should see:
```
origin  https://github.com/kevinzava1925/ProFitness-website.git (fetch)
origin  https://github.com/kevinzava1925/ProFitness-website.git (push)
```

## 🚀 Now Push

After switching to HTTPS, push your changes:

```bash
git push origin main
```

When prompted for credentials:
- **Username**: Your GitHub username (`kevinzava1925`)
- **Password**: Use a **Personal Access Token** (not your GitHub password)

### If You Don't Have a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "ProFitness Website")
4. Select scopes: Check `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

## 🔐 Alternative: Use GitHub CLI

If you have GitHub CLI installed:

```bash
# Authenticate
gh auth login

# Then push
git push origin main
```

## ✅ Verification

After pushing successfully, you should see:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/kevinzava1925/ProFitness-website.git
   [commit-hash]..[commit-hash]  main -> main
```

---

**Status**: Run the commands above in your terminal to fix the push issue!

