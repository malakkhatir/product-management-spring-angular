<h1 align="center">📦 Product Management App</h1>

<p align="center">
  Application web <b>CRUD</b> de gestion des produits<br>
  <b>Spring Boot (backend) · Angular (frontend) · MySQL</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate">
</p>

---

## 📌 Présentation

Application web **CRUD** qui permet de gérer un catalogue de **produits**.

- **Backend** : Spring Boot expose une **API REST** (`backend/`)
- **Frontend** : Angular consomme cette API avec une interface moderne Tailwind (`product-frontend/`)
- **Base de données** : MySQL, via Spring Data JPA / Hibernate

---

## 🏗️ Architecture

```text
┌────────────────────────┐
│   Frontend Angular     │
│   localhost:4200       │
│   (Tailwind CSS)       │
└───────────┬────────────┘
            │  HTTP / JSON (CORS)
            ▼
┌────────────────────────┐
│   Spring Boot API      │
│   localhost:8080       │
│   /api/products        │
└───────────┬────────────┘
            │  JPA / Hibernate
            ▼
┌────────────────────────┐
│        MySQL           │
│     products_db        │
└────────────────────────┘
```

---

## ✨ Fonctionnalités

- 📋 **Lister** tous les produits
- ➕ **Ajouter** un produit (modale)
- ✏️ **Modifier** un produit
- 🗑️ **Supprimer** un produit
- 🔍 **Rechercher** par mot-clé
- 🔔 **Alertes** visuelles (succès / erreur / info)
- 📱 Interface **responsive** avec Tailwind CSS

---

## 🧰 Stack technique

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Web · Spring Data JPA · Hibernate
- Lombok
- MySQL 8
- Maven

### Frontend
- Angular 17+
- TypeScript
- Tailwind CSS
- RxJS
- Angular Forms

---

## 📁 Structure du projet

```text
ProductApp/
│
├── backend/                       # Backend Spring Boot (product-api)
│   ├── src/main/java/com/example/productapi/
│   │   ├── controller/
│   │   │   └── ProductController.java
│   │   ├── entity/
│   │   │   └── Product.java
│   │   ├── repository/
│   │   │   └── ProductRepository.java
│   │   ├── service/
│   │   │   └── ProductService.java
│   │   └── ProductApiApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── product-frontend/              # Frontend Angular
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── package.json
│   └── angular.json
│
├── ProductApp.iml                 # Config IntelliJ IDEA
└── README.md
```

---

## 🚀 Installation & Lancement

### Prérequis

| Outil | Version |
|-------|---------|
| Java JDK | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| Angular CLI | 17+ |
| MySQL | 8.0+ |

Vérifier :

```bash
java -version
mvn -version
node -v
ng version
```

---

### 1️⃣ Base de données MySQL

```sql
CREATE DATABASE products_db;
```

### 2️⃣ Backend Spring Boot

**Config** — `backend/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/products_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
server.port=8080
```

**Lancer** :

```bash
cd backend
mvn spring-boot:run
```

→ API sur `http://localhost:8080/api/products`

### 3️⃣ Frontend Angular

```bash
cd product-frontend
npm install
ng serve
```

→ UI sur `http://localhost:4200`

---

## 🔌 API REST — Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/products` | Lister tous les produits |
| `GET` | `/api/products/{id}` | Récupérer un produit par ID |
| `POST` | `/api/products` | Créer un produit |
| `PUT` | `/api/products/{id}` | Modifier un produit |
| `DELETE` | `/api/products/{id}` | Supprimer un produit |
| `GET` | `/api/products/search?keyword=...` | Rechercher |

### Exemple JSON

```json
{
  "id": 1,
  "name": "Laptop HP",
  "price": 899.99,
  "quantity": 15
}
```

### Exemples cURL

```bash
# Lister
curl http://localhost:8080/api/products

# Créer
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop HP","price":899.99,"quantity":15}'

# Rechercher
curl "http://localhost:8080/api/products/search?keyword=laptop"

# Modifier
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop HP Pro","price":1099.99,"quantity":10}'

# Supprimer
curl -X DELETE http://localhost:8080/api/products/1
```

---

## 🗄️ Modèle de données

### Table `products`

| Colonne | Type | Contraintes |
|---------|------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT |
| `name` | VARCHAR(255) | NOT NULL |
| `price` | DOUBLE | NOT NULL |
| `quantity` | INT | NOT NULL |

### Entité JPA

```java
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private int quantity;
}
```

---

## 🎨 Frontend Angular — Fonctionnalités

- 📋 Tableau stylisé des produits
- ➕ Modale d'ajout
- ✏️ Modale d'édition (pré-remplie)
- 🗑️ Suppression avec confirmation
- 🔍 Barre de recherche + bouton Réinitialiser
- 🔔 Alertes visuelles (succès / erreur / info)
- 📱 Responsive (mobile, tablette, desktop)
- ✨ Design Tailwind CSS avec animations

---

## 🛠️ Dépannage

### ❌ CORS

Déjà configuré dans `ProductController` :

```java
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
```

### ❌ MySQL ne se connecte pas

- Vérifie que MySQL est démarré
- Base : `products_db`
- Identifiants dans `application.properties`

### ❌ Port occupé

Change dans `application.properties` :

```properties
server.port=8081
```

---

## 🛣️ Améliorations possibles

- [ ] 🔐 Authentification (Spring Security + JWT)
- [ ] 📄 Pagination backend
- [ ] 📤 Upload d'images
- [ ] 🧪 Tests unitaires (JUnit, Jasmine)
- [ ] 🐳 Dockerisation
- [ ] 📊 Dashboard statistiques
- [ ] 🌙 Mode sombre

---

## 📚 Ressources

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Angular](https://angular.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📄 Licence

Projet pédagogique — **Travaux Pratiques**. Libre d'utilisation à des fins éducatives.

---

## 👩‍💻 Auteure

**Malak Khatir**

