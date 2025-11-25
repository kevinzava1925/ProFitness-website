# Environment Variable Setup

## JWT Secret Key

The JWT secret has been set to: `192525`

### For Local Development

Create a `.env.local` file in the root directory with:

```
JWT_SECRET=192525
```

### For Vercel Deployment

1. Go to your Vercel project: https://vercel.com/kevins-projects-e48f1ee3/profitness-website/settings/environment-variables

2. Add environment variable:
   - **Key**: `JWT_SECRET`
   - **Value**: `192525`
   - **Environment**: Production, Preview, Development (select all)

3. Redeploy your project for the changes to take effect.

## ⚠️ Security Note

**Important**: The current JWT secret (`192525`) is simple and should be changed for production use. For better security, consider using a longer, randomly generated secret:

```bash
# Generate a secure secret
openssl rand -base64 32
```

However, if you prefer to keep `192525`, the system will work with it.

