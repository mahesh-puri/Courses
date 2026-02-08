---
title: "1-internet-and-servers"
tags: [linux, networking, devops, docker-course]
---

# How the Internet Works & Where Servers Fit In

## 🎯 Goal

Understand **why Linux + networking matter** by building the mental model of how the internet actually works.

Before learning networking commands, you must understand **what problem they solve**.

---

# 1️⃣ The Internet — Simple Mental Model

The internet is just:

```
Millions of computers connected together
communicating using standard protocols
```

Nothing magical.

Every app you use is just **one computer talking to another computer**.

Examples:

| What you do       | What really happens                   |
| ----------------- | ------------------------------------- |
| Open a website    | Your laptop talks to a web server     |
| Send WhatsApp msg | Your phone talks to messaging servers |
| Push to GitHub    | Your PC talks to GitHub servers       |
| Use ChatGPT       | Browser talks to AI servers           |

Everything = **client ↔ server communication**

---

# 2️⃣ Client vs Server

## Client

The machine that **requests** something.

Examples:

- Browser
- Mobile app
- curl / Postman
- kubectl
- git

## Server

The machine that **provides** something.

Examples:

- Web servers
- Database servers
- API servers
- SSH servers
- Email servers

---

## 💡 Core Mental Model

A server is simply:

```
A computer running a program
that listens on a network port
waiting for requests
```

That’s it.

---

# 3️⃣ What Makes a Machine a Server?

A machine becomes a server when:

1. It has an **IP address**
2. A **process is running**
3. The process is **listening on a port**
4. Other machines can reach it over network

```
IP + Port + Running Process = Server
```

Example:

```
142.250.183.14:443 → Google web server
```

---

# 4️⃣ How Two Computers Talk

Communication happens using **protocols**.

A protocol is simply a **set of rules for communication**.

Think:

- Human conversation → language (English)
- Computer conversation → protocol (HTTP, SSH, DNS)

---

# 5️⃣ The Role of TCP/IP

All internet communication runs on **TCP/IP**.

Simplified layers:

| Layer       | Role            |
| ----------- | --------------- |
| Application | HTTP, SSH, DNS  |
| Transport   | TCP / UDP       |
| Network     | IP              |
| Physical    | WiFi / Ethernet |

You mostly work in the **Application layer**.

---

# 6️⃣ What Happens When You Open a Website

When you type:

```
https://google.com
```

This happens in milliseconds:

1. Browser asks DNS → “What is google.com IP?”
2. DNS returns IP address.
3. Browser opens TCP connection to that IP.
4. Browser sends HTTP request.
5. Server responds with HTML.
6. Browser renders the page.

Every website works exactly like this.

---

# 7️⃣ IP Address vs Port

## IP Address → Identifies the Machine

Like a building address.

Example:

```
142.250.183.14
```

## Port → Identifies the Application

Like apartment number.

One machine can run many services:

| Service  | Port |
| -------- | ---- |
| Website  | 443  |
| SSH      | 22   |
| Database | 5432 |

Example:

```
142.250.183.14:443 → Web server
142.250.183.14:22  → SSH server
```

Same machine, different services.

---

# 8️⃣ Common Server Types (Real DevOps World)

## 🌐 Web Server

Serves websites and APIs.

Examples:

- Nginx
- Apache

Protocol: **HTTP / HTTPS**  
Ports: **80 / 443**

---

## 🔐 SSH Server

Remote login to machines.

Protocol: **SSH**  
Port: **22**

Used by:

- DevOps engineers
- CI/CD systems
- Git deployments

---

## 🗄️ Database Server

Stores application data.

Examples:

- PostgreSQL → port **5432**
- MySQL → port **3306**
- MongoDB → port **27017**

Usually **not exposed to public internet**.

---

## 📬 Email Server

Handles email delivery.

Protocols:

- SMTP → port **25**
- IMAP → port **143**
- POP3 → port **110**

---

## 🌍 DNS Server

Translates domain → IP.

Protocol: **DNS**  
Port: **53**

One of the most critical internet services.

---

## 📦 Application Server / API Server

Runs backend applications.

Examples:

- Node.js apps → port 3000
- Spring Boot → port 8080
- Python Flask → port 5000

Often placed **behind web servers**.

---

# 9️⃣ Public vs Private Servers

## Public Servers

Accessible from internet.

Examples:

- Websites
- Public APIs

Open ports:

```
80, 443
```

---

## Private/Internal Servers

Only accessible inside network.

Examples:

- Databases
- Internal APIs
- Kubernetes nodes

Security rule:

```
Expose as little as possible.
```

---

# 🔟 Typical Real Production Setup

```
Internet
   ↓
Load Balancer (443)
   ↓
Web Server (80/443)
   ↓
App Server (3000/8080)
   ↓
Database (5432)
```

You will see this architecture everywhere.

---

# 1️⃣1️⃣ Why Linux Is Everywhere Here

Most servers run Linux because it is:

- Stable
- Secure
- Remote-friendly (SSH)
- Scriptable
- Lightweight
- Perfect for automation

Linux is the **operating system of servers**.

---

# ✅ Outcome

You now understand:

- What the internet really is
- What makes a server a server
- How protocols & ports work
- Types of servers in real systems
- Where Linux fits into the picture

Next, we’ll start learning **Linux OS internals and boot process**.
