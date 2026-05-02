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

| Part           | What it does                                     |
| -------------- | ------------------------------------------------ |
| `cat logs.txt` | Prints the contents of the log file              |
| `grep ERROR`   | Filters only lines containing the word **ERROR** |
| `sort`         | Sorts the matching lines alphabetically          |
| `uniq -c`      | Counts how many times each unique line appears   |

This is extremely useful for:

Debugging production issues

Analyzing logs

Finding the most frequent failures

We will learn each of these tools in depth in upcoming modules:

- `grep`

- `sort`

- `uniq`

- Pipes (`|`)

- Log analysis techniques

## Soon you’ll be able to build powerful command pipelines like this confidently 🚀

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

## 🔎 Practice — Peek at Architecture

```bash
ps 1 -o pid,comm,args
ls /dev
ls /proc
ls /sys
```

---

## 🧠 Understanding this gives you deep visibility into how Linux works internally.

| Command                    | Layer explored        | Purpose                                         |
| -------------------------- | --------------------- | ----------------------------------------------- |
| `ps -p 1 -o pid,comm,args` | Init / system startup | Inspect the first process started by the kernel |
| `ls /dev`                  | Devices               | See how hardware is exposed as files            |
| `ls /proc`                 | Kernel runtime        | View live system & process data                 |
| `ls /sys`                  | Kernel + hardware     | View and tune hardware settings                 |

---

# 1️⃣ Inspect the Init System (PID 1)

```bash
ps -p 1 -o pid,comm,args
```

Example output:

```
PID COMMAND  CMD
1   systemd  /sbin/init
```

Key idea:

- **PID 1** is the first process started by the kernel.
- On modern Linux → this is **systemd**.
- Every process on the system ultimately becomes a child of PID 1.

Why this matters:

- If PID 1 crashes → the system shuts down.
- Debugging services often starts from systemd.

---

# 2️⃣ `/dev` — Device Files (Hardware as Files)

```bash
ls /dev
```

Linux exposes hardware as **device files**.

Instead of special APIs, programs read/write devices like files.

### Common examples

| Device         | Purpose                              |
| -------------- | ------------------------------------ |
| `/dev/sda`     | First disk drive                     |
| `/dev/tty`     | Terminal devices                     |
| `/dev/null`    | Discards all data written to it      |
| `/dev/random`  | Cryptographically secure random data |
| `/dev/urandom` | Faster pseudo-random generator       |
| `/dev/zero`    | Infinite stream of zeros             |

### Real examples

Discard output:

```bash
echo "hello" > /dev/null
```

Generate random data:

```bash
head -c 16 /dev/random | xxd
```

Create empty file quickly:

```bash
dd if=/dev/zero of=file.img bs=1M count=100
```

Mental model:

```
/dev = hardware interface exposed as files
```

This design enables powerful scripting and automation.

---

# 3️⃣ `/proc` — Live Kernel & Process Data

```bash
ls /proc
```

`/proc` is a **virtual filesystem** generated in real time by the kernel.

Many entries are numbers → these are **process IDs**.

Each process has its own directory:

```
/proc/<PID>
```

Example:

```bash
ls /proc/1
```

---

## Useful `/proc` files

| File             | Purpose          |
| ---------------- | ---------------- |
| `/proc/cpuinfo`  | CPU details      |
| `/proc/meminfo`  | Memory usage     |
| `/proc/uptime`   | System uptime    |
| `/proc/loadavg`  | System load      |
| `/proc/1/status` | Details of PID 1 |

Examples:

```bash
cat /proc/cpuinfo
cat /proc/meminfo
cat /proc/uptime
```

Mental model:

```
/proc = real-time view into the running kernel
```

Tools like `top`, `htop`, and `free` read data from `/proc`.

---

# 4️⃣ `/sys` — Kernel & Hardware Control Interface

```bash
ls /sys
```

`/sys` (sysfs) exposes **hardware devices and kernel settings** in a structured way.

It is heavily used for:

- Kernel tuning
- Device configuration
- Power management

---

## Example directories

| Path           | Purpose                               |
| -------------- | ------------------------------------- |
| `/sys/class`   | Device classes (network, block, etc.) |
| `/sys/block`   | Disk devices                          |
| `/sys/devices` | Hardware tree                         |
| `/sys/kernel`  | Kernel settings                       |

Example:

```bash
ls /sys/class/net
```

Shows network interfaces.

Check CPU scaling:

```bash
ls /sys/devices/system/cpu
```

Mental model:

```
/sys = kernel control panel
```

---

# 🧠 Big Picture Summary

These directories demonstrate the Linux philosophy:

```
Everything is a file.
```

| Directory | Represents                 |
| --------- | -------------------------- |
| `/dev`    | Hardware devices           |
| `/proc`   | Running kernel & processes |
| `/sys`    | Hardware + kernel tuning   |

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
