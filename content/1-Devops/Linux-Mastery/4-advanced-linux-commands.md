---
title: "Day 05 — Advanced Linux Commands for DevOps"
description: "Learn process management, system monitoring, SSH, and disk usage commands used in real production systems."
---

# Day 05 — Advanced Linux Commands for DevOps

## 🎯 Goal

Learn how to **monitor, debug, and operate real Linux systems** using advanced commands.

These are the commands you use when:

- A server is slow
- A service is down
- Disk is full
- CPU is high

---

# 🧠 Mental Model

A running Linux system can be understood as:

```
Processes + Memory + Disk + Network
```

Your job as a DevOps engineer is to:

- Inspect system state
- Find bottlenecks
- Take corrective action

---

# 1️⃣ Login & Remote Access

## `ssh` — Secure Shell

```bash
ssh user@server-ip
```

What it does:  
Connects to a remote Linux machine securely.

Why it matters:

- Primary way to access servers
- Used in CI/CD, cloud, automation

---

# 2️⃣ Disk Usage Commands

## `df` — Disk Filesystem Usage

```bash
df -h
```

What it does:  
Shows disk space usage across filesystems.

| Column | Meaning    |
| ------ | ---------- |
| Size   | Total disk |
| Used   | Used space |
| Avail  | Free space |

Use case:

- Check if disk is full

---

## `du` — Directory Usage

```bash
du -sh *
du -h /var/log
```

What it does:  
Shows space used by files/directories.

Use case:

- Find which folder is consuming disk

---

# 3️⃣ Process Monitoring

## `ps` — Process Snapshot

```bash
ps aux
```

What it does:  
Shows all running processes.

Use case:

- Check if a service is running

---

## `top` — Real-time Monitoring

```bash
top
```

What it does:  
Shows live CPU, memory, processes.

Use case:

- Identify high CPU/memory usage

---

## `fuser` — Who is using a file/port

```bash
fuser 8080/tcp
```

What it does:  
Shows which process is using a port/file.

Use case:

- Debug port conflicts

---

# 4️⃣ Process Control

## `kill` — Stop process

```bash
kill PID
kill -9 PID
```

What it does:  
Sends signals to processes.

| Signal  | Meaning       |
| ------- | ------------- |
| default | graceful stop |
| -9      | force kill    |

---

## `nohup` — Run in background

```bash
nohup python app.py &
```

What it does:  
Runs command even after terminal closes.

Use case:

- Run long jobs on servers

---

# 5️⃣ Memory Monitoring

## `free` — Memory usage

```bash
free -h
```

What it does:  
Shows RAM usage.

---

## `vmstat` — System performance

```bash
vmstat 1
```

What it does:  
Shows:

- CPU usage
- Memory
- I/O stats

Use case:

- Diagnose performance issues

---

# 🧪 Day-5 Lab

```bash
# SSH (if server available)
ssh user@server-ip

# disk usage
df -h
du -sh *

# processes
ps aux | head
top

# find process using port
fuser 8080/tcp

# kill process
kill PID

# background job
nohup sleep 1000 &

# memory
free -h
vmstat 1
```

---

# 🧠 Key Takeaways

- ssh = access servers
- df + du = disk debugging
- ps + top = process monitoring
- kill = control processes
- free + vmstat = memory & performance

---

# ✅ Outcome

You can now:

- Log into remote servers
- Monitor disk usage
- Analyze running processes
- Debug port conflicts
- Manage processes
- Diagnose system performance

Next → Users & Groups Management 🚀
