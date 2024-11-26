Document Management Frontend
===============================

Features
--------

*   Create new documents with a title and content.
*   Edit existing documents to update their title, content, or size.
*   Delete unwanted documents.
*   Search documents in real-time using a debounced search input.
*   Sort documents by different attributes (e.g., size, creation date).
*   Paginate through large document datasets.

Installation
------------

Follow the steps below to install and run the application:

1.  Ensure you have Node.js and npm installed on your machine.
2.  Clone the repository using the following command:
    
        git clone https://github.com/mjey/documents-full-stack.git documents_app
    
3.  Navigate to the project directory:
    
        cd documents_app/frontend
    
4.  Install the dependencies:
    
        npm install
    
5.  Start the development server:
    
        npm start
    

The application will be available at [http://localhost:3000](http://localhost:3000).

API Integration
---------------

The application uses a backend API to fetch, create, update, and delete documents. Below are the endpoints:

*   **GET /documents**: Fetch paginated, sorted, and filtered documents.
*   **GET /documents/:id**: Fetch a single document by its ID.
*   **POST /documents**: Create a new document.
*   **PUT /documents/:id**: Update an existing document.
*   **DELETE /documents/:id**: Delete a document by its ID.
