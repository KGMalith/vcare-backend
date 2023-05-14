-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: vcare
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `archive`
--

DROP TABLE IF EXISTS `archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` bigint DEFAULT NULL,
  `fromModel` varchar(255) DEFAULT NULL,
  `originalRecord` longtext,
  `originalRecordId` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive`
--

LOCK TABLES `archive` WRITE;
/*!40000 ALTER TABLE `archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_incrementals`
--

DROP TABLE IF EXISTS `code_incrementals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code_incrementals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `generated_id` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_incrementals`
--

LOCK TABLES `code_incrementals` WRITE;
/*!40000 ALTER TABLE `code_incrementals` DISABLE KEYS */;
INSERT INTO `code_incrementals` VALUES (1,'2023-05-01 17:02:30','2023-05-13 06:58:50','USR',2);
/*!40000 ALTER TABLE `code_incrementals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `doctor_code` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_signup_completed` double DEFAULT NULL,
  `hash_code` varchar(255) DEFAULT NULL,
  `hash_code_expire` datetime DEFAULT NULL,
  `is_email_confirmation_sent` double DEFAULT NULL,
  `forgot_password_requested` double DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `doctor_code` (`doctor_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_documents`
--

DROP TABLE IF EXISTS `employee_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `document_code` varchar(255) DEFAULT NULL,
  `document_name` varchar(255) DEFAULT NULL,
  `document_desc` varchar(255) DEFAULT NULL,
  `document_URL` varchar(255) DEFAULT NULL,
  `emp_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `document_code` (`document_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_documents`
--

LOCK TABLES `employee_documents` WRITE;
/*!40000 ALTER TABLE `employee_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_emergency_contacts`
--

DROP TABLE IF EXISTS `employee_emergency_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_emergency_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  `emp_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_emergency_contacts`
--

