# Keycloak Config

1. Create a new realm 'moneygpt' with Display name 'MoneyGPT'
2. Realm -> Login -> enable User Registration, disable login with email
3. Realm -> Security Defences -> set Content-Security-Policy "frame-src 'self' http://localhost:3000 http://localhost:8080; frame-ancestors 'self'  http://localhost:3000 http://localhost:8080; object-src 'none';"
3. Create a new client called 'money-app'
4. Client -> money-app -> Settings ->  name 'Money App, valid redirect URIs: *, web origins: *
5. Client -> money-app -> Settings -> Client Authentication off