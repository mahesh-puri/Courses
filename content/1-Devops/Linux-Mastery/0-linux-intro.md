---
title: "0-linux-intro"
tags: [linux, devops, docker-course]
---

# Day 01 — Linux Intro & Mental Models

## 🎯 Goal

Build the mental model of Linux as a **programmable, remote, multi-user Unix system** used to run modern infrastructure.

This day builds the _foundation mindset_ required for DevOps and backend engineers.

---

# 1. What Linux Really Is

### Core Mental Model

Linux is not just an operating system.
It is a **layered ecosystem**:

```
Linux = Kernel + Userland + Distribution
```

---

## Kernel

The kernel is the **core program** running on the machine.

Responsibilities:

- Process scheduling (CPU time allocation)
- Memory management (RAM & virtual memory)
- Filesystems & disk I/O
- Networking stack (TCP/IP)
- Device drivers (hardware)

You rarely talk to the kernel directly.
You interact via:

- System calls
- Virtual filesystems (`/proc`, `/sys`)
- Command-line tools

---

## Userland

Everything DevOps engineers work with daily:

- Shells → bash, zsh
- Core utilities → ls, cp, mv, ps, grep
- Compilers → gcc, clang
- Services → sshd, nginx, cron, docker

💡 **Reality:** 95% of DevOps work happens in userland.

---

## Distribution (Distro)

A distro is an **opinionated bundle** of:

- Kernel
- GNU tools
- Package manager
- Installer
- Default configuration

Common distros:

| Distro                | Typical Usage      |
| --------------------- | ------------------ |
| Ubuntu / Debian       | Cloud, DevOps      |
| Rocky / Alma / CentOS | Enterprise servers |
| Fedora                | Cutting edge       |
| Arch                  | Power users        |
| Linux Mint            | Desktop            |

For this course → **Ubuntu mindset**

---

## Practice — Identify Your System

```bash
uname -a
hostnamectl
cat /etc/os-release
```

Why senior engineers care:

- Instantly identify OS & kernel after SSH login
- Know which package manager and configs to expect

---

# 2. Unix vs Linux

### Mental Model

Linux = **Unix philosophy implemented on a free kernel**

Unix ideas that still drive Linux:

- Small tools that do one thing well
- Text streams as universal interface
- Pipes connect tools together
- Everything behaves like a file

Example:

```bash
cat logs.txt | grep ERROR | sort | uniq -c
```

Unix skills ≈ Linux skills.

---

# 3. Linux vs Windows (Engineering Perspective)

| Topic         | Linux                | Windows        |
| ------------- | -------------------- | -------------- |
| Config        | Text files in `/etc` | Registry + GUI |
| Logs          | `/var/log`           | Event Viewer   |
| Remote access | SSH                  | RDP            |
| Automation    | Bash scripts         | PowerShell     |
| Packaging     | apt / dnf            | Installers     |

Linux is **text-first and scriptable**, which is why it dominates servers and containers.

---

# 4. Where Your Linux Will Live

Ways engineers run Linux:

1. Bare metal installation
2. Virtual machines
3. WSL2 on Windows
4. Cloud VMs (real production)

For this course → **WSL2 + Ubuntu**

---

# 5. Installing Linux on Windows (WSL2)

## Install Ubuntu

Open PowerShell (Admin):

```powershell
wsl --install -d Ubuntu
```

Restart Windows if prompted.

Launch Ubuntu → create username + password.

---

## Update System

Inside Ubuntu:

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Install Course Tools

```bash
sudo apt install -y \
build-essential curl wget git vim htop \
net-tools openssh-client openssh-server unzip
```

---

## Verify Installation

```bash
uname -a
cat /etc/os-release
whoami
pwd
```

Expected: Ubuntu + WSL2 kernel.

---

# 6. Linux Architecture Layers

```
Hardware
↓
Linux Kernel
↓
systemd (init system)
↓
Services (sshd, nginx, docker)
↓
Shell & CLI tools
↓
Applications
```

Everything is exposed as files:

| Path  | Purpose                    |
| ----- | -------------------------- |
| /dev  | Devices                    |
| /proc | Processes & kernel runtime |
| /sys  | Hardware & kernel tunables |

---

## Practice — Peek at Architecture

```bash
ps 1 -o pid,comm,args
ls /dev
ls /proc
ls /sys
```

---

# 7. Shell vs Terminal vs TTY

| Term     | Meaning                    |
| -------- | -------------------------- |
| Terminal | The UI program             |
| Shell    | Command interpreter (bash) |
| TTY      | Terminal session device    |

Practice:

```bash
echo "$SHELL"
ps -p $$ -o pid,ppid,comm,args
tty
who
```

---

# 8. Filesystem Hierarchy

Key directories every engineer must know:

| Path     | Purpose             |
| -------- | ------------------- |
| /        | Root                |
| /etc     | Config files        |
| /var/log | Logs                |
| /home    | User data           |
| /tmp     | Temporary files     |
| /opt     | Optional software   |
| /proc    | Kernel/process view |
| /sys     | Hardware info       |

Practice:

```bash
ls /
ls /etc
ls /var/log
ls /home
ls /proc
ls /sys
```

---

# 9. Process States Intro

Common states:

| State | Meaning            |
| ----- | ------------------ |
| R     | Running            |
| S     | Sleeping           |
| D     | Waiting for I/O    |
| T     | Stopped            |
| Z     | Zombie             |
| I     | Idle kernel thread |

Practice:

```bash
ps aux | head
ps -eo pid,ppid,state,cmd | head
```

---

# 10. SSH Setup (Local Server Practice)

Start SSH:

```bash
sudo service ssh start
```

Test:

```bash
ssh localhost
```

You just simulated a remote server.

---

# 11. Understanding systemd Socket Activation (Real Production Concept)

When you stopped SSH you saw:

```
Stopping 'ssh.service', but its triggering units are still active:
ssh.socket
```

### Mental Model

Modern Linux uses **socket activation**:

```
ssh.socket  → listens on port 22
ssh.service → starts when connection arrives
```

This saves resources and speeds boot.

---

## Check socket

```bash
systemctl status ssh.socket
```

---

## Fully stop SSH

```bash
sudo systemctl stop ssh.service
sudo systemctl stop ssh.socket
```

Verify:

```bash
systemctl status ssh.socket
systemctl status ssh.service
```

---

## Start again

```bash
sudo systemctl start ssh.socket
sudo systemctl start ssh.service
```

Real-world note:
SSH normally runs **24/7 for years** on servers.

---

# 12. Day-1 Lab (Run Sequentially)

```bash
# Identify OS
uname -a
hostnamectl
cat /etc/os-release

# Filesystem
ls /
ls /etc
ls /var/log
ls /home
ls /proc | head
ls /sys | head

# Processes
ps -eo pid,ppid,state,cmd | head
ps -p 1 -o pid,ppid,state,cmd

# Shell & TTY
echo "$SHELL"
ps -p $$ -o pid,ppid,comm,args
tty

# SSH practice
sudo service ssh start
ssh localhost
```

---

# ✅ Outcome

You now understand:

- What Linux really is
- Unix philosophy
- Linux vs Windows mindset
- Architecture layers
- Filesystem layout
- Process states
- WSL setup
- SSH & systemd socket activation

You are ready for **Day-02: How the Internet Works & What Are Servers** 🚀
