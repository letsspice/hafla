# Hafla

Hafla is a ticketing system designed to help event organizers streamline the process of managing and selling tickets for events. Whether you're hosting a tech conference, a music festival, or a community meetup, Hafla provides a simple and efficient way to handle event registration, ticket purchases, and attendee management.

The platform is built with the goal of providing a seamless experience for both attendees and organizers. Attendees can easily browse events, purchase tickets, and receive reminders before the event. Organizers can create events, manage ticket sales, and track attendees in real-time.

This application will help us practice:
1. Building a RESTful API using Ruby on Rails for handling events, ticket types, and user registrations.
2. Implementing secure user authentication and authorization using [Devise](https://github.com/heartcombo/devise).
3. Integrating a payment gateway (Stripe) for processing ticket purchases.
4. Sending event tickets via email (PDF/QR codes) and optional SMS notifications.
5. Setting up background jobs for sending event reminders (using [Sidekiq](https://sidekiq.org/)).
6. Writing integrated unit tests with the [Rspec](https://rspec.info/) library to test API endpoints.
7. Documenting the API using the [Rswag](https://github.com/rswag/rswag) library to create API documentation.
8. Deploying the application on [Render](https://render.com/) for live access.

Enjoy using Hafla to manage your next event!

# Built With

This application leverages modern tools and Ruby on Rails gems to deliver a seamless ticketing experience:

- **Ruby on Rails 7.1** — The main web framework for building scalable backend and frontend logic.
- **PostgreSQL** — Reliable and robust database system for storing app data.
- **Devise** — Authentication solution for user login, registration, and password recovery.
- **Sidekiq** — For running background jobs such as sending event reminders.
- **FriendlyId** — Human-readable and SEO-friendly URLs for events and user profiles.
- **PaperTrail** — Track changes and versioning of important models like events and tickets.
- **TailwindCSS (via `tailwindcss-rails`)** — Utility-first CSS framework for styling the frontend.
- **Turbo + Stimulus (Hotwire)** — Enhance UX with reactive updates and faster page loads.
- **ActiveStorage** — Upload and manage images (e.g., event banners).
- **Rspec + Capybara** — For comprehensive unit and system testing.
- **Dotenv-Rails** — Manage environment variables securely.
- **Annotate** — Automatically add schema details as comments in your models.
- **Bullet** — N+1 query detection during development to improve performance.

These tools ensure Hafla is secure, performant, and developer-friendly.


# Additional Tools
1. Rubocop (for code style enforcement)
2. Ruby Gems

# Getting Started
To get a local copy of the project and run it on your machine:

1. ``git clone git@github.com:letsspice/hafla.git``
2. ``cd hafla``
3. ``gem install bundler``
4. ``bundle install``
5. ``./bin/dev``

## Database Setup
To set up the database:

1. Create a `.env` file at the root of the project and add your database credentials(below are examples):
   ``
   DATABASE_USERNAME=nemwel
   DATABASE_PASSWORD=root
  ``

## Set up PostgreSQL roles:
To set up the roles:

1. ``su - postgres``
2. ``psql``
3. ``create role nemwel with createdb login password 'root'``
4. ``rails db:setup``
5. ``rails db:create``
6. ``rails db:seed``

# Tests

1. Run tests: ``bundle exec rspec``
2. Run Rubocop: ``rubocop``

### Run your tests

1. ``rake`` 
2. ``rspec``

### To run Rubocop we use:

1. ``rubocop``

### To autocorrect offenses with Rubocop we use:

1. ``rubocop --auto-correct-all`` or
2. ``rubocop -A``

Have fun with TDD!

## 🐳 Developing with Dev Containers (VS Code)

This project supports [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) to provide a consistent, containerized development environment using Docker and Visual Studio Code.

### 📦 Requirements

- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

---

### 🚀 Getting Started

1. **Open the Project in VS Code**

   Open the project folder in VS Code. If you have the Dev Containers extension installed, it will prompt:

   > "Reopen in Container"

   Click that, or manually open the Command Palette (`Cmd/Ctrl + Shift + P`) and run:


2. **Initial Setup**

The container will automatically:

- Install Ruby, Node.js (if configured), and system libraries
- Install all gems using `bundle install`
- Set up your Rails environment

3. **Run the Rails App**

After the container is ready:

```bash
bin/setup
bin/rails db:create db:migrate
bin/rails server -b 0.0.0.0

3. **Access the Application**

Open your browser at: ```http://localhost:3000```



## Authors

👤 **Nemwel Boniface**

- GitHub: [@Nemwel-Boniface](https://github.com/Nemwel-Boniface)
- Twitter: [@nemwel_bonie](https://twitter.com/nemwel_bonie)
- LinkedIn: [Nemwel Boniface](https://www.linkedin.com/in/nemwel-nyandoro/)

👤 **Annastacia Mumbua**

- GitHub: [@Annastacia-dev](https://github.com/Annastacia-dev)
- Twitter: [@Annastacia Mumbua](https://twitter.com/)
- LinkedIn: [Annastacia Mumbua](https://www.linkedin.com/in/annastacia-mumbua/)


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/letsspice/hafla/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments
- Anyone whose code will be used

## 📝 License

This project is [MIT](./MIT.md) licensed.
