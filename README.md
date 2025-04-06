# 🚀 API Unit Tests with Continuous Integration Pipeline
#### Software Systems Testing project 🚀
## ✅ Features
- 🔥 API: Express.js
- 🔥 Unit tests: Jest & Supertest
- 🔥 Azure Database: MongoDB Atlas
- 🔥 CI: GitHub Actions
- 🔥 Nice to have: Swagger
## State of the art
1. Testarea unitara[^1]
   - reprezinta testarea unei bucati mici de cod, cum ar fi o functie
2. Testarea unitara a API-urilor[^2]
   - ne asigura ca parametrii sunt folositi corect de catre endpoint si ca acesta ne ofera un HTTP response la care ne asteptam, care poate fi o serie de date sau o eroare, de obicei in format JSON
   - ne ajuta sa ne asiguram ca payload-ul este scris corect, de exemplu: trimitem un POST request catre server, iar in payload am scris city in loc de City care este numele cunoscut de baza de date
3. Integrarea continua [^3]
   - este o tehnica folosita in dezvoltarea software prin care codul este incarcat intr-un repository abia dupa ce a fost rulat cu succes un build si dupa ce a trecut de o serie de teste, ambele in mod automat, garantand calitatea codului si minimizand numarul de bug-uri din aplicatie





[^1]: https://aws.amazon.com/what-is/unit-testing/
[^2]: https://www.postman.com/api-platform/api-testing/
[^3]: https://aws.amazon.com/devops/continuous-integration/
