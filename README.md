# Hospital Management System - Microservices Architecture

A cloud-native Hospital Management System built using microservices architecture with Docker containerization. This system demonstrates inter-service communication, data consistency, and distributed system design principles.

## Project Overview

This Hospital Management System implements a microservices-based approach to manage doctors, appointments, and notifications in a hospital environment. The system consists of three independent services that communicate via REST APIs over a Docker network.

### Services

1. **Doctor Service** (Port 3001)
   - Manages doctor information and availability
   - Handles appointment slot management
   - Provides doctor details for booking

2. **Appointment Service** (Port 3002)
   - Handles appointment booking and cancellation
   - Communicates with Doctor Service for slot verification
   - Triggers notifications via Notification Service

3. **Notification Service** (Port 3003)
   - Logs appointment confirmations and cancellations
   - Stores notification history
   - Provides notification retrieval endpoints

## Getting Started

### Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- curl or Postman for API testing

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-appointment-system
   ```

2. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Build Docker images for all three services
   - Create a custom bridge network for inter-service communication
   - Start all services with health checks
   - Make them accessible on ports 3001, 3002, and 3003

3. **Verify services are running**
   ```bash
   docker-compose ps
   ```

   You should see all three services in "running" state with healthy status.

4. **Check individual service health**
   ```bash
   curl http://localhost:3001/health
   curl http://localhost:3002/health
   curl http://localhost:3003/health
   ```

## API Endpoints

### Doctor Service (Port 3001)

#### Get all doctors
```
GET /doctors
Response: { total: number, doctors: Doctor[] }
```

#### Get a specific doctor
```
GET /doctors/:id
Response: Doctor object
```

#### Add a new doctor
```
POST /doctors
Request Body: { name, specialization, availableSlots, consultationFee }
Response: { message, doctor: Doctor }
```

#### Update doctor slots
```
PUT /doctors/:id/slots
Request Body: { availableSlots: number }
Response: { message, doctor: Doctor }
```

#### Health check
```
GET /health
Response: { status, service, timestamp }
```

### Appointment Service (Port 3002)

#### Book a new appointment
```
POST /appointments
Request Body: {
  doctorId: number,
  patientName: string,
  patientEmail: string,
  appointmentDate: date,
  appointmentTime: string
}
Response: { message, appointment: Appointment }
```

#### Get all appointments
```
GET /appointments
Response: { total: number, appointments: Appointment[] }
```

#### Get a specific appointment
```
GET /appointments/:id
Response: Appointment object
```

#### Cancel an appointment
```
PUT /appointments/:id/cancel
Response: { message, appointment: Appointment }
```

#### Health check
```
GET /health
Response: { status, service, timestamp }
```

### Notification Service (Port 3003)

#### Send a notification
```
POST /notify
Request Body: {
  appointmentId: number,
  patientEmail: string,
  type: "confirmation" | "cancellation",
  message: string
}
Response: { message, notification: Notification }
```

#### Get all notifications
```
GET /notifications
Response: { total: number, notifications: Notification[] }
```

#### Get notifications for a patient
```
GET /notifications/patient/:email
Response: { patientEmail, total: number, notifications: Notification[] }
```

#### Health check
```
GET /health
Response: { status, service, timestamp }
```

## Complete Test Scenario

Follow these steps to verify the entire system works correctly:

1. **Start all services**
   ```bash
   docker-compose up
   ```

2. **Get all doctors**
   ```bash
   curl http://localhost:3001/doctors
   ```
   Expected: 3 doctors with different specializations

3. **Check Doctor ID 1 availability**
   ```bash
   curl http://localhost:3001/doctors/1
   ```
   Expected: Doctor with 5 available slots

4. **Book an appointment**
   ```bash
   curl -X POST http://localhost:3002/appointments \
     -H "Content-Type: application/json" \
     -d '{
       "doctorId": 1,
       "patientName": "John Doe",
       "patientEmail": "john@example.com",
       "appointmentDate": "2025-02-15",
       "appointmentTime": "10:00 AM"
     }'
   ```
   Expected: Appointment created successfully

5. **Verify slots decreased**
   ```bash
   curl http://localhost:3001/doctors/1
   ```
   Expected: Doctor now has 4 available slots

6. **Check notifications**
   ```bash
   curl http://localhost:3003/notifications
   ```
   Expected: Confirmation notification logged

7. **Get patient notifications**
   ```bash
   curl http://localhost:3003/notifications/patient/john@example.com
   ```
   Expected: Confirmation notification for the patient

8. **Cancel the appointment**
   ```bash
   curl -X PUT http://localhost:3002/appointments/1/cancel
   ```
   Expected: Appointment cancelled

9. **Verify slots increased**
   ```bash
   curl http://localhost:3001/doctors/1
   ```
   Expected: Doctor now has 5 available slots again

10. **Check cancellation notification**
    ```bash
    curl http://localhost:3003/notifications
    ```
    Expected: Cancellation notification logged

## Design Decisions

### Service Communication
- REST APIs over HTTP for simplicity and standard practice
- Services communicate via Docker network using service names as hostnames
- Error resilience with logging

### Data Storage
- In-memory storage for simplicity (persistent databases in production)
- Atomic operations per service

### Health Checks
- Docker health checks configured for automatic restart
- HTTP-based `/health` endpoints on each service

### Networking
- Custom bridge network for service discovery
- Fixed subnet for predictable communication

## File Structure

```
healthcare-appointment-system/
├── doctor-service/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── appointment-service/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── notification-service/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
├── README.md
├── postman-collection.json
└── screenshots/
    ├── docker-running.png
    ├── postman-test.png
    └── notification-logs.png
```

## Technologies Used

- Node.js 18 Alpine
- Express.js
- Axios
- Docker
- Docker Compose

## Troubleshooting

### Services not starting
```bash
docker-compose logs doctor-service
docker-compose logs appointment-service
docker-compose logs notification-service
```

### Clean up
```bash
docker-compose down -v
docker-compose down --rmi all
```

## Cloud Native Applications - Class Assessment 2

Total Marks: 100
- Doctor Service: 20 marks
- Appointment Service: 25 marks
- Notification Service: 15 marks
- Docker & Docker Compose: 30 marks
- Testing & Documentation: 10 marks
