# BLOGGY

# A simple article publishing service

# Requirements
- Node v.16+
- NPM v.8+

# Setup
1. Clone this Github repo to your computer.
```sh 
    git clone https://github.com/teniolafatunmbi/bloggy.git
```

2. Install project dependencies.
```sh
    npm install
```

3. Start the development server.
```sh
    npm run dev
```

4. Visit `http://localhost:5173` to test the app.

5. Run `npm run test` to run test suite.


# IMPORTANT NOTES:
- All articles are fetched once and cached on the client upon refresh.
- Newly created articles by user are not persisted upon refresh.
- Articles filtering is done on the client-side - JSONTypicode doesn't support article filtering by the params requested.
- User creation is mocked on the client-side. JSONTypicode doesn't support user creation.
- IDs for users and articles upon creation are inferred from last existing user and article respectively. JSONTypicode is limited in this regard as well.
