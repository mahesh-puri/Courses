---
title: "2-linux-os-boot-and-services"
description: "Understand Linux layers, the boot process, systemd, and package managers."
---

# Day 03 — Linux OS Internals & Boot Process

## 🎯 Goal

Build a clear mental model of how a Linux system **starts, initializes, and becomes a usable server**.

This connects Linux theory with how real production machines actually run.

---

# 1️⃣ Core Mental Model — Linux Layers

Always think of Linux as layered:

```
Hardware → Kernel → systemd/init → User Processes
```

Understanding these layers helps you debug issues from **hardware → application**.

---

## 🖥️ Hardware

Physical components:

- CPU
- RAM
- Disk
- Network card

Linux must detect and control these devices during boot.

---

## 🧠 Kernel

The **Linux kernel** is the core of the OS.

Responsibilities:

- Process scheduling (CPU allocation)
- Memory management
- Filesystems & disk I/O
- Networking stack
- Device drivers

The kernel is always running in memory.

User programs talk to the kernel via **system calls**.

---

## ⚙️ Init System (systemd)

After kernel starts, it launches the **init system**.

Modern Linux uses:

```
systemd → PID 1
```

systemd starts the entire system:

- Networking
- Logging
- SSH
- Background services

Without systemd, the system would never become usable.

---

## 👤 User Processes

Once systemd finishes startup:

- Login becomes possible
- Applications start running
- Server becomes usable

Examples:

- nginx
- docker
- postgres
- node apps

These are called **userland processes**.

---

# 2️⃣ VM vs Bare Metal vs Container

Understanding where Linux runs is critical.

---

## 🖥️ Bare Metal

Linux installed directly on physical hardware.

Used for:

- Data centers
- On-prem servers
- High-performance workloads

Pros:

- Full hardware access
- Maximum performance

---

## 💻 Virtual Machine (VM)

A VM is a **virtual computer** running on a host machine.

Examples:

- VirtualBox / VMware (local)
- AWS EC2 / Azure VM / Linode (cloud)

Most production Linux servers are **virtual machines**.

Think:

```
Physical machine → Hypervisor → Linux VM
```

---

## 📦 Containers

Containers are NOT full operating systems.

They share the host kernel but isolate:

- Processes
- Filesystems
- Networking

Example:

- Docker containers

Hierarchy:

```
Physical machine → VM → Containers
```

In real DevOps, you manage **VMs and containers together**.

---

# 3️⃣ The Linux Boot Process (High Level)

When a Linux machine powers on:

1️⃣ **BIOS / UEFI**

- Initializes hardware
- Finds boot device

2️⃣ **Bootloader (GRUB)**

- Loads Linux kernel into memory

3️⃣ **Kernel Initialization**

- Detects hardware
- Mounts root filesystem
- Starts init system

4️⃣ **systemd Starts Services**

- Networking
- SSH
- Logging
- Background services

5️⃣ **System Ready**

- Login prompt appears
- Server can accept connections

---

# 4️⃣ systemd — The Service Manager

systemd manages:

- System startup
- Background services (daemons)
- Logs
- Scheduled jobs
- Boot targets

---

## systemd Units

Everything systemd manages is a **unit**.

Common unit types:

| Unit Type | Purpose                         |
| --------- | ------------------------------- |
| service   | Background service (nginx, ssh) |
| socket    | Network listener                |
| timer     | Scheduled tasks                 |
| mount     | Filesystems                     |
| target    | Boot states                     |

---

## systemd Targets (Runlevels)

Targets define **system states**.

| Target            | Meaning              |
| ----------------- | -------------------- |
| multi-user.target | Server mode (no GUI) |
| graphical.target  | Desktop mode         |
| rescue.target     | Recovery mode        |

Most servers run in:

```
multi-user.target
```

---

# 5️⃣ Package Managers — Installing Software

Linux installs software using **package managers**.

Unlike Windows, you don’t download installers.

Package managers handle:

- Installation
- Dependencies
- Updates
- Security patches

---

## Major Package Managers

| Distro                  | Package Manager |
| ----------------------- | --------------- |
| Ubuntu / Debian         | apt             |
| CentOS / Rocky / Fedora | dnf / yum       |
| Arch Linux              | pacman          |

---

## Why Package Managers Matter for DevOps

They allow you to:

- Keep servers updated
- Install software safely
- Automate provisioning
- Maintain security patches

This is the foundation of:

- Server provisioning
- Docker images
- CI/CD pipelines

---

# ✅ Outcome

You now understand:

- Linux system layers
- Kernel vs systemd vs user processes
- VM vs bare metal vs containers
- Linux boot process
- systemd units and targets
- Package managers and their role

Next → **Linux Basic Commands**.
