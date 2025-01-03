# Jurnal-muti-user-integrat-cu-Google-translate

## Introducere
Acesta este un proiect realizat la disciplina Tehnologii Web care are ca scop gestionarea unui jurnal multi-utilizator, care permite utilizatorilor să creeze, editeze și traducă notele lor utilizând **Google Translate API**. Proiectul va include un back-end RESTful și are ca scop integrarea ulterioară cu o interfață front-end SPA care va fi realizată cu **React.js**.

## Stadiul actual
- Back-end configurat cu **Node.js**, **Express.js** și **Sequelize**.
- Două entități definite: 
  - `User` (părinte)
  - `Note` (copil), cu relația `User -> Note` implementată.
- Configurare inițială pentru baza de date utilizând MySQL, inca nu este terminata, am probleme de conectare pe un server local.
- Structura de bază pentru gestionarea utilizatorilor și notelor este implementată.

## Tehnologii utilizate (pentru realizarea intregului proiect)
- **Back-end**:
  - Node.js
  - Express.js
  - Sequelize (ORM pentru MySQL)
  - MySQL (bază de date)
- **Front-end**: (de implementat ulterior)
  - React.js
- **Integrare externă**:
  - Google Translate API (de implementat ulterior)

## Funcționalități implementate
- Conexiune între back-end și baza de date (momentan am o eroare de conectare ce va fi ulterior rezolvată).
- Definiții inițiale pentru entitățile `User` și `Note`.
- Configurare fișier `.env` pentru variabile de mediu.

## Structura proiectului
proiect-tw/ 
├── config/ 
│   └── db.js # Configurare baza de date 
├── models/ 
│   ├── User.js # Modelul pentru entitatea 'User' 
│   ├── Note.js # Modelul pentru entitatea 'Note' 
├── routes/ # Rutele API RESTful (de completat) 
├── server.js # Fișierul principal pentru rularea serverului 
├── .env # Fișier pentru configurarea variabilelor de mediu 
├── package.json # Gestionarea dependențelor 
├── proiect #baza de date
    ├── Users.sql
    ├── Notes.sql
    ├── Script.sql
└── README.md # Documentația proiectului