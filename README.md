Buku - A Book Review App

- This app was successfully deployed on Heroku
- This app has a similar concept to Yelp, except this is for reviewing books
- This app used third party API (Google Books API) to retrieve new books information
- This app has a simple login authentication for registered users

Basically, the users of the app are divided into 3 categories: Expert reviewers, Public reviewers, and anonymous users. The anonymous users don't need to login to the app. They can see book reviews from the app, but they can't post reviews. On the other hand, Expert reviewers and Public reviewers need to login to use the app. They can post reviews to the existing books in the app's database, or they can add new books to the database by accessing the Google Books API. The status of the reviewers (Expert and Public) is just a simple attribute at this point. When a new user registers, the user gets a public reviewer status. With similar concept to verified account in Instagram, the user can ask to be verified to be an expert reviewer. Once verified, I can change the status of the user to be an expert. The reviewers can leave only a star rating of the books, or they can also add written reviews of the books. This app has a lot of potentials and ways to be developped, such as to sort the reviews from lower rating to the higher rating, or vice versa, and to filter the reviews of the books based on the expert/public status. It can also be connected to Amazon or other shopping platforms, so that the users can be redirected to the correct link to purchase the books online.
