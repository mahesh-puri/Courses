---
title: "Day 06 — Users, Groups & System-Level Commands in Linux"
description: "Master user management, permissions, and essential system-level commands used in real production environments."
---

# Day 06 — Users, Groups & System-Level Commands in Linux

## 🎯 Goal

Understand how Linux manages:

- Users and permissions
- Access control
- System-level operations

This is critical for:

- Security
- Multi-user systems
- Production server management

---

# 🧠 Mental Model

Linux is a **multi-user operating system**.

Every action happens in this chain:

```
User → Group → Permissions → System Access
```

You are never just running commands —  
you are running them **as a user with privileges**.

---

# 1️⃣ System-Level Commands (Core OS Interaction)

These commands help you understand **who you are, where you are, and system state**.

---

## `uname` — System Information

```bash
uname -a
```

What it does:  
Shows kernel, OS, architecture.

Why it matters:

- Identify system after SSH login
- Debug compatibility issues

---

## `uptime` — System Running Time

```bash
uptime
```

What it shows:

- How long system is running
- Load average (CPU usage trend)

---

## `date` — Current Time

```bash
date
```

Used for:

- Debugging logs
- Checking timezone issues

---

## `who` — Logged-in Users

```bash
who
```

Shows:

- Active sessions
- TTY
- Login time

---

## `whoami` — Current User

```bash
whoami
```

Very important in scripts and debugging.

---

## `which` — Command Location

```bash
which python
```

What it does:  
Shows path of executable.

---

## `id` — User Identity

```bash
id
```

Output example:

```
uid=1000 gid=1000 groups=1000,27
```

Why it matters:

- Shows user ID and group memberships

---

## `sudo` — Run as Superuser

```bash
sudo apt update
```

What it does:  
Executes command with elevated privileges.

Why it matters:

- Required for admin operations

---

## `shutdown` — Power Off System

```bash
sudo shutdown now
sudo shutdown -h +10
```

---

## `reboot` — Restart System

```bash
sudo reboot
```

---

# 2️⃣ Package Management Commands

Used to install and manage software.

---

## Debian/Ubuntu (apt)

```bash
sudo apt update
sudo apt install nginx
sudo apt upgrade
```

---

## RHEL/CentOS (yum / dnf)

```bash
sudo yum install nginx
sudo dnf update
```

---

## Arch (pacman)

```bash
sudo pacman -S nginx
```

---

## Gentoo (portage)

```bash
emerge nginx
```

---

# 3️⃣ Users & Groups — Core Concepts

Every file/process has:

- Owner (user)
- Group
- Permissions

---

## User Types

| Type        | Description      |
| ----------- | ---------------- |
| root        | Superuser        |
| normal user | login user       |
| system user | service accounts |

---

# 4️⃣ User Management Commands

## `useradd` — Create User

```bash
sudo useradd username
sudo useradd -m username
```

Creates home directory with `-m`.

---

## `passwd` — Set Password

```bash
sudo passwd username
```

---

## `su` — Switch User

```bash
su username
sudo su
```

Switch to another user or become root.

---

## `userdel` — Delete User

```bash
sudo userdel username
sudo userdel -r username
```

`-r` removes home directory.

---

# 5️⃣ Group Management Commands

## `groupadd` — Create Group

```bash
sudo groupadd devops
```

---

## `groupdel` — Delete Group

```bash
sudo groupdel devops
```

---

## `gpasswd` — Manage Groups

### Add user to group

```bash
sudo gpasswd -a user group
```

### Add multiple users

```bash
sudo gpasswd -M user1,user2 group
```

### Check groups

```bash
groups username
```

---

# 6️⃣ File Ownership (Important)

Even though detailed permissions come later, basic idea:

```bash
ls -l
```

Example output:

```
-rw-r--r-- 1 user group file.txt
```

Meaning:

- user owns file
- group owns file

---

# 🧪 Day-6 Lab

```bash
# system info
uname -a
uptime
date
who
whoami
id

# command location
which python

# user creation
sudo useradd -m devuser
sudo passwd devuser

# switch user
su devuser
whoami

# create group
sudo groupadd devops

# add user to group
sudo gpasswd -a devuser devops

# check groups
groups devuser

# delete user
sudo userdel -r devuser
```

---

# 🧠 Key Takeaways

- Linux is multi-user by design
- Permissions define system security
- sudo controls privilege escalation
- Users and groups control access
- Package managers manage software lifecycle

---

# ✅ Outcome

You can now:

- Understand user identity and permissions
- Create and manage users
- Manage groups
- Use sudo correctly
- Install and manage software
- Perform system-level operations

Next → File Management & Permissions 🚀
