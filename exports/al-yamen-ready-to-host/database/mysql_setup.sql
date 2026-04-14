CREATE DATABASE IF NOT EXISTS al_yamen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE al_yamen;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'Staff',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50) NOT NULL,
  type VARCHAR(100) NOT NULL,
  customer VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  amount DOUBLE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(100) NOT NULL UNIQUE,
  customer VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  total DOUBLE NOT NULL,
  status VARCHAR(100) NOT NULL DEFAULT 'Pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  last_order VARCHAR(50),
  total_spent DOUBLE NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  price DOUBLE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  status VARCHAR(100) NOT NULL DEFAULT 'Present',
  salary DOUBLE NOT NULL,
  department VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  amount DOUBLE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, name, role)
VALUES ('admin', 'admin', 'System Administrator', 'Administrator')
ON DUPLICATE KEY UPDATE password = VALUES(password), name = VALUES(name), role = VALUES(role);

INSERT INTO customers (name, company, phone, last_order, total_spent)
SELECT 'Ahmed Al-Hadi', 'Al-Hadi Construction', '+967 711 234 567', '2026-04-10', 28400
WHERE NOT EXISTS (SELECT 1 FROM customers LIMIT 1);
INSERT INTO customers (name, company, phone, last_order, total_spent)
SELECT 'Mariam Saleh', 'Sana''a Trading Co.', '+967 733 456 789', '2026-04-08', 17650
WHERE (SELECT COUNT(*) FROM customers) < 2;
INSERT INTO customers (name, company, phone, last_order, total_spent)
SELECT 'Khaled Nasser', 'Nasser Supplies', '+967 777 345 222', '2026-04-06', 9450
WHERE (SELECT COUNT(*) FROM customers) < 3;

INSERT INTO products (name, category, stock, price)
SELECT 'Premium Cement Bags', 'Construction Materials', 420, 8.5
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
INSERT INTO products (name, category, stock, price)
SELECT 'Steel Reinforcement Bars', 'Metals', 180, 24.75
WHERE (SELECT COUNT(*) FROM products) < 2;
INSERT INTO products (name, category, stock, price)
SELECT 'Ceramic Floor Tiles', 'Finishing', 260, 13.25
WHERE (SELECT COUNT(*) FROM products) < 3;
INSERT INTO products (name, category, stock, price)
SELECT 'Industrial Paint Buckets', 'Finishing', 95, 31.00
WHERE (SELECT COUNT(*) FROM products) < 4;

INSERT INTO employees (name, role, status, salary, department)
SELECT 'Omar Alawi', 'Operations Manager', 'Present', 1800, 'Operations'
WHERE NOT EXISTS (SELECT 1 FROM employees LIMIT 1);
INSERT INTO employees (name, role, status, salary, department)
SELECT 'Huda Mansour', 'Accountant', 'Present', 1450, 'Finance'
WHERE (SELECT COUNT(*) FROM employees) < 2;
INSERT INTO employees (name, role, status, salary, department)
SELECT 'Fahd Saleh', 'Warehouse Lead', 'On Leave', 1200, 'Inventory'
WHERE (SELECT COUNT(*) FROM employees) < 3;

INSERT INTO transactions (date, type, customer, description, amount)
SELECT '2026-04-12', 'Sale', 'Al-Hadi Construction', 'Bulk cement and tile order', 8450
WHERE NOT EXISTS (SELECT 1 FROM transactions LIMIT 1);
INSERT INTO transactions (date, type, customer, description, amount)
SELECT '2026-04-11', 'Sale', 'Sana''a Trading Co.', 'Steel materials invoice', 5220
WHERE (SELECT COUNT(*) FROM transactions) < 2;
INSERT INTO transactions (date, type, customer, description, amount)
SELECT '2026-04-10', 'Expense', 'Internal', 'Warehouse maintenance', 980
WHERE (SELECT COUNT(*) FROM transactions) < 3;
INSERT INTO transactions (date, type, customer, description, amount)
SELECT '2026-04-09', 'Sale', 'Nasser Supplies', 'Paint and finishing supplies', 3140
WHERE (SELECT COUNT(*) FROM transactions) < 4;

INSERT INTO orders (order_id, customer, date, total, status)
SELECT 'AY-1001', 'Al-Hadi Construction', '2026-04-12', 8450, 'Completed'
WHERE NOT EXISTS (SELECT 1 FROM orders LIMIT 1);
INSERT INTO orders (order_id, customer, date, total, status)
SELECT 'AY-1002', 'Sana''a Trading Co.', '2026-04-11', 5220, 'Processing'
WHERE (SELECT COUNT(*) FROM orders) < 2;
INSERT INTO orders (order_id, customer, date, total, status)
SELECT 'AY-1003', 'Nasser Supplies', '2026-04-09', 3140, 'Completed'
WHERE (SELECT COUNT(*) FROM orders) < 3;

INSERT INTO expenses (category, amount)
SELECT 'Warehouse', 980
WHERE NOT EXISTS (SELECT 1 FROM expenses LIMIT 1);
INSERT INTO expenses (category, amount)
SELECT 'Transport', 640
WHERE (SELECT COUNT(*) FROM expenses) < 2;
INSERT INTO expenses (category, amount)
SELECT 'Utilities', 420
WHERE (SELECT COUNT(*) FROM expenses) < 3;
