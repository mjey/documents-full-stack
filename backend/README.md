Document Management Application Backend
=======================

Installation
------------

```shell
git clone https://github.com/mjey/documents-full-stack.git documents_app
cd documents_app/backend
python -m venv venv     
source venv/bin/activate (on Windows: venv\Scripts\activate)     
pip install -r requirements.txt     
python main.py
```
    
    
Usage
-----

Base URL: `http://127.0.0.1:5000`

### Endpoints

#### List All Documents

`GET /api/documents`

```bash
curl -X GET "http://127.0.0.1:5000/api/documents"
```
    
    

#### Search Documents

`GET /api/documents?search=`

```bash
curl -X GET "http://127.0.0.1:5000/api/documents?search=example"
```
    
    

#### Get a Document

`GET /api/documents/{id}`

```bash
curl -X GET "http://127.0.0.1:5000/api/documents/1"
```
    
    

#### Create a Document

`POST /api/documents`

```bash
curl -X POST "http://127.0.0.1:5000/api/documents" \     
    -H "Content-Type: application/json" \     
    -d '{"name": "New Doc", "content": "Content here"}'
```
    
    

#### Update a Document

`PUT /api/documents/{id}`

```bash
curl -X PUT "http://127.0.0.1:5000/api/documents/1" \     
-H "Content-Type: application/json" \     
-d '{"name": "Updated Name", "content": "Updated content"}'
```
    
    

#### Delete a Document

`DELETE /api/documents/{id}`

```bash
curl -X DELETE "http://127.0.0.1:5000/api/documents/1"
```
    
    

#### Pagination and Sorting

`GET /api/documents?page=&limit=&sort_by=&order=`

```bash
curl -X GET "http://127.0.0.1:5000/api/documents?page=1&limit=5&sort_by=size&order=asc"
```