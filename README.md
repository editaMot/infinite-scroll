# Nature Lovers

Welcome to Nature Lovers – a web application designed to showcase an infinite scroll experience for nature enthusiasts.

## Features:

1. Infinite Scrolling: Users can continuously scroll through nature photos without needing to manually load more content. As the user scrolls down the page, new images automatically load and display, providing a seamless browsing experience.
2. Filter Photos by Categories: Users can filter the displayed photos based on specific categories such as Mountains, Forests, Beaches, and Sunsets. By selecting a category, the gallery updates to show only images that match the chosen filter.
3. Favourite/Unfavourite Photos: Users can mark photos as favorites by clicking a "Favourite" button. This action adds the photo to their list of favorites, making it easy to revisit later. Users can also remove photos from their favorites list by clicking "Unfavourite" button.
4. View Favourite Photos: Users can access a dedicated section to view all their favorited photos in one place. This feature provides a convenient way to browse through and manage all the photos they have marked as favorites, allowing for quick access to their preferred images.

## Technology Stack:

1. Vite.js + React
2. Typescript
3. SCSS + CSS module for styling
4. Vitest for testing

## Getting Started

To get up and running with the Nature Lovers project, follow these steps:

### Clone the Repository

Begin by cloning the project repository to your local machine:

```bash
git clone https://github.com/yourusername/nature-lovers.git
```

### Install Dependencies

Navigate to the project directory and install the required dependencies using npm:

```bash
cd nature-lovers
npm install
```

### Configure Environment

The Nature Lovers project requires a Flickr API key to fetch and display photos. To configure your environment:

1. Obtain a Flickr API Key:
   - Go to the Flickr API page.
   - Sign in with your Flickr account or create a new one.
   - Follow the instructions to create a new API application and get your API key.
2. Create a .env File:
   - In the root of the project directory, create a .env file if it does not already exist.
   - Add the following line to the .env file, replacing YOUR_FLICKR_API_KEY with the API key you obtained:

```bash
VITE_APP_API_KEY=YOUR_FLICKR_API_KEY
```

### Start the Development Server

To start the development server and launch the application locally, run:

```bash
npm run dev
```

Open your web browser and go to http://localhost:5173 to see the application in action.

### Build for Production

To create a production build of the application, use the following command:

```bash
npm run build
```

This command generates optimized build files in the dist directory, ready for deployment.

### Running Tests

To run the tests and ensure the application is functioning correctly, execute:

```bash
npm test
```

### Viewing Test Results with Vitest UI

For a detailed view of test results and to interact with Vitest's test interface, use the following command:

```bash
npm run test:ui
```

This will start the Vitest UI, allowing you to see real-time updates and details about your test runs, making it easier to debug and analyze test results.

## Additional Resources

- [Flickr API Documentation](https://www.flickr.com/services/api/)
- [Vite.js Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)
- [Jest DOM Documentation](https://github.com/testing-library/jest-dom)
