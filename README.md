# 🚀 API Unit Tests with Continuous Integration Pipeline
#### 🔥 Software Systems Testing project 🚀
## 🎨 State of the art
1. Testarea unitara[^1]
   - reprezinta testarea unei bucati mici de cod, cum ar fi o functie
2. Testarea unitara a API-urilor[^2]
   - ne asigura ca parametrii sunt folositi corect de catre endpoint si ca acesta ne ofera un HTTP response la care ne asteptam, care poate fi o serie de date sau o eroare, de obicei in format JSON
   - ne ajuta sa ne asiguram ca payload-ul este scris corect, de exemplu: trimitem un POST request catre server, iar in payload am scris city in loc de City care este numele cunoscut de baza de date
3. Integrarea continua [^3]
   - este o tehnica folosita in dezvoltarea software prin care codul este incarcat intr-un repository abia dupa ce a fost rulat cu succes un build si dupa ce a trecut de o serie de teste, garantand calitatea codului si minimizand numarul de bug-uri din aplicatie
## 📦 ☁️ Servicii si resurse
1. Express[^4]: framework web pe care il voi folosi pentru a face request-urile HTTP si a configura rutele
2. Jest[^5]: framework de testare pentru JS, pe care il voi folosi pentru testele unitare
3. Supertest[^6]: framework de testare pentru request-uri HTTP, care ne scuteste de necesitatea de a avea un server pornit cand ruleaza testele
4. MongoDB Atlas[^11]: platforma cloud prin care accesez o baza de date non-relationala deja populata[^7] si ma conectez la aceasta printr-un server hostat pe Azure
5. dotenv[^12]: un secret manager pe care il folosesc sa pastrez secret connection string-ul pentru baza de date intr-un fisier .env
6. GitHub Actions[^8]: platforma care ne ajuta sa automatizam integrarea continua a aplicatiei
7. Swagger[^9]: unealta care ne ajuta sa vizualizam in detaliu toate endpoint-urile unui API si ne permite si sa testam manual
8. Postman[^10]: unealta prin care putem face request-uri si vedea apoi response-ul pentru testarea manuala a API-ului
## 🛠️ Configuratie Hardware
- CPU: Intel Core i5-1135G7
- GPU: Intel TigerLake-LP GT2
- RAM: 16 GB
- Stocare: SSD 512GB
## 🖥️ Configuratie Software
- SO: Fedora Linux 41 in dual boot
- IDE: JetBrains WebStorm 2024.3.5

## Baza de date
Baza de date non-relationala pre-populata de la MongoDB Atlas, pe modelul Airbnb: https://www.mongodb.com/docs/atlas/sample-data/sample-airbnb/

## Testarea unitara
Au fost testate unitar 3 endpoint-uri:
1. GET /airbnb/id
2. GET /airbnb/with-facility
3. GET /airbnb/best-by-location

#### Rularea testelor din command-line
[![TSS Teste din command-line](https://img.youtube.com/vi/v-UOShSeid0/0.jpg)](https://www.youtube.com/watch?v=v-UOShSeid0)
#### Rularea testelor din IDE
[![TSS Teste IDE](https://img.youtube.com/vi/TVB_Luna6gM/0.jpg)](https://www.youtube.com/watch?v=TVB_Luna6gM)

## Testarea manuala
API-ul poate fi testat si manual, cu ajutorul Postman si Swagger:
1. Postman
   
   [![TSS Postman](https://img.youtube.com/vi/4ih5s27cU3Q/0.jpg)](https://www.youtube.com/watch?v=4ih5s27cU3Q)
2. Swagger

   [![TSS Swagger](https://img.youtube.com/vi/n74kC3gedZs/0.jpg)](https://www.youtube.com/watch?v=n74kC3gedZs)
   
## Integrare continua
![flow-ci drawio](https://github.com/user-attachments/assets/a169e56f-c8c9-4a3f-b387-a297f9574cfc)
Integrarea continua cu GitHub Actions

### Script-ul de integrare continua
● Rulează pe o mașină virtuală cu Ubuntu

● Instaleaza pachetele din npm cu ‘npm ci’, mai eficienta decat ‘npm install’ in acest context

● Rulează build-ul programului cu npm run build

● Rulează testele unitare cu npm test

● Variabilele necesare pentru conectarea la baza de date sunt stocate ca secrete in GitHub Actions

![image](https://github.com/user-attachments/assets/b48351d1-4f3d-4899-81ba-47bec863dfb5)


[![TSS GitHub Actions](https://img.youtube.com/vi/XfY3INpJAWI/0.jpg)](https://www.youtube.com/watch?v=XfY3INpJAWI)


[Raport despre folosirea Deepseek](RaportAI.md)


[^1]: https://aws.amazon.com/what-is/unit-testing/
[^2]: https://www.postman.com/api-platform/api-testing/
[^3]: https://aws.amazon.com/devops/continuous-integration/
[^4]: https://expressjs.com/
[^5]: https://jestjs.io/
[^6]: https://www.accelq.com/blog/supertest/#tab_67efd0ec331db
[^7]: https://www.mongodb.com/docs/atlas/sample-data/sample-airbnb/
[^8]: https://docs.github.com/en/actions/about-github-actions/understanding-github-actions
[^9]: https://petstore.swagger.io/
[^10]: https://www.postman.com/
[^11]: https://www.mongodb.com/atlas
[^12]: https://www.dotenv.org/blog/2023/03/13/how-to-use-dotenv.html

