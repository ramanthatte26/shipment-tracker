# Shipment Tracker Assignment

##  Setup Instructions

### 1. Clone the Project

```bash
git clone <your-repo-link>
cd shipment-tracker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```


---

### 4. Run Backend Server

```bash
npm run dev
```

You should see:

```
MongoDb Connected successfully
Server is running on port 5000
```

---

### 5. Run Frontend

* Open `frontend/index.html` in your browser

---

##  Project Working

This application follows a **client–server architecture** where the frontend interacts with a backend API, and the backend communicates with the database.

---

### 1. Creating a Shipment

* User fills a form (sender, receiver, origin, destination, weight)
* Frontend sends a **POST request** to:

  ```
  /api/shipments
  ```
* Backend:

  * Validates input
  * Generates a unique **tracking ID**
  * Stores shipment data in MongoDB
* Response is sent back with shipment details

---

### 2. Storing Data

* Data is stored in MongoDB using a structured schema
* Each shipment includes:

  * Tracking ID
  * Sender & Receiver details
  * Origin & Destination
  * Status (default: *Booked*)
  * Timestamps

---

### 3. Tracking a Shipment

* User enters tracking ID
* Frontend sends:

  ```
  GET /api/shipments/:trackingID
  ```
* Backend:

  * Searches database using tracking ID
  * Returns shipment details
* Frontend displays shipment info + status

---

### 4. Viewing Shipment History

* Frontend calls:

  ```
  GET /api/shipments
  ```
* Backend returns all shipments sorted by latest
* Data is displayed in table format

---

### 5. Updating Shipment Status (Admin Flow)

* Admin selects a shipment
* Sends:

  ```
  PUT /api/shipments/:trackingID
  ```
* Backend:

  * Updates shipment status (Booked → Transit → Delivered)
  * Returns updated data

---

### Data Flow

```
User Action → Frontend (HTML/JS)
           → API Request (Fetch)
           → Backend (Express Server)
           → Database (MongoDB)
           → Response → Frontend UI Update
```

---

### Idea

The system works by:

* Assigning a **unique tracking ID** to every shipment
* Using that ID as the **single source of truth**
* Allowing all operations (track, update, fetch) based on that ID

