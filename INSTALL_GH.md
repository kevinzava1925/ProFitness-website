# Install GitHub CLI (gh)

## 🚀 Installation Methods

### Method 1: Homebrew (Recommended for macOS)

If you get permission errors, first fix Homebrew permissions:

```bash
# Fix Homebrew permissions
sudo chown -R $(whoami) /opt/homebrew/Cellar
sudo chown -R $(whoami) /opt/homebrew/Library

# Then install GitHub CLI
brew install gh
```

### Method 2: Direct Download (If Homebrew doesn't work)

1. **Download the installer**:
   - Visit: https://github.com/cli/cli/releases/latest
   - Download `gh_*_macOS_amd64.tar.gz` (or `arm64` for Apple Silicon)

2. **Extract and install**:
   ```bash
   # Extract
   tar -xzf gh_*_macOS_*.tar.gz
   
   # Move to /usr/local/bin (or /opt/homebrew/bin for Apple Silicon)
   sudo mv gh_*/bin/gh /usr/local/bin/gh
   
   # Or for Apple Silicon:
   sudo mv gh_*/bin/gh /opt/homebrew/bin/gh
   ```

### Method 3: Using npm (Alternative)

```bash
npm install -g @github/cli
```

## ✅ Verify Installation

After installation, verify it works:

```bash
gh --version
```

You should see something like:
```
gh version 2.x.x (xxxx-xx-xx)
```

## 🔐 Authenticate with GitHub

After installation, authenticate:

```bash
gh auth login
```

Follow the prompts:
1. Choose "GitHub.com"
2. Choose "HTTPS" (recommended) or "SSH"
3. Authenticate via web browser or token

## 🚀 Use GitHub CLI to Push

After authentication, you can push without issues:

```bash
# Authenticate (first time only)
gh auth login

# Push your changes
git push origin main
```

## 📚 More Information

- GitHub CLI Docs: https://cli.github.com/manual/
- Installation Guide: https://github.com/cli/cli/blob/trunk/docs/install_gh.md

---

**Status**: Run the installation commands above in your terminal!