LOCK TABLES `employee_emergency_contacts` WRITE;
/*!40000 ALTER TABLE `employee_emergency_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_emergency_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `emp_code` varchar(255) DEFAULT NULL,
  `is_user_account_exists` double DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `hired_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `personal_mobile` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `bank_branch` varchar(255) DEFAULT NULL,
  `bank_account_no` varchar(255) DEFAULT NULL,
  `bank_account_name` varchar(255) DEFAULT NULL,
  `home_address` varchar(255) DEFAULT NULL,
  `employment_type` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `emp_code` (`emp_code`),
  UNIQUE KEY `nic` (`nic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_bill_services`
--

DROP TABLE IF EXISTS `hospital_bill_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital_bill_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `hospital_bill_id` int DEFAULT NULL,
  `hospital_service_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_bill_services`
--

LOCK TABLES `hospital_bill_services` WRITE;
/*!40000 ALTER TABLE `hospital_bill_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital_bill_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_bills`
--

DROP TABLE IF EXISTS `hospital_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital_bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `bill_code` varchar(255) DEFAULT NULL,
  `gross_total` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `received_amount` double DEFAULT NULL,
  `grand_total` double DEFAULT NULL,
  `status` double DEFAULT NULL,
  `payment_type` double DEFAULT NULL,
  `patient_admission` int DEFAULT NULL,
  `patient_appointment` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `bill_code` (`bill_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_bills`
--

LOCK TABLES `hospital_bills` WRITE;
/*!40000 ALTER TABLE `hospital_bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital_bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_rooms`
--

DROP TABLE IF EXISTS `hospital_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital_rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `room_number` varchar(255) DEFAULT NULL,
  `room_desc` varchar(255) DEFAULT NULL,
  `room_charge` double DEFAULT NULL,
  `room_status` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_rooms`
--

LOCK TABLES `hospital_rooms` WRITE;
/*!40000 ALTER TABLE `hospital_rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_services`
--

DROP TABLE IF EXISTS `hospital_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `service_code` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_desc` varchar(255) DEFAULT NULL,
  `service_charge` double DEFAULT NULL,
  `status` double DEFAULT NULL,
  `is_apply_to_every_appointment` double DEFAULT NULL,
  `is_apply_to_every_admission` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_services`
--

LOCK TABLES `hospital_services` WRITE;
/*!40000 ALTER TABLE `hospital_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_admission_doctor`
--

DROP TABLE IF EXISTS `patient_admission_doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_admission_doctor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `admission_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_admission_doctor`
--

LOCK TABLES `patient_admission_doctor` WRITE;
/*!40000 ALTER TABLE `patient_admission_doctor` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_admission_doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_admissions`
--

DROP TABLE IF EXISTS `patient_admissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_admissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `admission_code` varchar(255) DEFAULT NULL,
  `admit_date` datetime DEFAULT NULL,
  `discharge_date` datetime DEFAULT NULL,
  `status` double DEFAULT NULL,
  `hospital_room` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_admissions`
--

LOCK TABLES `patient_admissions` WRITE;
/*!40000 ALTER TABLE `patient_admissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_admissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_appointment`
--

DROP TABLE IF EXISTS `patient_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `appointment_code` varchar(255) DEFAULT NULL,
  `appointment_start_date` datetime DEFAULT NULL,
  `appointment_end_date` datetime DEFAULT NULL,
  `status` double DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_appointment`
--

LOCK TABLES `patient_appointment` WRITE;
/*!40000 ALTER TABLE `patient_appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_documents`
--

DROP TABLE IF EXISTS `patient_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `document_code` varchar(255) DEFAULT NULL,
  `document_name` varchar(255) DEFAULT NULL,
  `document_desc` varchar(255) DEFAULT NULL,
  `document_URL` varchar(255) DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_documents`
--

LOCK TABLES `patient_documents` WRITE;
/*!40000 ALTER TABLE `patient_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_emergency_contacts`
--

DROP TABLE IF EXISTS `patient_emergency_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_emergency_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_emergency_contacts`
--

LOCK TABLES `patient_emergency_contacts` WRITE;
/*!40000 ALTER TABLE `patient_emergency_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_emergency_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `patient_code` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_signup_completed` double DEFAULT NULL,
  `hash_code` varchar(255) DEFAULT NULL,
  `hash_code_expire` datetime DEFAULT NULL,
  `is_email_confirmation_sent` double DEFAULT NULL,
  `forgot_password_requested` double DEFAULT NULL,
  `is_invitation_sent` double DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `permission_name` varchar(255) DEFAULT NULL,
  `permission_category` varchar(255) DEFAULT NULL,
  `permission_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,NULL,NULL,'Add User','Users','Add new user'),(2,NULL,NULL,'View Users','Users','View all users'),(3,NULL,NULL,'View User Details','Users','View all users'),(4,NULL,NULL,'Update User Status','Users','Update user status as active or inactive'),(5,NULL,NULL,'Update User','Users','Update user details'),(6,NULL,NULL,'Update Timezone','Settings','Update system Time zone'),(7,NULL,NULL,'View Profile','Settings','View own profile details'),(8,NULL,NULL,'Update Profile','Settings','Update own profile details'),(9,NULL,NULL,'Create Service','Services','Create hospital billing service'),(10,NULL,NULL,'Delete Service','Services','Delete hospital billing service'),(11,NULL,NULL,'Update Service','Services','Update hospital billing service'),(12,NULL,NULL,'View Services','Services','View all hospital billing services'),(13,NULL,NULL,'View Service Details','Services','View hospital billing service details'),(14,NULL,NULL,'Update Service Status','Services','Update hospital billing service status as active or inactive'),(15,NULL,NULL,'Create Room','Rooms','Create hospital room'),(16,NULL,NULL,'Delete Room','Rooms','Delete hospital room'),(17,NULL,NULL,'Update Room','Rooms','Update hospital room'),(18,NULL,NULL,'View Rooms','Rooms','View all hospital rooms'),(19,NULL,NULL,'View Room Details','Rooms','View hospital room details'),(20,NULL,NULL,'Update Room Status','Rooms','Update hospital room status as available or taken or cleaning or closed for maintenance or waiting for cleaning'),(21,NULL,NULL,'Create Role','Roles','Create role'),(22,NULL,NULL,'Delete Role','Roles','Delete role'),(23,NULL,NULL,'Update Role','Roles','Update role'),(24,NULL,NULL,'View Roles','Roles','View all roles'),(25,NULL,NULL,'View Role Details','Roles','View role details'),(26,NULL,NULL,'Update Role Permission Status','Roles','Update role assigned permissions as active or inactive'),(27,NULL,NULL,'Add Patient Emergency Contact','Patient','Add patient emergancy contact details'),(28,NULL,NULL,'Delete Patient Emergency Contact','Patient','Delete patient emergancy contact details'),(29,NULL,NULL,'Add Patient Documents','Patient','Add patient documents'),(30,NULL,NULL,'Delete Patient Documents','Patient','Delete patient documents'),(31,NULL,NULL,'View Patient Details','Patient','View patient details'),(32,NULL,NULL,'View All Patient','Patient','View all patients'),(33,NULL,NULL,'Add Employee','Employee','Create employee'),(34,NULL,NULL,'Delete Employee','Employee','Delete employee'),(35,NULL,NULL,'Update Employee','Employee','Update employee'),(36,NULL,NULL,'View Employees','Employee','View all employees'),(37,NULL,NULL,'View Employee Details','Employee','View employee details'),(38,NULL,NULL,'Add Employee Emergency Contact','Employee','Add employee emergancy contact details'),(39,NULL,NULL,'Delete Employee Emergency Contact','Employee','Delete employee emergancy contact details'),(40,NULL,NULL,'Add Employee Documents','Employee','Add employee documents'),(41,NULL,NULL,'Delete Employee Documents','Employee','Delete employee documents'),(42,NULL,NULL,'View Doctor Details','Doctor','View doctor details'),(43,NULL,NULL,'View All Doctors','Doctor','View all doctors'),(44,NULL,NULL,'Add Bill Service','Bill','Add billing service to bill'),(45,NULL,NULL,'Delete Bill Service','Bill','Delete billing service to bill'),(46,NULL,NULL,'Finalize Bill','Bill','Finalize bill amount'),(47,NULL,NULL,'Pay Bill','Bill','Bill mark as paid'),(48,NULL,NULL,'View All Bills','Bill','View all bills'),(49,NULL,NULL,'View Bill','Bill','View bill details'),(50,NULL,NULL,'Create Appointment','Appointments','Create appointment'),(51,NULL,NULL,'Cancel Appointment','Appointments','Delete appointment'),(52,NULL,NULL,'View Appointments','Appointments','View all appointments'),(53,NULL,NULL,'View Appointment Details','Appointments','View appointment details'),(54,NULL,NULL,'Create Admission','Admissions','Create admission'),(55,NULL,NULL,'Discharge Patient','Admissions','Discharge patient'),(56,NULL,NULL,'View Admissions','Admissions','View all admissions'),(57,NULL,NULL,'View Admission Details','Admissions','View admission details'),(58,NULL,NULL,'Update Admission','Admissions','Update admission details');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_active` double DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `permission_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,1),(2,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,2),(3,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,3),(4,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,4),(5,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,5),(6,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,6),(7,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,7),(8,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,7),(9,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,7),(10,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,8),(11,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,8),(12,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,8),(13,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,9),(14,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,10),(15,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,11),(16,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,12),(17,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,13),(18,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,14),(19,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,15),(20,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,16),(21,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,17),(22,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,18),(23,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,19),(24,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,20),(25,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,21),(26,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,22),(27,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,23),(28,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,24),(29,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,25),(30,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,26),(31,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,27),(32,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,28),(33,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,29),(34,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,29),(35,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,30),(36,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,30),(37,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,31),(38,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,31),(39,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,32),(40,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,32),(41,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,33),(42,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,34),(43,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,35),(44,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,36),(45,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,37),(46,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,38),(47,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,39),(48,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,40),(49,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,41),(50,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,42),(51,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,43),(52,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,44),(53,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,45),(54,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,46),(55,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,47),(56,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,48),(57,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,48),(58,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,49),(59,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,49),(60,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,50),(61,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,50),(62,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,51),(63,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,51),(64,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,52),(65,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,52),(66,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,52),(67,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,53),(68,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,53),(69,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,53),(70,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,54),(71,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,55),(72,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,56),(73,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,56),(74,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,56),(75,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,57),(76,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,2,57),(77,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,3,57),(78,'2023-05-14 15:45:00','2023-05-14 15:45:00',1,1,58);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `role_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,NULL,NULL,'Admin','Root admin role'),(2,NULL,NULL,'Patient','Patient role'),(3,NULL,NULL,'Doctor','Doctor role');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_code` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_signup_completed` double DEFAULT NULL,
  `hash_code` varchar(255) DEFAULT NULL,
  `hash_code_expire` datetime DEFAULT NULL,
  `is_password_reset_requested` double DEFAULT NULL,
  `is_invitation_sent` double DEFAULT NULL,
  `status` double DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `user_code` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2023-05-01 17:10:28','2023-05-13 12:42:20','USR : 00000001','Malith','Dhananjaya','malithdhananjayaofficial@gmail.com',NULL,'$2b$10$tIGuqmhTUlgmKQjn.VP.Lu6/ilkzOVA.yPasU8tleugIiV3hBz0tS',1,NULL,NULL,0,1,1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-14 21:16:11
